
import {Store} from "@e280/kv"
import {debounce, deep, sub} from "@e280/stz"

import {Domain} from "./domain.js"
import {setupOnStorageEvent} from "../../dom/utils/storage-event-sub.js"

export type Snapshot = [label: string, states: any[]]

export type HistoryPickle = {
	version: number
	past: Snapshot[]
	future: Snapshot[]
}

export class History {
	static version = 1
	onChange = sub()

	#past: Snapshot[] = []
	#future: Snapshot[] = []
	#actions = true

	constructor(public snapshotLimit: number, public domains: Domain[]) {
		this.proceed("initialize")

		// listen to changes from each domain, reacting with historical procession
		for (const domain of domains)
			domain.onAction((label: string) => {
				if (this.#actions)
					this.proceed(label)
			})
	}

	async establishPersistence(store: Store<HistoryPickle>) {
		const onStorageEvent = setupOnStorageEvent()

		const load = async() => {
			const pickle = await store.get()
			if (!pickle) return
			this.unpickle(pickle)
		}

		await load()

		const stopListeningForLoading = onStorageEvent.sub(load)
		const stopListeningForSaving = this.onChange(debounce(500, async() => {
			const pickle = this.pickle()
			await store.set(pickle)
		}))

		return () => {
			stopListeningForLoading()
			stopListeningForSaving()
		}
	}

	pickle(): HistoryPickle {
		return deep.clone({
			version: History.version,
			past: this.#past,
			future: this.#future,
		})
	}

	unpickle(pickle: HistoryPickle) {
		if (pickle.version !== History.version)
			return
		this.#past = deep.clone(pickle.past)
		this.#future = deep.clone(pickle.future)
		this.#restoreCurrent()
	}

	batch(label: string, fn: () => void) {
		this.#actions = false
		fn()
		this.#actions = true
		this.proceed(label)
	}

	proceed(label: string) {
		this.#future = []
		this.#past.push(this.#snapshot(label))
		this.#enforceLimit()
		this.onChange.pub()
	}

	get undoable() { return this.#past.length > 1 }
	get redoable() { return this.#future.length > 0 }

	undo() {
		if (!this.undoable) return

		// moving the 'current' snapshot to the future
		this.#future.push(this.#past.pop()!)

		// restoring the 'previous' snapshot
		this.#restoreCurrent()
	}

	redo() {
		if (!this.redoable) return
		if (this.#future.length === 0) return

		// moving the future snapshot to the past
		const snapshot = this.#future.pop()!
		this.#past.push(snapshot)

		// restoring that snapshot
		this.#restoreCurrent()
	}

	clear() {
		this.#past = [this.#snapshot("initialize")]
		this.#future = []
	}

	#snapshot(label: string): Snapshot {
		const states = this.domains
			.map(d => deep.clone(Domain.getStateSignal(d).value))
		return [label, states]
	}

	#restoreCurrent() {
		const [,states] = this.#past.at(-1)!
		for (const [index, domain] of this.domains.entries()) {
			const state = states.at(index)!
			Domain.getStateSignal(domain).value = deep.clone(state)
		}
		this.onChange.pub()
	}

	#enforceLimit() {
		while (this.#past.length > this.snapshotLimit)
			this.#past.shift()
	}
}


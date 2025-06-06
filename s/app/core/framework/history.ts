
import {deep} from "@e280/stz"
import {Domain} from "./domain.js"

export type Snapshot = [label: string, states: any[]]

export class History {
	#past: Snapshot[] = []
	#future: Snapshot[] = []
	#actions = true

	constructor(public snapshotLimit: number, public domains: Domain[]) {
		this.proceed("initialize")
		for (const domain of domains)
			domain.onAction((label: string) => {
				if (this.#actions)
					this.proceed(label)
			})
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
	}

	get undoable() { return this.#past.length > 1 }
	get redoable() { return this.#future.length > 0 }

	undo() {
		if (!this.undoable) return

		// moving the 'current' snapshot to the future
		this.#future.push(this.#past.pop()!)

		// restoring the 'previous' snapshot
		this.#restore(this.#past.at(-1)!)
	}

	redo() {
		if (!this.redoable) return
		if (this.#future.length === 0) return

		// moving the future snapshot to the past
		const snapshot = this.#future.pop()!
		this.#past.push(snapshot)

		// restoring that snapshot
		this.#restore(snapshot)
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

	#restore([,states]: Snapshot) {
		for (const [index, domain] of this.domains.entries()) {
			const state = states.at(index)!
			Domain.getStateSignal(domain).value = deep.clone(state)
		}
	}

	#enforceLimit() {
		while (this.#past.length > this.snapshotLimit)
			this.#past.shift()
	}
}


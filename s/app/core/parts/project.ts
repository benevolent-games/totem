
import {Kv, Store} from "@e280/kv"
import {Cellar} from "@e280/quay"
import {debounce, Hex, Thumbprint} from "@e280/stz"

import {Depot} from "./depot.js"
import {Chronicle, ChroniclePickle} from "../framework/chronicle.js"
import {setupOnStorageEvent} from "../../dom/utils/storage-event-sub.js"

export class Project {
	static version = 1
	depot: Depot
	chronicle: Chronicle

	constructor(
			public store: Store<ProjectPickle>,
			public cellar: Cellar,
			public id: string,
			public label: string,
		) {

		this.depot = new Depot(cellar)

		this.chronicle = new Chronicle(64, [
			this.depot.domain,
		])

		this.chronicle.onChange(debounce(500, async() => {
			await this.save()
		}))
	}

	static async create(
			kv: Kv<ProjectPickle>,
			cellar: Cellar,
		) {

		const id = Hex.random(32)
		const store = kv.store(id)
		const label = Thumbprint.sigil.fromHex(id)
		const project = new this(store, cellar, id, label)
		await project.save()

		const onStorageEvent = setupOnStorageEvent()
		onStorageEvent(async() => project.load())

		return project
	}

	static async load(store: Store<ProjectPickle>, cellar: Cellar, pickle: ProjectPickle) {
		const project = new this(store, cellar, pickle.id, pickle.label)
		await project.load()
		return project
	}

	async load() {
		const pickle = await this.store.get()
		if (!pickle) return
		this.unpickle(pickle)
	}

	async save() {
		const pickle = this.pickle()
		await this.store.set(pickle)
	}

	pickle(): ProjectPickle {
		const {id, label, chronicle} = this
		return {
			version: Project.version,
			id,
			label,
			chronicle: chronicle.pickle(),
		}
	}

	unpickle(pickle: ProjectPickle) {
		if (pickle.version !== Project.version)
			return
		this.label = pickle.label
		this.chronicle.unpickle(pickle.chronicle)
	}
}

export type ProjectPickle = {
	version: number
	id: string
	label: string
	chronicle: ChroniclePickle
}


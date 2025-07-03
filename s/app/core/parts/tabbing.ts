
import {Content} from "@benev/slate"
import {computed, signal} from "@e280/strata"

export type Tab<Tabname extends string = any> = {
	name: Tabname
	label: Content
	render: () => Content
}

export class TabSequence<Tabname extends string> {
	constructor(public tabs: Tab<Tabname>[]) {}

	#index = signal(0)

	#tab = computed(() => {
		let index = this.#index()
		if (index < 0) index = 0
		if (index > (this.tabs.length - 1)) index = 0
		return this.tabs.at(index)!
	})

	get index() {
		return this.#index()
	}

	get tab() {
		return this.#tab()
	}

	async goto(index: number) {
		await this.#index.set(index)
		return this.#tab()
	}

	async gotoName(name: Tabname) {
		const index = this.tabs.findIndex(t => t.name === name)
		if (index === -1) throw new Error(`tab not found "${name}"`)
		return this.goto(index)
	}
}


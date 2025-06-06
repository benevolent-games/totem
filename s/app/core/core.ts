
import {Kv} from "@e280/kv"
import {html} from "@benev/slate"
import {Cellar} from "@e280/quay"
import {debounce} from "@e280/stz"

import {Depot} from "./parts/depot.js"
import {Tabber} from "./parts/tabbing.js"
import {History} from "./framework/history.js"
import {getTotemEditor} from "../dom/elements/totem-editor/element.js"
import {getPodsPanel as getPodsPanel} from "../dom/panels/pods/view.js"

export class Core {
	depot: Depot
	history: History

	loaded: Promise<void>

	constructor(
			public kv: Kv,
			public cellar: Cellar,
		) {

		this.depot = new Depot(cellar)

		this.history = new History(64, [
			this.depot.domain,
		])

		this.loaded = this.history.establishPersistence(kv.store("history"))
			.then(() => undefined)
	}

	tabber = new Tabber("view", {
		view: {icon: "🗿", render: () => null},
		pods: {icon: "🫛", render: () => this.panels.Pods([])},
		art: {icon: "🎨", render: () => html`art`},
		props: {icon: "🗃️", render: () => html`props`},
		edit: {icon: "🛠️", render: () => html`edit`},
		pack: {icon: "🎒", render: () => html`pack`},
	})

	readonly elements = {
		TotemEditor: getTotemEditor(this),
	}

	readonly panels = {
		Pods: getPodsPanel(this),
	}
}


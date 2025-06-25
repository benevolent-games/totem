
import {Kv} from "@e280/kv"
import {Cellar} from "@e280/quay"

import {makeSubstrate, Substrate} from "./parts/substrate.js"
import {getTotemEditor} from "../dom/elements/totem-editor/element.js"

export class Core {
	static async setup(
			kv: Kv,
			cellar: Cellar,
		) {
		const store = kv.store("state")
		const strata = await makeSubstrate(store)
		return new this(kv, cellar, strata)
	}

	constructor(
		public kv: Kv,
		public cellar: Cellar,
		public substrate: Substrate,
	) {}

	// tabber = new Tabber("view", {
	// 	view: {icon: "🗿", render: () => null},
	// 	pods: {icon: "🫛", render: () => this.panels.Pods([])},
	// 	art: {icon: "🎨", render: () => html`art`},
	// 	props: {icon: "🗃️", render: () => html`props`},
	// 	edit: {icon: "🛠️", render: () => html`edit`},
	// 	pack: {icon: "🎒", render: () => html`pack`},
	// })

	// get project() {
	// 	return this.projectManager.project.value
	// }

	readonly elements = {
		TotemEditor: getTotemEditor(this),
	}

	readonly panels = {
		// Pods: getPodsPanel(this),
	}
}


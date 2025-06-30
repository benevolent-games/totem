
import {Kv} from "@e280/kv"
import {Cellar} from "@e280/quay"

import {makeStateTree, StateTree} from "./parts/state-tree.js"
import {getTotemEditor} from "../dom/elements/totem-editor/element.js"

export class Core {
	static async setup(
			kv: Kv,
			cellar: Cellar,
		) {
		const store = kv.store("state")
		const appTree = await makeStateTree(store)
		return new this(kv, cellar, appTree)
	}

	constructor(
		public kv: Kv,
		public cellar: Cellar,
		public appTree: StateTree,
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


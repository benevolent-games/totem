
import {Kv} from "@e280/kv"
import {Cellar} from "@e280/quay"
import {Strata, Substrata} from "@e280/strata"

import {makeStrata} from "./parts/strata.js"
import {AppState, ProjectState, SourcesState} from "./parts/state.js"
// import {getPodsPanel} from "../dom/panels/pods/view.js"
import {getTotemEditor} from "../dom/elements/totem-editor/element.js"

export class Core {
	static async setup(
			kv: Kv,
			cellar: Cellar,
		) {
		const store = kv.store("state")
		const strata = await makeStrata(store)
		return new this(kv, cellar, strata)
	}

	sources: Substrata<SourcesState>
	projects: Substrata<ProjectState[]>

	constructor(
			public kv: Kv,
			public cellar: Cellar,
			public strata: Strata<AppState>,
		) {

		this.sources = strata.substrata(s => s.sources)
		this.projects = strata.substrata(s => s.projects)
	}

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


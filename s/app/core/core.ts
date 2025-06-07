
import {Kv} from "@e280/kv"
import {html} from "@benev/slate"
import {Cellar} from "@e280/quay"

import {Tabber} from "./parts/tabbing.js"
import {ProjectManager} from "./parts/project-manager.js"
import {setupOnStorageEvent} from "../dom/utils/storage-event-sub.js"
import {getTotemEditor} from "../dom/elements/totem-editor/element.js"
import {getPodsPanel as getPodsPanel} from "../dom/panels/pods/view.js"

export class Core {
	constructor(
			public kv: Kv,
			public cellar: Cellar,
			public projectManager: ProjectManager,
		) {
		const onStorageEvent = setupOnStorageEvent()
		onStorageEvent(async() => {
			await projectManager.reload()
		})
	}

	static async setup(
			kv: Kv,
			cellar: Cellar,
		) {
		const projectManager = await ProjectManager.setup({kv, cellar})
		return new this(kv, cellar, projectManager)
	}

	tabber = new Tabber("view", {
		view: {icon: "🗿", render: () => null},
		pods: {icon: "🫛", render: () => this.panels.Pods([])},
		art: {icon: "🎨", render: () => html`art`},
		props: {icon: "🗃️", render: () => html`props`},
		edit: {icon: "🛠️", render: () => html`edit`},
		pack: {icon: "🎒", render: () => html`pack`},
	})

	get project() {
		return this.projectManager.project.value
	}

	readonly elements = {
		TotemEditor: getTotemEditor(this),
	}

	readonly panels = {
		Pods: getPodsPanel(this),
	}
}



import {html} from "@benev/slate"
import {Domain} from "./state/domain.js"
import {Tabber} from "./parts/tabbing.js"
import {History} from "./state/history.js"
import {getCratesPanel} from "../dom/panels/crates/view.js"
import {getTotemEditor} from "../dom/elements/totem-editor/element.js"

export class Core {
	domains = {
		crates: new Domain({
			array: [] as {id: string, glb?: string}[],
			glbs: [] as {hash: string, size: number}[],
		}),
		catalog: new Domain({
			props: [] as [string, any][],
		}),
	}

	history = new History(64, [
		this.domains.crates,
		this.domains.catalog,
	])

	readonly elements = {
		TotemEditor: getTotemEditor(this),
	}

	readonly panels = {
		Crates: getCratesPanel(this),
	}

	tabber = new Tabber("view", {
		view: {icon: "🗿", render: () => null},
		crates: {icon: "📦", render: () => this.panels.Crates([])},
		art: {icon: "🎨", render: () => html`art`},
		props: {icon: "🗃️", render: () => html`props`},
		edit: {icon: "🛠️", render: () => html`edit`},
		pack: {icon: "🎒", render: () => html`pack`},
	})
}


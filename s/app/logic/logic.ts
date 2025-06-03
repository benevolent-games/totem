
import {html} from "@benev/slate"
import {Tabber} from "./parts/tabbing.js"
import {getCratesPanel} from "../dom/panels/crates/view.js"
import {getTotemEditor} from "../dom/elements/totem-editor/element.js"

export class Logic {
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


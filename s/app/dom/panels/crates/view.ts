
import {Hex, Thumbprint} from "@e280/stz"
import {html, shadowView} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Core} from "../../../core/core.js"

export const getCratesPanel = (core: Core) => shadowView(use => () => {
	use.styles(themeCss, styleCss)

	const {crates} = core.domains

	function addCrate() {
		crates.action("add crate", data => {
			data.array.push({id: Hex.random()})
		})
	}

	return html`
		<section>
			<h2>Crates</h2>
			<div class=crates>
				${crates.data.array.map(crate => html`
					<div data-id="${crate.id}">${Thumbprint.sigil.fromHex(crate.id)}</div>
				`)}
			</div>
			<button theme=button @click="${addCrate}">add</button>
			<button theme=button ?disabled="${!core.history.undoable}" @click="${() => core.history.undo()}">undo</button>
			<button theme=button ?disabled="${!core.history.redoable}" @click="${() => core.history.redo()}">redo</button>
		</section>
	`
})



import {Thumbprint} from "@e280/stz"
import {html, shadowView} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Core} from "../../../core/core.js"

export const getPodsPanel = (core: Core) => shadowView(use => () => {
	use.styles(themeCss, styleCss)
	const {depot, chronicle} = core.project

	async function addPod() {
		await depot.createPod(null)
	}

	return html`
		<section>
			<h2>Pods</h2>
			<div class=pods>
				${depot.domain.state.pods.map(pod => html`
					<div data-id="${pod.id}">${Thumbprint.sigil.fromHex(pod.id)}</div>
				`)}
			</div>

			<button
				theme=button
				@click="${addPod}">
					add
			</button>

			<button
				theme=button
				?disabled="${!chronicle.undoable}"
				@click="${() => chronicle.undo()}">
					undo
			</button>

			<button
				theme=button
				?disabled="${!chronicle.redoable}"
				@click="${() => chronicle.redo()}">
					redo
			</button>
		</section>
	`
})


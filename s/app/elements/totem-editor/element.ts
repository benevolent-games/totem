
import {html, shadowComponent} from "@benev/slate"
import styleCss from "./style.css.js"
import themeCss from "../theme.css.js"

export const TotemEditor = shadowComponent(use => {
	use.styles(themeCss, styleCss)

	return html`
		<p>totem</p>
		<marduk-theater></marduk-theater>
	`
})


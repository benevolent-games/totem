
import {html, shadowView} from "@benev/slate"
import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Logic} from "../../../logic/logic.js"

export const getCratesPanel = (logic: Logic) => shadowView(use => () => {
	use.styles(themeCss, styleCss)

	return html`
		<section>
			<h2>Crates</h2>
			<div class=crates>
				<div></div>
			</div>
		</section>
	`
})


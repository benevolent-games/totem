
import {html, shadowComponent} from "@benev/slate"
import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Logic} from "../../../logic/logic.js"

export const getTotemEditor = (logic: Logic) => shadowComponent(use => {
	use.styles(themeCss, styleCss)

	const {panels, activeLabel, activePanel} = logic.tabber

	function click(label: keyof typeof panels) {
		return () => {
			activeLabel.value = label
		}
	}

	return html`
		<marduk-theater></marduk-theater>

		<div class=container>
			<slot></slot>

			<div class=panel>
				${activePanel.render()}
			</div>

			<nav>
				${Object.entries(panels).map(([label, panel]) => html`
					<button
						?x-active="${label === activeLabel.value}"
						@click="${click(label as keyof typeof panels)}"
						theme="strip glassy"
						title="${label}">
							${panel.icon}
					</button>
				`)}
			</nav>
		</div>
	`
})


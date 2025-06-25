
import {html, shadowComponent} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Core} from "../../../core/core.js"
import {reactivity} from "../../utils/reactivity.js"

export const getTotemEditor = (core: Core) => shadowComponent(use => {
	use.styles(themeCss, styleCss)
	reactivity(use, [core.projects])

	// const {panels, activeLabel, activePanel} = core.tabber
	//
	// function click(label: keyof typeof panels) {
	// 	return () => {
	// 		activeLabel.value = label
	// 	}
	// }

	const projects = core.projects.state

	return html`
		<marduk-theater></marduk-theater>

		<div class=container>
			<slot></slot>

			<nav class=project-tabs>
				<h2>projects</h2>
				${projects.map(project => html`
					<button>${project.live.label}</button>
				`)}
			</nav>
		</div>

	`
})

			// <div class=panel>
			// 	${activePanel.render()}
			// </div>
			//
			// <nav>
			// 	${Object.entries(panels).map(([label, panel]) => html`
			// 		<button
			// 			?x-active="${label === activeLabel.value}"
			// 			@click="${click(label as keyof typeof panels)}"
			// 			theme="strip glassy"
			// 			title="${label}">
			// 				${panel.icon}
			// 		</button>
			// 	`)}
			// </nav>


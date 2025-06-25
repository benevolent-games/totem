
import {html, shadowComponent} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Core} from "../../../core/core.js"
import {reactivity} from "../../utils/reactivity.js"
import {makeProject} from "../../../core/parts/state.js"

export const getTotemEditor = (core: Core) => shadowComponent(use => {
	use.styles(themeCss, styleCss)

	const {projects, project} = core.substrate
	reactivity(use, [projects, project])

	function clickAddProject() {
		return async() => projects.mutate(p => p.push(makeProject()))
	}

	function clickDeleteProject(index: number) {
		return () => projects.mutate(p => p.splice(index, 1))
	}

	return html`
		<marduk-theater></marduk-theater>

		<div class=container>
			<slot></slot>

			<nav class=project-tabs>
				<h2>projects</h2>
				${projects.state.map((proj, index) => html`
					<button>${proj.live.label}</button>
					<button @click="${clickDeleteProject(index)}">x</button>
				`)}
				<button @click="${clickAddProject()}">+</button>
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


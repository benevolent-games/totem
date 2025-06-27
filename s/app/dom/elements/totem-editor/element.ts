
import {html, shadowComponent} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Core} from "../../../core/core.js"
import {makeProject} from "../../../core/parts/state.js"

export type Nav = (
	| {kind: "about"}
	| {kind: "project", index: number}
)

export const getTotemEditor = (core: Core) => shadowComponent(use => {
	use.styles(themeCss, styleCss)
	const nav = use.signal<Nav>({kind: "about"})
	const {projects} = core.substrate

	const clickProjectTab = (index: number) => async() => {
		nav.value = {kind: "project", index}
	}

	const clickAddProject = () => async() => {
		await projects.mutate(p => p.push(makeProject()))
	}

	const clickDeleteProject = (index: number) => async(event: PointerEvent) => {
		event.stopPropagation()
		await projects.mutate(p => p.splice(index, 1))
	}

	return html`
		<marduk-theater></marduk-theater>

		<div class=container>
			<slot></slot>

			<nav class=project-tabs>
				${projects.state.map((proj, index) => html`
					<button @click="${clickProjectTab(index)}">
						<span>${proj.live.label}</span>
						<span data-delete-button @click="${clickDeleteProject(index)}">x</span>
					</button>
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


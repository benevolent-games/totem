
import {html, shadowComponent} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Core} from "../../../core/core.js"
import {AboutView} from "../../views/about/view.js"
import {ProjectView} from "../../views/project/view.js"
import {makeProject} from "../../../core/parts/state.js"

export type Nav = (
	| {kind: "about"}
	| {kind: "project", index: number}
)

export const getTotemEditor = (core: Core) => shadowComponent(use => {
	use.styles(themeCss, styleCss)

	const nav = use.signal<Nav>({kind: "about"})

	const {projects} = core.appTree

	const clickAboutTab = () => async() => {
		nav.value = {kind: "about"}
	}

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

	const project = nav.value.kind === "project"
		? projects.state.at(nav.value.index)
		: undefined

	const content = html`
		<slot></slot>

		<nav slot=appnav>
			<button @click="${clickAboutTab()}">
				about
			</button>

			${projects.state.map((proj, index) => html`
				<button @click="${clickProjectTab(index)}">
					<span>${proj.live.label}</span>
					<span data-delete-button @click="${clickDeleteProject(index)}">x</span>
				</button>
			`)}

			<button @click="${clickAddProject()}">+</button>
		</nav>
	`

	return project
		? ProjectView([core, project], {content})
		: AboutView([core], {content})
})



import {html, shadowComponent} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Core} from "../../../core/core.js"
import {Tabber} from "../../../core/parts/tabbing.js"
import {makeProject, ProjectState} from "../../../core/parts/state.js"

export type Nav = (
	| {kind: "about"}
	| {kind: "project", index: number}
)

export const getTotemEditor = (core: Core) => shadowComponent(use => {
	use.styles(themeCss, styleCss)

	const nav = use.signal<Nav>({kind: "about"})
	const tabber = use.once(() => new Tabber("view", {
		view: {label: "🗿", render: () => null},
		pods: {label: "🫛", render: () => html`pods`},
		art: {label: "🎨", render: () => html`art`},
		props: {label: "🗃️", render: () => html`props`},
		edit: {label: "🛠️", render: () => html`edit`},
		pack: {label: "🎒", render: () => html`pack`},
	}))

	const {projects} = core.substrate

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

	const renderAbout = () => ({
		bg: html``,
		overlay: html`
			<slot></slot>
		`,
	})

	const renderProject = (project: ProjectState) => ({
		bg: html`
			<marduk-theater></marduk-theater>
		`,
		overlay: html`
			<div class=panel>
				lol
				${tabber.active.render()}
			</div>

			<nav class=bottom-tabs>
				${Object.entries(tabber.tabs).map(([key, panel]) => html`
					<button
						?x-active="${key === tabber.activeKey.value}"
						@click="${() => tabber.goto(key as keyof typeof tabber.tabs)}"
						theme="strip glassy"
						title="${key}">
							${panel.label}
					</button>
				`)}
			</nav>
		`,
	})

	const project = nav.value.kind === "project"
		? projects.state.at(nav.value.index)
		: undefined

	const current = project
		? renderProject(project)
		: renderAbout()

	return html`
		${current.bg}

		<div class=overlay>
			<nav class=top-tabs>
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
			${current.overlay}
		</div>
	`
})


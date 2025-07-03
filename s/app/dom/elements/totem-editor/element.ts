
import {html, shadowComponent} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"
import {Core} from "../../../core/core.js"
import {GlbsView} from "../../views/glbs/view.js"
import {AboutView} from "../../views/about/view.js"
import {ProjectView} from "../../views/project/view.js"
import {makeProject} from "../../../core/parts/state.js"

export type Nav = (
	| {kind: "about"}
	| {kind: "glbs"}
	| {kind: "project", index: number}
)

export const getTotemEditor = (core: Core) => shadowComponent(use => {
	use.styles(themeCss, styleCss)
	const {projects} = core.appTree

	const nav = use.signal<Nav>({kind: "about"})

	const navigate = (n: Nav) => {
		nav.value = n
	}

	const clickNavigate = (n: Nav) => () => navigate(n)

	const clickAddProject = () => async() => {
		await projects.mutate(p => p.push(makeProject()))
		navigate({kind: "project", index: projects.state.length - 1})
	}

	const clickDeleteProject = (index: number) => async(event: PointerEvent) => {
		event.stopPropagation()
		await projects.mutate(p => p.splice(index, 1))
		navigate({kind: "about"})
	}

	const projectIndex = nav.value.kind === "project"
		? nav.value.index
		: undefined

	const project = nav.value.kind === "project"
		? projects.state.at(nav.value.index)
		: undefined

	const content = html`
		<slot></slot>

		<nav slot=appnav theme=plox>
			<button
				title="about"
				theme="glassy"
				@click="${clickNavigate({kind: "about"})}"
				?x-active="${nav.value.kind === "about"}">
					<img alt="" src="/assets/totem.png"/>
			</button>

			<button
				title="glbs"
				theme="glassy"
				@click="${clickNavigate({kind: "glbs"})}"
				?x-active="${nav.value.kind === "glbs"}">
					🛢️
			</button>

			${projects.state.map((proj, index) => html`
				<button
					theme="glassy"
					x-project
					title="project '${proj.live.label}'"
					@click="${clickNavigate({kind: "project", index})}"
					?x-active="${nav.value.kind === "project" && nav.value.index === index}">
						<span x-spacer></span>
						<span>${index + 1}</span>
						${index === projectIndex ? html`
							<span x-delete @click="${clickDeleteProject(index)}">x</span>
						` : html`
							<span x-spacer></span>
						`}
				</button>
			`)}

			<button
				theme="glassy"
				@click="${clickAddProject()}">+</button>
		</nav>
	`

	if (projectIndex !== undefined)
		return ProjectView([core, projectIndex], {content})

	else if (nav.value.kind === "glbs")
		return GlbsView([core], {content})

	else
		return AboutView([core], {content})
})


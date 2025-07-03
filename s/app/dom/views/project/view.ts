
import {html, shadowView, loading} from "@benev/slate"
import {TheaterView} from "@benev/marduk/x/theater/index.dom.js"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"

import {pageLayout} from "../page/view.js"
import {Core} from "../../../core/core.js"
import {asyncInit} from "../../utils/async-init.js"
import {TabSequence} from "../../../core/parts/tabbing.js"
import {makeFrontstage} from "../../../rendering/frontstage.js"

export const ProjectView = shadowView(use => (core: Core, index: number) => {
	use.name("project")
	use.styles(themeCss, styleCss)

	const frontstageOp = asyncInit(use, async() => makeFrontstage())

	const tabber = use.once(() => new TabSequence([
		{name: "view", label: "👁️", render: () => null},
		{name: "pods", label: "🫛", render: () => html`pods`},
		{name: "art", label: "🎨", render: () => html`art`},
		{name: "props", label: "🗃️", render: () => html`props`},
		{name: "edit", label: "🛠️", render: () => html`edit`},
		{name: "pack", label: "🎒", render: () => html`pack`},
	]))

	// TODO this creates a memory leak until strata branches are based on computed signals
	const project = core.appTree.projects.branch(p => p.at(index))

	tabber.goto(project.state?.live.activeTab ?? 0)

	const gotoTab = async(index: number) => {
		await project.mutate(p => {
			if (p)
				p.live.activeTab = index
		})
	}

	return pageLayout({
		bg: html`
			${loading.braille(frontstageOp, frontstage => TheaterView([frontstage]))}
		`,

		overlay: html`
			<div class=panel>
				${tabber.tab.render()}
				${project.state?.live.label}
			</div>

			<nav class=workbench theme="plox">
				${tabber.tabs.map((tab, index) => html`
					<button
						theme="naked glassy"
						?x-active="${index === tabber.index}"
						@click="${() => gotoTab(index)}"
						title="${tab.name}">
							${tab.label}
					</button>
				`)}
			</nav>
		`,
	})
})


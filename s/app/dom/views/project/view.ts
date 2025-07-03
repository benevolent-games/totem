
import {html, shadowView, loading} from "@benev/slate"
import {TheaterView} from "@benev/marduk/x/theater/index.dom.js"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"

import {pageLayout} from "../page/view.js"
import {Core} from "../../../core/core.js"
import {asyncInit} from "../../utils/async-init.js"
import {Tabber} from "../../../core/parts/tabbing.js"
import {ProjectState} from "../../../core/parts/state.js"
import {makeFrontstage} from "../../../rendering/frontstage.js"

export const ProjectView = shadowView(use => (core: Core, project: ProjectState) => {
	use.name("project")
	use.styles(themeCss, styleCss)

	const frontstageOp = asyncInit(use, async() => makeFrontstage())

	const tabber = use.once(() => new Tabber("view", {
		view: {label: "👁️", render: () => null},
		pods: {label: "🫛", render: () => html`pods`},
		art: {label: "🎨", render: () => html`art`},
		props: {label: "🗃️", render: () => html`props`},
		edit: {label: "🛠️", render: () => html`edit`},
		pack: {label: "🎒", render: () => html`pack`},
	}))

	return pageLayout({
		bg: html`
			${loading.braille(frontstageOp, frontstage => TheaterView([frontstage]))}
		`,

		overlay: html`
			<div class=panel>
				${tabber.active.render()}
			</div>

			<nav class=workbench theme="plox">
				${Object.entries(tabber.tabs).map(([key, panel]) => html`
					<button
						theme="naked glassy"
						?x-active="${key === tabber.activeKey.value}"
						@click="${() => tabber.goto(key as keyof typeof tabber.tabs)}"
						title="${key}">
							${panel.label}
					</button>
				`)}
			</nav>
		`,
	})
})


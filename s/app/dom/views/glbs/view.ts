
import {html, shadowView} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"

import {pageLayout} from "../page/view.js"
import {Core} from "../../../core/core.js"

export const GlbsView = shadowView(use => (core: Core) => {
	use.name("glbs")
	use.styles(themeCss, styleCss)

	return pageLayout({
		bg: html``,
		overlay: html`
			<div class=glbs>
				<h2>glb cellar view</h2>
			</div>
		`,
	})
})


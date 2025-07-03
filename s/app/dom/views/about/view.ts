
import {html, shadowView} from "@benev/slate"

import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"

import {pageLayout} from "../page/view.js"
import {Core} from "../../../core/core.js"

export const AboutView = shadowView(use => (core: Core) => {
	use.name("about")
	use.styles(themeCss, styleCss)

	return pageLayout({
		bg: html``,
		overlay: html`<slot></slot>`,
	})
})


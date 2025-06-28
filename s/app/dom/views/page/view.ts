
import {Content, html, shadowView} from "@benev/slate"
import styleCss from "./style.css.js"

export const PageView = shadowView(use => () => {
	use.name("page")
	use.styles(styleCss)

	return html`
		<slot name=bg></slot>
		<div class=overbox>
			<slot name=appnav></slot>
			<slot name=overlay></slot>
		</div>
	`
})

export function pageLayout(o: {
		bg: Content
		overlay: Content
	}) {

	return PageView([], {content: html`
		<slot name=appnav slot=appnav></slot>

		<div slot=bg>
			${o.bg}
		</div>

		<div slot=overlay>
			${o.overlay}
		</div>
	`})
}


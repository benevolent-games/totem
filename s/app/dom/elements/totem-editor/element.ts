
import {Content, html, shadowComponent} from "@benev/slate"
import styleCss from "./style.css.js"
import themeCss from "../../theme.css.js"

export const TotemEditor = shadowComponent(use => {
	use.styles(themeCss, styleCss)

	const tabpanels = use.once((): Tabpanel[] => [
		tabpanel("view", "👁️", () => null),
		tabpanel("glbs", "🎒", () => html`glbs`),
		tabpanel("art", "🎨", () => html`art`),
		tabpanel("catalog", "🗃️", () => html`catalog`),
		tabpanel("prop-edit", "🛠️", () => html`prop-edit`),
		tabpanel("ship", "📦", () => html`ship`),
	])

	const activeIndex = use.signal(0)
	const active = tabpanels.at(activeIndex.value)!

	function click(index: number) {
		return () => {
			activeIndex.value = index
		}
	}

	return html`
		<marduk-theater></marduk-theater>
		<div class=container>
			<slot></slot>
			<div class=panel>
				${active.panel()}
			</div>
			<nav>
				${tabpanels.map((tab, index) => html`
					<button
						?x-active="${index === activeIndex.value}"
						@click="${click(index)}"
						theme="strip glassy"
						title="${tab.title}">
							${tab.icon}
					</button>
				`)}
			</nav>
		</div>
	`
})

type Tabpanel = {
	title: string
	icon: Content
	panel: () => Content
}

function tabpanel(title: string, icon: Content, panel: () => Content): Tabpanel {
	return {title, icon, panel}
}



import {Content, Signal, signal} from "@benev/slate"

export type PanelSpec = {icon: Content, render: () => Content}

export class Tabber<Panels extends {[key: string]: PanelSpec}> {
	activeLabel: Signal<keyof Panels>

	constructor(start: keyof Panels, public panels: Panels) {
		this.activeLabel = signal(start)
	}

	get activePanel() {
		return this.panels[this.activeLabel.value]
	}

	goto(label: keyof Panels) {
		this.activeLabel.value = label
	}
}


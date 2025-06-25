
import {Content, Signal, signal} from "@benev/slate"

export type Tab = {label: Content, render: () => Content}

export class Tabber<Tabs extends {[key: string]: Tab}> {
	activeKey: Signal<keyof Tabs>

	constructor(start: keyof Tabs, public tabs: Tabs) {
		this.activeKey = signal(start)
	}

	get active() {
		return this.tabs[this.activeKey.value]
	}

	goto(label: keyof Tabs) {
		this.activeKey.value = label
	}
}



import {deep, sub} from "@e280/stz"
import {computed, signal, Signal} from "@benev/slate"

export class Domain<Data = any> {
	static getDataSignal = (domain: Domain) => domain.#data

	#data: Signal<Data>
	#immutable: Signal<Data>
	onAction = sub<[label: string]>()

	constructor(data: Data) {
		this.#data = signal(data)
		this.#immutable = computed(() => deep.freeze(deep.clone(this.#data.value)))
	}

	get data() {
		return this.#immutable.value
	}

	action(label: string, fn: (data: Data) => void) {
		fn(this.#data.value)
		this.#data.publish()
		this.onAction.pub(label)
	}
}


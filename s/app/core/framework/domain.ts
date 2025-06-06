
import {deep, sub} from "@e280/stz"
import {computed, signal, Signal} from "@benev/slate"

export class Domain<State = any> {
	static getStateSignal = (domain: Domain) => domain.#state

	#state: Signal<State>
	#immutable: Signal<State>
	onAction = sub<[label: string]>()

	constructor(state: State) {
		this.#state = signal(state)
		this.#immutable = computed(() => deep.freeze(deep.clone(this.#state.value)))
	}

	get state() {
		return this.#immutable.value
	}

	action(label: string, fn: (state: State) => void) {
		fn(this.#state.value)
		this.#state.publish()
		this.onAction.pub(label)
	}
}


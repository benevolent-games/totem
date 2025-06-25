
import {Use} from "@benev/slate"
import {coalesce} from "@e280/stz"
import {Stratum} from "@e280/strata"

export function reactivity(use: Use, stratums: Stratum<any>[]) {
	const rerender = () => use.rerender()
	use.mount(() => coalesce(...stratums.map(stratum => stratum.watch(rerender))))
}


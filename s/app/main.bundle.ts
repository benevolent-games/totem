
import {register} from "@benev/slate"
import {Kv, StorageDriver} from "@e280/kv"
import {Cellar, OpfsForklift} from "@e280/quay"

import {Core} from "./core/core.js"
import {makeFrontstage} from "./rendering/frontstage.js"

const core = new Core(
	new Kv(
		new StorageDriver()
	),
	new Cellar(
		// new OpfsForklift(await navigator.storage.getDirectory())
	),
)

await core.loaded

const frontstage = await makeFrontstage()

register({
	...frontstage.getElements(),
	...core.elements,
})

console.log("🗿")


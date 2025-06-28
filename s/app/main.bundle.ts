
import {Cellar} from "@e280/quay"
import {register} from "@benev/slate"
import {Kv, StorageDriver} from "@e280/kv"

import {Core} from "./core/core.js"

const core = await Core.setup(
	new Kv(
		new StorageDriver()
	),
	new Cellar(
		// new OpfsForklift(await navigator.storage.getDirectory())
	),
)

register(core.elements)

console.log("🗿")



import {register} from "@benev/slate"
import {Core} from "./core/core.js"
import {makeFrontstage} from "./rendering/frontstage.js"

const core = new Core()
const frontstage = await makeFrontstage()

register({
	...frontstage.getElements(),
	...core.elements,
})

console.log("🗿")


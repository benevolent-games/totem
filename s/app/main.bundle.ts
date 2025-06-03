
import {register} from "@benev/slate"
import {Logic} from "./logic/logic.js"
import {makeFrontstage} from "./rendering/frontstage.js"

const logic = new Logic()
const frontstage = await makeFrontstage()

register({
	...frontstage.getElements(),
	...logic.elements,
})

console.log("🗿")


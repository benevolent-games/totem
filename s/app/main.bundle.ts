
import {register} from "@benev/slate"
import {makeFrontstage} from "./rendering/frontstage.js"
import {TotemEditor} from "./dom/elements/totem-editor/element.js"

const frontstage = await makeFrontstage()

register({
	...frontstage.getElements(),
	TotemEditor,
})

console.log("🗿")


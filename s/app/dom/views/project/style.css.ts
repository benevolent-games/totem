
import {css} from "@benev/slate"
export default css`@layer view {

[slot="bg"] {
	height: 100%;
}

[slot="overlay"] {
	height: 100%;
	display: flex;
	flex-direction: column;
}

[view="theater"] {
	outline: 1px solid red;
	display: block;
	width: 100%;
	height: 100%;
}

.panel {
	margin-top: auto;
	max-height: 50%;
	overflow-y: auto;
}

}`


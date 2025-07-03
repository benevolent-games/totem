
import {css} from "@benev/slate"
export default css`@layer view {

nav {
	margin: 1em auto;

	> button {
		display: flex;
		align-items: center;
		gap: 0.1em;
	}

	img {
		height: 1em;
	}

	[x-project] {
		padding-left: 0.1em;
		padding-right: 0.1em;
	}

	:is([x-spacer], [x-delete]) {
		font-size: 0.8em;

		display: flex;
		justify-content: center;
		align-items: center;

		width: 1em;
		height: 1em;
	}

	[x-delete] {
		opacity: 0.5;
		color: white;
		border-radius: 1em;
		&:is(:hover, :focus-visible) {
			opacity: 1;
			background: red;
		}
	}
}

}`


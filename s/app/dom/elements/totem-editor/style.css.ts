
import {css} from "@benev/slate"
export default css`@layer view {

marduk-theater {
	display: contents;
}

.container {
	position: absolute;
	inset: 0;

	height: 100%;
	aspect-ratio: 2 / 1;
	max-width: 100%;
	margin: 0 auto;

	display: flex;
	flex-direction: column;
}

slot {
	display: block;
	margin-bottom: auto;
}

.panel {
	max-height: 50%;
	overflow-y: auto;
}

nav {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: max-content;
	max-width: 100%;
	margin: 0 auto;
	margin-bottom: 1em;

	> button {
		cursor: pointer;

		flex: 0 0 auto;
		font-size: 1.5em;
		color: white;
		padding: 0.5em;

		border-radius: 0;
		border-width: 0.1rem;
		border-bottom-width: 0.2rem;

		&:is(:hover, :focus-visible) {
			background: #fff4;
			box-shadow: 0 0 2em #fff3;
		}

		&:first-child {
			border-radius: 0.5em 0 0 0.5em;
		}

		&:last-child {
			border-radius: 0 0.5em 0.5em 0;
		}

		& + button {
			border-left: none;
		}

		&[x-active] {
			border-bottom-color: var(--prime);
			background: color-mix(in lch, transparent, var(--prime) 20%);
		}
	}
}

@media (width > 500px) {
	nav > button {
		font-size: 2.5em;
	}
}

}`


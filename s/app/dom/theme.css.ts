
import {css} from "@benev/slate"
export default css`@layer theme, view, special; @layer theme {

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 1em; }
::-webkit-scrollbar-thumb:hover { background: #444; }

a {
	color: var(--link);
	text-decoration: none;

	&:visited {
		color: color-mix(in srgb, purple, var(--link) 70%);
	}

	&:hover {
		color: color-mix(in srgb, white, var(--link) 90%);
		text-decoration: underline;
	}

	&:active {
		color: color-mix(in srgb, white, var(--link) 50%);
	}
}

:is(
	[theme~="naked"],
	[theme~="button"]
	) {
	all: unset;
}

:is(
	[theme~="glassy"],
	[theme~="button"]
	) {
	background: linear-gradient(to bottom, #fff2, #fff1);
	border-radius: 1rem;
	border: 0.1rem solid #fff4;
	box-shadow: 0.2rem 0.4rem 1rem #0005;
}

[theme~="button"] {
	cursor: pointer;
	padding: 0.5em;

	&:is(:hover, :focus-visible) {
		box-shadow: 0 0 2em #fff4;
		background: #fff4;
	}

	&[disabled] {
		opacity: 0.3;
		text-decoration: line-through;
	}
}

[theme~="plox"] {
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
	[theme~="plox"] > button {
		font-size: 2.5em;
	}
}

}`


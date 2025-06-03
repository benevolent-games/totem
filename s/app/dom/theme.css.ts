
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
	[theme~=strip],
	[theme~=button]
	) {
	all: unset;
}

:is(
	[theme~=glassy],
	[theme~=button]
	) {
	background: linear-gradient(to bottom, #fff2, #fff1);
	border-radius: 1rem;
	border: 0.1rem solid #fff4;
	box-shadow: 0.2rem 0.4rem 1rem #0005;
}

[theme~=button] {
	cursor: pointer;
	padding: 0.5em;

	&:is(:hover, :focus-visible) {
		box-shadow: 0 0 2em #fff4;
		background: #fff4;
	}
}

}`


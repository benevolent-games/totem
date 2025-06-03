
import "@benev/slate/x/node.js"
import {template, html, easypage, git_commit_hash, read_file, unsanitized, renderSocialCard, read_json, headScripts} from "@benev/turtle"

const version = (await read_json("package.json")).version
const domain = "totem.benevolent.games"
const favicon = "/assets/totem.png"
const description = "3d prop editor"

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()

	return easypage({
		path,
		dark: true,
		title: "@benev/totem",
		head: html`
			<link rel="icon" href="${favicon}"/>
			<meta data-commit-hash="${hash}"/>
			<meta data-version="${version}"/>

			<style>${unsanitized(await read_file("x/app/styles/vars.css"))}</style>
			<style>${unsanitized(await read_file("x/app/styles/basics.css"))}</style>
			<style>${unsanitized(await read_file("x/app/styles/page.css"))}</style>

			${renderSocialCard({
				themeColor: "#f2ea8e",
				siteName: domain,
				title: "@benev/totem",
				description,
				image: `https://${domain}${favicon}`,
				url: `https://${domain}/`,
			})}

			${headScripts({
				devModulePath: await path.version.root("app/main.bundle.js"),
				prodModulePath: await path.version.root("app/main.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<totem-editor>
				<header>
					<h1>
						<img alt="" src="/assets/totem.png"/>
						<span>
							<span>Totem</span>
							<small>${version}</small>
						</span>
					</h1>
					<a href="https://github.com/benevolent-games/totem">github</a>
				</header>
			</totem-editor>
		`,
	})
})


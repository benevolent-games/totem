
import {MySpec} from "./spec.js"
import {Frontstage} from "@benev/marduk/x/theater/index.dom.js"

export async function makeFrontstage() {
	const workerUrl = new URL("./backstage.worker.bundle.js", import.meta.url)
	const frontstage = await Frontstage.make<MySpec>({workerUrl})

	await frontstage.syncFigments([[0, ["hippo", {hungry: false}]]])
	await frontstage.syncFigments([[0, ["hippo", {hungry: true}]]])
	await frontstage.syncFigments([[0, undefined]])

	return frontstage
}


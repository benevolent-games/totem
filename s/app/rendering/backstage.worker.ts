
import {MySpec} from "./spec.js"
import {babylonBackstage, theaterWorker} from "@benev/marduk/x/theater/index.babylon.js"

void async function() {

	const backstage = await babylonBackstage<MySpec>(async _stagecraft => ({
		hippo: (id, data) => {
			console.log("spawn", id, data)
			return {
				update: data => console.log("update", id, data),
				dispose: () => console.log("dispose", id, data),
			}
		},
	}))

	await theaterWorker(backstage)
}()


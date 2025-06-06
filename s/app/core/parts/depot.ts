
import {Cellar} from "@e280/quay"
import {Hex, MapG} from "@e280/stz"
import {Domain} from "../framework/domain.js"

export class Depot {
	constructor(private cellar: Cellar) {}

	domain = new Domain<DepotState>({
		pods: [],
		glbs: [],
	})

	async loadGlbBytes(hash: string) {
		const {glbs} = getMaps(this.domain.state)
		const glb = glbs.require(hash)
		const {bytes} = await this.cellar.load(glb.hash)
		return bytes
	}

	async uploadGlb(label: string, bytes: Uint8Array) {
		const size = bytes.length
		const {hash} = await this.cellar.save(bytes)
		const glb: Glb = {hash, label, size}
		this.#operation("upload glb", ({glbs}) => {
			glbs.set(hash, glb)
		})
		return glb
	}

	async deleteGlb(hash: string) {
		this.#operation("delete glb", ({pods, glbs}) => {

			// nullify all pods pointing at this glb
			for (const pod of pods.values()) {
				if (pod.glb === hash)
					pod.glb = null
			}

			// remove from glbs
			glbs.delete(hash)
		})

		// delete from file storage
		await this.cellar.delete(hash)
	}

	async createPod(glb: string | null) {
		const id = Hex.random(32)
		const pod: Pod = {id, glb}
		this.#operation("create pod", ({pods}) => {
			pods.set(id, pod)
		})
	}

	async assignPodGlb(podId: string, glb: string | null) {
		this.#operation("assign pod glb", ({pods}) => {
			pods.require(podId).glb = glb
		})
	}

	async deletePod(id: string) {
		this.#operation("delete pod", ({pods}) => {
			pods.delete(id)
		})
	}

	#operation(
			actionLabel: string,
			fn: (_stuff: {pods: MapG<string, Pod>, glbs: MapG<string, Glb>}) => void,
		) {

		this.domain.action(actionLabel, state => {
			const {pods, glbs} = getMaps(state)
			fn({pods, glbs})
			state.pods = [...pods.values()]
			state.glbs = [...glbs.values()]
		})
	}
}

function getMaps(state: DepotState) {
	const pods = new MapG<string, Pod>(state.pods.map(pod => [pod.id, pod]))
	const glbs = new MapG<string, Glb>(state.glbs.map(glb => [glb.hash, glb]))
	return {pods, glbs}
}

export type DepotState = {
	pods: Pod[]
	glbs: Glb[]
}

export type Pod = {
	id: string
	glb: string | null
}

export type Glb = {
	hash: string
	label: string
	size: number
}


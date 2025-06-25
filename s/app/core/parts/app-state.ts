
import {Chronicle} from "@e280/strata"

export const initAppState = (): AppState => ({
	sources: {glbs: []},
	projects: [],
})

export type AppState = {
	sources: {glbs: Glb[]}
	projects: ProjectState[]
}

export type ProjectState = {
	id: string
	chron: Chronicle<ProjectData>
}

export type ProjectData = {
	pods: Pod[]
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


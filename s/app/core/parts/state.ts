
import {Chronicle} from "@e280/strata"

export const appStateVersion = 0

export const initAppState = (): AppState => ({
	sources: {glbs: []},
	projects: [],
})

export type AppState = {
	sources: SourcesState
	projects: ProjectState[]
}

export type SourcesState = {
	glbs: Glb[]
}

export type ProjectState = {
	live: ProjectLive
	chronicle: Chronicle<ProjectChron>
}

export type ProjectChron = {
	pods: Pod[]
}

export type ProjectLive = {
	label: string
	activeTab: number
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


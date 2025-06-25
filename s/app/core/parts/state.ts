
import {Bytes, Thumbprint} from "@e280/stz"
import {Chronicle, Strata} from "@e280/strata"

export const appStateVersion = 0

export const initAppState = (): AppState => ({
	sources: {glbs: []},
	projects: [],
	activeProjectIndex: 0,
})

export function makeProject(): ProjectState {
	return {
		live: {
			activeTab: 0,
			label: Thumbprint.sigil.fromBytes(Bytes.random(4)),
		},
		chronicle: Strata.chronicle<ProjectChron>({
			pods: [],
		}),
	}
}

export type AppState = {
	sources: SourcesState
	projects: ProjectState[]
	activeProjectIndex: number
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


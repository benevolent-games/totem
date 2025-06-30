
import {StorageDriver, Store} from "@e280/kv"
import {Trunk, Versioned} from "@e280/strata"
import {AppState, appStateVersion, initAppState} from "./state.js"

export type StateTree = Awaited<ReturnType<typeof makeStateTree>>

export async function makeStateTree(store: Store<Versioned<AppState>>) {
	const initialState = initAppState()

	const {trunk} = await Trunk.setup({
		version: appStateVersion,
		initialState,
		saveDebounceTime: 50,
		persistence: {
			store,
			onChange: StorageDriver.onStorageEvent,
		},
	})

	return {
		trunk,
		sources: trunk.branch(s => s.sources),
		projects: trunk.branch(s => s.projects),
	}
}


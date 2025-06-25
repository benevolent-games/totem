
import {StorageDriver, Store} from "@e280/kv"
import {Strata, Versioned} from "@e280/strata"
import {AppState, appStateVersion, initAppState} from "./state.js"

export type Substrate = Awaited<ReturnType<typeof makeSubstrate>>

export async function makeSubstrate(store: Store<Versioned<AppState>>) {
	const initialState = initAppState()

	const {strata} = await Strata.setup({
		version: appStateVersion,
		initialState,
		saveDebounceTime: 50,
		persistence: {
			store,
			onChange: StorageDriver.onStorageEvent,
		},
	})

	return {
		strata,
		sources: strata.substrata(s => s.sources),
		projects: strata.substrata(s => s.projects),
		project: strata.substrata(s => s.projects.at(s.activeProjectIndex)),
	}
}


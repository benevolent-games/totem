
import {StorageDriver, Store} from "@e280/kv"
import {Strata, Versioned} from "@e280/strata"
import {AppState, appStateVersion, initAppState} from "./state.js"

export async function makeStrata(store: Store<Versioned<AppState>>) {
	const initialState = initAppState()
	const {strata} = await Strata.setup({
		version: appStateVersion,
		initialState,
		persistence: {
			store,
			onChange: StorageDriver.onStorageEvent,
		},
	})
	return strata
}


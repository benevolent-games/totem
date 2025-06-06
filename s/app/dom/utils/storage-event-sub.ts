
import {sub} from "@e280/stz"

export function setupOnStorageEvent() {
	const onStorageEvent = sub()
	window.addEventListener("storage", () => onStorageEvent.pub())
	return onStorageEvent
}


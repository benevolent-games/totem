
import {Use} from "@benev/slate"

export function asyncInit<T extends {dispose: () => void}>(use: Use, fn: () => Promise<T>) {
	const container = use.init(() => {
		const container = {disposed: false}
		return [container, () => {
			container.disposed = true
			op.payload?.dispose()
		}]
	})

	const op = use.load(async() => {
		const thing = await fn()
		if (container.disposed) thing.dispose()
		return thing
	})

	return op
}


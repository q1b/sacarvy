import { createSignal } from "solid-js"

export default function useToggle(initialValue: boolean) {
	const [value, setValue] = createSignal(initialValue)

	const toggle = () => setValue((v) => !v)

	return [value, toggle]
}

import { createStore } from "solid-js/store"

export const [theme, setTheme] = createStore<{
	value: "light" | "dark" | string
	sound: boolean
	navbar: boolean
}>({
	value: "light",
	sound: true,
	navbar: true,
})

import { createEffect, createSignal, onCleanup } from "solid-js"
import { throttle } from "@solid-primitives/scheduled"

const useScrollPosition = (throttleBy = 500) => {
	const [scrollPosition, setScrollPosition] = createSignal({
		x: null,
		y: null,
	})

	const handleScroll = throttle(
		() => setScrollPosition({ x: window.scrollX, y: window.scrollY }),
		throttleBy
	)

	createEffect(() => {
		window.addEventListener("scroll", handleScroll)
		onCleanup(() => window.removeEventListener("scroll", handleScroll))
	}, [handleScroll])

	return scrollPosition
}

export default useScrollPosition

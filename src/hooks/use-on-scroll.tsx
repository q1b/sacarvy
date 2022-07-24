import { throttle } from "@solid-primitives/scheduled"
import { useWindowEvent } from "./use-window-event"

const useOnScroll = (callback, throttleBy = 500) => {
	const handleScroll = throttle(callback, throttleBy)

	useWindowEvent("scroll", handleScroll)

	return null
}

export default useOnScroll

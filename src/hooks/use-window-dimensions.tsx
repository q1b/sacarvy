/* eslint-disable react-hooks/rules-of-hooks */

import { throttle } from "@solid-primitives/scheduled"
import { createSignal, onCleanup, onMount } from "solid-js"

export const useWindowDimensions = () => {
	if (typeof window === "undefined") {
		return { width: undefined, height: undefined, clientWidth: undefined }
	}

	const [windowDimensions, setWindowDimensions] = createSignal({
		width: window.innerWidth,
		height: window.innerHeight,
		clientWidth: document.documentElement.clientWidth,
	})

	onMount(() => {
		const handleResize = throttle(() => {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
				clientWidth: document.documentElement.clientWidth,
			})
		}, 250)

		window.addEventListener("resize", handleResize)
		onCleanup(() => {
			window.removeEventListener("resize", handleResize)
		})
	})

	// For the very first render, for whatever reason, the width of the scrollbars
	// is sometimes not taken into account, so we need to wait until after
	// the first render to set it.
	onMount(() => {
		if (
			windowDimensions().clientWidth !==
			document.documentElement.clientWidth
		) {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
				clientWidth: document.documentElement.clientWidth,
			})
		}
		// The whole point is to fix an irregularity on mount, so we only want to
		// run this effect on mount.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	})

	return windowDimensions
}

import { throttle } from "@solid-primitives/scheduled"
import { createReaction, createSignal, onCleanup } from "solid-js"
import { createStore } from "solid-js/store"

export function useMouse<T extends HTMLElement = any>(props: {
	x?: number
	y?: number
	delay?: number
}) {
	const { x = 0, y = 0, delay = 40 } = props

	const [position, setPosition] = createStore({ x, y })

	const [ref, setRef] = createSignal<T>()

	const setMousePosition = throttle(
		(event: PointerEvent) => {
			if (ref()) {
				const rect = ref().getBoundingClientRect()

				const x = Math.max(
					0,
					Math.round(
						event.pageX -
							rect.left -
							(window.pageXOffset || window.scrollX)
					)
				)

				const y = Math.max(
					0,
					Math.round(
						event.pageY -
							rect.top -
							(window.pageYOffset || window.scrollY)
					)
				)

				setPosition({ x, y })
			} else {
				setPosition({ x: event.clientX, y: event.clientY })
			}
		},
		delay ? delay : 40
	)

	createReaction(() => {
		const element = ref() ? ref() : document
		element.addEventListener("mousemove", setMousePosition as any)
		onCleanup(() =>
			element.removeEventListener("mousemove", setMousePosition as any)
		)
	})(() => ref())

	return { setRef, position }
}

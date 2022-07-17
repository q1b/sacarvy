import { useScrollIntoView } from "@/hooks/use-scroll-into-view/use-scroll-into-view"
import useToggle from "@/hooks/use-toggle"
import {
	Accessor,
	createEffect,
	createMemo,
	createSignal,
	on,
	onMount,
} from "solid-js"

function useRaf(fn) {
	const [isActive, toggle] = useToggle(false)
	let rafId: null | number = null

	function loop() {
		if (!isActive() || !window) return
		fn()
		rafId = window.requestAnimationFrame(loop)
	}
	function resume() {
		if (!isActive() && window) {
			toggle()
			loop()
		}
	}

	function pause() {
		if (isActive()) toggle()
		if (rafId != null && window) {
			window.cancelAnimationFrame(rafId)
			rafId = null
		}
	}
	return { isActive, pause, resume }
}

export function Demo() {
	const { scrollIntoView, setTargetRef } = useScrollIntoView<HTMLDivElement>({
		offset: 112,
		axis: "y",
	})
	onMount(() => {
		setTargetRef(document.querySelector("#notes") as HTMLDivElement)
	})
	const [count, setCount] = createSignal(0)
	const inc = () => setCount((v) => v + 1)
	const { isActive, pause, resume } = useRaf(inc)
	const source = 0

	const output = useTransition(source, {
		duration: 1000,
		transition: TransitionPresets.easeInOutCubic,
	})
	createEffect(() => {
		console.log(output())
	})
	return (
		<>
			<button onClick={pause}>Pause</button>
			<button onClick={resume}>Resume</button>
			<p>{isActive()}</p>
			<p>{count()}</p>
			{/* <button onClick={() => scrollIntoView({ alignment: "start" })}>
				Scroll to target
			</button>
			<div style={{ height: "200vh" }} />
			<p>Hello there</p> */}
		</>
	)
}

import { useScrollLock } from "@/hooks/use-scroll-lock"

export const DisableScroll = () => {
	const [scrollLock, setScrollLocked] = useScrollLock(false)
	return (
		<button
			onClick={() => {
				if (scrollLock()) {
					setScrollLocked(false)
				} else {
					setScrollLocked(true)
				}
			}}
			class="bg-black p-4"
		>
			{" "}
			Disable Scroll{" "}
		</button>
	)
}

import { createEffect, createSignal, on, onCleanup } from "solid-js"
import { getLockStyles } from "./get-lock-styles"
import { injectStyles } from "./inject-style-tag"
import { insertStyleTag } from "./insert-style-tag"
import { makeStyleTag } from "./make-style-tag"

export function useScrollLock(
	lock?: boolean,
	options = {
		disableBodyPadding: false,
	}
) {
	const [scrollLocked, setScrollLocked] = createSignal(lock || false)

	//  const [scrollTop,setScrollTop] = createSignal(0);

	const { disableBodyPadding } = options

	const [stylesheet, setStyleSheet] = createSignal<
		CSSStyleSheet | any | null
	>(null)

	const lockScroll = () => {
		// setScrollTop(window.scrollY)

		const styles = getLockStyles({ disableBodyPadding })

		/**
		 * by applying styles via style tag
		 * we dont care about previous styles due to inheritance
		 * when scroll gets unlocked we delete that style tag
		 */
		const sheet = makeStyleTag()

		injectStyles(sheet, styles)
		insertStyleTag(sheet)

		setStyleSheet(sheet)
	}

	const unlockScroll = () => {
		if (!stylesheet()) return

		stylesheet().parentNode.removeChild(stylesheet())
		setStyleSheet(null)
	}

	createEffect(
		on(scrollLocked, () => {
			if (scrollLocked()) {
				lockScroll()
			} else {
				unlockScroll()
			}
			// onCleanup(() => unlockScroll())
		})
	)

	createEffect(() => {
		if (lock !== undefined) {
			setScrollLocked(lock)
		}
	})

	createEffect(
		on(scrollLocked, () => {
			if (lock === undefined && typeof window !== "undefined") {
				window.document.body.style.overflow === "hidden" &&
					setScrollLocked(true)
			}
		})
	)

	return [scrollLocked, setScrollLocked] as const
}

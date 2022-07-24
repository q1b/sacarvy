export function animateTo(
	element: HTMLElement,
	keyframes: PropertyIndexedKeyframes,
	options: KeyframeAnimationOptions
) {
	const anim = element.animate(keyframes, { ...options, fill: "both" })
	anim.addEventListener("finish", () => {
		anim.commitStyles()
		anim.cancel()
	})
	return anim
}

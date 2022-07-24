import React from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import useMousePosition from "@react-hook/mouse-position"

import { normalize } from "@utils"

import UnstyledButton from "../UnstyledButton"

const springConfig = {
	tension: 110,
	friction: 19,
}

const VennDiagram = ({ left, right, center, ...delegated }) => {
	const RADIUS = 150
	const DIAMETER = RADIUS * 2
	const OVERLAP_RATIO = 0.5

	const TOTAL_WIDTH = DIAMETER * 2 - DIAMETER * OVERLAP_RATIO
	const VIEWBOX = `0 0 ${TOTAL_WIDTH} ${DIAMETER}`

	const LEFT_CENTER = { x: RADIUS, y: RADIUS }
	const RIGHT_CENTER = { x: TOTAL_WIDTH - RADIUS, y: RADIUS }

	const SCALE_BY = 1.1

	const [hovering, setHovering] = React.useState({
		left: false,
		right: false,
	})

	const ref = React.useRef()

	const mousePosition = useMousePosition(ref)

	React.useEffect(() => {
		if (!mousePosition.x) {
			setHovering({ left: false, right: false })
			return
		}

		const xInViewbox = normalize(
			mousePosition.x,
			0,
			mousePosition.elementWidth,
			0,
			TOTAL_WIDTH
		)
		const yInViewbox = normalize(
			mousePosition.y,
			0,
			mousePosition.elementHeight,
			0,
			DIAMETER
		)

		const distanceFromLeft = Math.sqrt(
			Math.abs(xInViewbox - LEFT_CENTER.x) ** 2 +
				Math.abs(yInViewbox - LEFT_CENTER.y) ** 2
		)

		const distanceFromRight = Math.sqrt(
			Math.abs(xInViewbox - RIGHT_CENTER.x) ** 2 +
				Math.abs(yInViewbox - RIGHT_CENTER.y) ** 2
		)

		setHovering({
			left: distanceFromLeft < RADIUS,
			right: distanceFromRight < RADIUS,
		})
	}, [mousePosition])

	const hoveringOverCenter = hovering.left && hovering.right
	const notHoveringAnything = !hovering.left && !hovering.right

	const leftCircleStyle = useSpring({
		transform: hovering.left ? `scale(${SCALE_BY})` : "scale(1)",
		fillOpacity: hovering.left ? 0.5 : 0.35,
		cx: hoveringOverCenter
			? LEFT_CENTER.x + 20
			: hovering.left
			? LEFT_CENTER.x - 20
			: LEFT_CENTER.x,
		config: springConfig,
	})

	const rightCircleStyle = useSpring({
		transform: hovering.right ? `scale(${SCALE_BY})` : "scale(1)",
		fillOpacity: hovering.right ? 0.5 : 0.35,
		cx: hoveringOverCenter
			? RIGHT_CENTER.x - 20
			: hovering.right
			? RIGHT_CENTER.x + 20
			: RIGHT_CENTER.x,
		config: springConfig,
	})

	const shiftTextBy = mousePosition.elementWidth * 0.01

	const leftStyles = {
		transform: hovering.right
			? `translateX(-${shiftTextBy}px) scale(0.8)`
			: hovering.left
			? `translateX(${shiftTextBy}px) scale(1.1)`
			: `translateX(0) scale(1)`,
		opacity: notHoveringAnything
			? 0.75
			: hovering.left && !hoveringOverCenter
			? 1
			: 0.25,
	}
	const centerStyles = {
		transform: hoveringOverCenter
			? `scale(1.1)`
			: hovering.left || hovering.right
			? `scale(0.8)`
			: `scale(1)`,
		opacity: notHoveringAnything ? 0.75 : hoveringOverCenter ? 1 : 0.25,
	}
	const rightStyles = {
		transform: hovering.left
			? `translateX(${shiftTextBy}px) scale(0.8)`
			: hovering.right
			? `translateX(-${shiftTextBy}px) scale(1.1)`
			: `translateX(0) scale(1)`,
		opacity: notHoveringAnything
			? 0.75
			: hovering.right && !hoveringOverCenter
			? 1
			: 0.25,
	}

	return (
		<Wrapper>
			<Svg viewBox={VIEWBOX} ref={ref}>
				<Circle
					cx={RIGHT_CENTER.x}
					cy={RIGHT_CENTER.y}
					r={RADIUS}
					fill="var(--color-venn-1)"
					{...rightCircleStyle}
				/>
				<Circle
					cx={LEFT_CENTER.x}
					cy={LEFT_CENTER.y}
					r={RADIUS}
					fill="var(--color-venn-0)"
					{...leftCircleStyle}
				/>
			</Svg>
			<TextLayer>
				<Left style={leftStyles}>
					<TextButton
						onFocus={() =>
							setHovering({ left: true, right: false })
						}
						onBlur={() =>
							setHovering({ left: false, right: false })
						}
					>
						{left}
					</TextButton>
				</Left>
				<Right style={rightStyles}>
					<TextButton
						onFocus={() =>
							setHovering({ left: false, right: true })
						}
						onBlur={() =>
							setHovering({ left: false, right: false })
						}
					>
						{right}
					</TextButton>
				</Right>
				<Center style={centerStyles}>
					<TextButton
						onFocus={() => setHovering({ left: true, right: true })}
						onBlur={() =>
							setHovering({ left: false, right: false })
						}
					>
						{center}
					</TextButton>
				</Center>
			</TextLayer>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: relative;
`

const Svg = styled.svg`
	display: block;
	overflow: visible;
`

const Circle = styled(animated.circle)`
	transform-origin: 50% 50%;
`

const TextLayer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	pointer-events: none;
`

const Text = styled(animated.div)`
	flex: 1;
	transition: transform 500ms, opacity 400ms;
	will-change: transform;
`

const TextButton = styled(UnstyledButton)`
	padding: 0 20px;
	text-align: center;
	color: var(--color-text);
`

const Left = styled(Text)`
	padding-left: 20px;
	order: 1;
`
const Right = styled(Text)`
	padding-right: 20px;
	order: 3;
`
const Center = styled(Text)`
	font-weight: var(--font-weight-bold);
	order: 2;
`

export default VennDiagram

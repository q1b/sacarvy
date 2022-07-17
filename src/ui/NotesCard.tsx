import { LinkIcon } from "@/assets/icons"
import { useHover } from "@/hooks/use-hover"
import { useMouse } from "@/hooks/use-mouse"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { animateTo } from "@/utils/animateTo"
import { throttle } from "@solid-primitives/scheduled"
import { createEffect, createUniqueId } from "solid-js"
import { ease5, easeElastic2, easeSquish5 } from "./utils/easing"

export interface Props {
	url: string
	title: string
	description: string
	publishedOn: string
}

// const { title, description, publishedOn, url } = Astro.props as Props

function formatDate(date: Date) {
	return new Intl.DateTimeFormat("en", {
		dateStyle: "long",
	}).format(date)
}

export default function NotesCard(props: Props) {
	const { title, description, publishedOn, url } = props
	let ref: HTMLDivElement
	let views = 10
	const date = new Date(publishedOn)
	const { position, setRef } = useMouse({
		x: 0,
		y: 20,
		delay: 10,
	})
	const reduced = useReducedMotion()
	const trigger = throttle((x: number, y: number) => {
		if (!reduced)
			animateTo(
				ref,
				{
					top: [`${y - 40}px`],
					left: [`${x - 40}px`],
				},
				{
					duration: 400,
					easing: easeElastic2,
				}
			)
	}, 50)
	createEffect(() => {
		trigger(position.x, position.y)
	})
	const svgId = createUniqueId()
	return (
		<a href={url} class="relative w-full">
			<svg
				class="pointer-events-none absolute rounded-xl isolate z-40 opacity-40 dark:opacity-70 mix-blend-multiply dark:mix-blend-soft-light"
				width="100%"
				height="100%"
			>
				<filter id={svgId}>
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.80"
						numOctaves="4"
						stitchTiles="stitch"
					></feTurbulence>
				</filter>
				<rect
					width="100%"
					height="100%"
					filter={`url(#${svgId})`}
				></rect>
			</svg>
			<div
				ref={(el: HTMLAnchorElement) => {
					setRef(el)
				}}
				class="p-4 relative overflow-hidden cursor-pointer group rounded-xl backdrop-blur-md backdrop-saturate-150 shadow-glass shadow-teal-200/10 dark:shadow-teal-800/10 bg-teal-200 hover:bg-teal-200 dark:bg-teal-800 dark:hover:bg-teal-800 transition-colors"
			>
				<div
					ref={(el) => (ref = el)}
					class="bg-emerald-300/80 pointer-events-none blur-2xl w-20 h-20 rounded-full absolute z-10"
				></div>
				<div class="absolute top-4 right-4">
					<LinkIcon basic class="text-teal-900 dark:text-white" />
				</div>
				<h1 class="text-3xl z-30 tracking-tight mb-1 font-bold bg-gradient-to-tr from-teal-500 to-teal-400 dark:from-teal-100 dark:to-emerald-400 w-max text-transparent bg-clip-text pb-0.5">
					{title}
				</h1>
				<div class="flex items-center w-max gap-x-1">
					<dl class="h-5">
						<dt class="sr-only">Published On</dt>
						<dd class="text-sm pl-0.5 font-medium text-teal-500 dark:text-white mb-2">
							{/* <!-- <time datetime="2021-09-30T19:00">September 30, 2021</time> --> */}
							<time datetime={date.toISOString()}>
								{formatDate(date)}
							</time>
						</dd>
					</dl>
					<div class="h-4 w-0.5 bg-slate-700 dark:bg-white rounded-full"></div>
					<div class="text-sm font-medium text-teal-500 dark:text-white w-max">
						<span>{views}</span> views
					</div>
					<div class="h-4 w-0.5 bg-slate-700 dark:bg-white rounded-full"></div>
					<div class="text-sm font-medium text-teal-500 dark:text-white w-max">
						<span>{views}</span> viewing
					</div>
				</div>
				<p class="text-xl font-medium text-teal-600 dark:text-teal-400 mb-2">
					{description}
				</p>
				<div class="flex items-center">
					<div class="text-xs flex items-center h-6 px-3 bg-white/50 dark:bg-amber-300/20 font-bold w-max text-amber-700 dark:text-white rounded-full shadow-sm">
						JavaScript
					</div>
				</div>
			</div>
		</a>
	)
}

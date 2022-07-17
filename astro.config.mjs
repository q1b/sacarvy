import { defineConfig } from "astro/config" // Icons Helpers

import Icons from "unplugin-icons/vite"
import solid from "@astrojs/solid-js"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import remarkDirective from "remark-directive"
import { visit } from "unist-util-visit"
import { h } from "hastscript" // https://github.com/timlrx/rehype-prism-plus

function withLinkRoles() {
	return (tree) => {
		visit(tree, "element", (element) => {
			if (["ol", "ul"].includes(element.tagName)) {
				element.properties.role = "list"
			}
		})
	}
} // This plugin is an example to let users write HTML with directives.
// It’s informative but rather useless.
// See below for others examples.

/** @type {import('unified').Plugin<[], import('mdast').Root>} */

function myRemarkPlugin() {
	return (tree) => {
		visit(tree, (node) => {
			if (
				node.type === "textDirective" ||
				node.type === "leafDirective" ||
				node.type === "containerDirective"
			) {
				const data = node.data || (node.data = {})
				const hast = h(node.name, node.attributes)
				data.hName = hast.tagName
				data.hProperties = hast.properties
			}
		})
	}
} // This plugin is an example to turn `::youtube` into iframes.
// <!-- ::youtube[Video of a cat in a box]{#01ab2cd3efg} -->

/** @type {import('unified').Plugin<[], import('mdast').Root>} */

function youtubeRemarkPlugin() {
	return (tree, file) => {
		visit(tree, (node) => {
			if (
				node.type === "textDirective" ||
				node.type === "leafDirective" ||
				node.type === "containerDirective"
			) {
				if (node.name !== "youtube") return
				const data = node.data || (node.data = {})
				const attributes = node.attributes || {}
				const id = attributes.id
				if (node.type === "textDirective")
					file.fail(
						"Text directives for `youtube` not supported",
						node
					)
				if (!id) file.fail("Missing video id", node)
				data.hName = "iframe"
				data.hProperties = {
					src: "https://www.youtube.com/embed/" + id,
					width: 200,
					height: 200,
					frameBorder: 0,
					allow: "picture-in-picture",
					allowFullScreen: true,
				}
			}
		})
	}
} // This plugin is an example to turn `::youtube` into iframes.
// <!-- ::github[Link to github]{#remarkjs/remark-directive} -->

/** @type {import('unified').Plugin<[], import('mdast').Root>} */

function githubRemarkPlugin() {
	return (tree, file) => {
		visit(tree, (node) => {
			if (
				node.type === "textDirective" ||
				node.type === "leafDirective" ||
				node.type === "containerDirective"
			) {
				if (node.name !== "github") return
				const data = node.data || (node.data = {})
				const attributes = node.attributes || {}
				const id = attributes.id
				if (node.type === "textDirective")
					file.fail(
						"Text directives for `youtube` not supported",
						node
					)
				data.hName = "a"
				data.hProperties = {
					href: "https://www.github.com/" + id,
				}
			}
		})
	}
}

// https://astro.build/config
export default defineConfig({
	site: "https://peadevp.com/",
	integrations: [solid(), tailwind(), sitemap()],
	vite: {
		ssr: {
			noExternal: ["smartypants"],
			// external: ["svgo", "@11ty/eleventy-img"],
		},
		plugins: [
			Icons({
				compiler: "solid",
			}),
		],
	},
	markdown: {
		shikiConfig: {
			theme: "css-variables", // wrap: true,
		},
		rehypePlugins: [
			"rehype-slug",
			[
				"rehype-autolink-headings",
				{
					behavior: "wrap",
				},
			],
		],
		remarkPlugins: [
			withLinkRoles,
			remarkBreaks,
			remarkDirective,
			myRemarkPlugin,
			youtubeRemarkPlugin,
			githubRemarkPlugin,
			remarkGfm,
		],
	},
})

const buildMaterial = require("./build/index.js")
const { join } = require("path")
const template = require("./utils/index")

// Thing on Using YAML
// const YAML = require("yaml")
// const file = fs.readFileSync("./file.yml", "utf8")
// YAML.parse(file)

const RequiredIcons = [
	{
		outline: "fluent:person-48-regular",
		solid: "fluent:person-48-filled",
		name: "Profile",
	},
	{
		outline: "fluent:pen-48-regular",
		solid: "fluent:pen-48-filled",
		name: "Pen",
	},
	{
		outline: "fluent:notebook-24-regular",
		solid: "fluent:notebook-24-filled",
		name: "Notebook",
	},
	{
		outline: "fluent:board-split-16-regular",
		solid: "fluent:board-split-16-filled",
		name: "Board",
	},
	{
		outline: "fluent:line-horizontal-3-20-regular",
		solid: "fluent:line-horizontal-3-20-filled",
		name: "Menu",
	},
	{
		outline: "heroicons-outline:x",
		solid: "heroicons-solid:x",
		name: "X",
	},
	{
		outline: "fluent:panel-top-expand-20-regular",
		solid: "fluent:panel-top-expand-20-filled",
		name: "ExpandTop",
	},
	{
		outline: "fluent:panel-top-contract-20-regular",
		solid: "fluent:panel-top-contract-20-filled",
		name: "ContractTop",
	},
	{
		outline: "heroicons-outline:chat-alt-2",
		solid: "heroicons-solid:chat-alt-2",
		name: "Chat",
	},
	{
		outline: "heroicons-outline:chevron-right",
		solid: "heroicons-solid:chevron-right",
		name: "ChevronRight",
	},
	{
		outline: "fluent:link-square-24-regular",
		solid: "fluent:link-square-24-filled",
		name: "Link",
	},
	{
		outline: "fluent:clipboard-code-24-regular",
		solid: "fluent:clipboard-code-24-filled",
		name: "ClipboardCode",
	},
	{
		outline: "fluent:code-24-regular",
		solid: "fluent:code-24-filled",
		name: "Code",
	},
	{
		outline: "fluent:clipboard-checkmark-24-regular",
		solid: "fluent:clipboard-checkmark-24-filled",
		name: "ClipboardCheck",
	},
	{
		outline: "fluent:share-48-regular",
		solid: "fluent:share-48-filled",
		name: "Share",
	},
	{
		path: "eos-icons:loading",
		name: "Loading",
	},
]

let preFile = `
import { ComponentProps, splitProps } from "solid-js"
type IconProps<P = {}> = P & {
    size?: number
    basic?: boolean
}`

RequiredIcons.forEach((detail) => (preFile += template(detail)))

buildMaterial(
	join(__dirname, "../", "../", "src", "assets", "icons", "index.tsx"),
	preFile
)

{
	/* Rabbit in World <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--fluent" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 28"><g fill="none"><path d="M16.996 10.77l-1.917-1.89a2.27 2.27 0 0 1 0-3.214a2.274 2.274 0 0 1 3.214 0l6.33 6.292a4.696 4.696 0 0 1 0 6.646a4.695 4.695 0 0 1-3.7 1.36a3.18 3.18 0 0 1-2.971 2.044H9.191A3.189 3.189 0 0 1 6 18.828v-1.864a3.5 3.5 0 1 1 2.548-5.186a5.302 5.302 0 0 1 2.771-.776h4.505c.306 0 .608.026.901.076c.082-.104.173-.208.27-.307zm.238-4.043a.774.774 0 0 0-1.094 0a.77.77 0 0 0-.002 1.09l.002.001l3.222 3.18l-1.004.577c-.246.159-.51.469-.648.713l-.289.513l-.567-.159a3.818 3.818 0 0 0-1.03-.14h-4.505A3.816 3.816 0 0 0 7.5 16.308v2.52c0 .923.758 1.68 1.69 1.68H14v-.327c0-.927-.753-1.68-1.683-1.68h-1.571a.75.75 0 0 1 0-1.5h1.571a3.181 3.181 0 0 1 3.182 3.18v.326h2.453c.861 0 1.57-.646 1.668-1.476l.099-.84l.822.199a3.203 3.203 0 0 0 3.021-.848a3.196 3.196 0 0 0 .001-4.522v-.001l-6.33-6.292zM7.36 12.765a2 2 0 1 0-1.286 2.65a5.283 5.283 0 0 1 1.286-2.65z" fill="currentColor"></path></g></svg>*/
}
{
	/* Turtle in Peace <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--fluent" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 28"><g fill="none"><path d="M12.72 5c-2.165 0-3.708.656-4.817 1.761c-1.08 1.078-1.676 2.513-2.105 3.932L5.1 13.002H2.752a.75.75 0 0 0-.75.75c0 1.344.764 2.484 1.873 3.1l-.589 1.432A1.968 1.968 0 0 0 5.104 21h2.194c.762 0 1.454-.44 1.778-1.13l.707-1.503c1.97.273 3.968.276 5.939.01l.702 1.493A1.965 1.965 0 0 0 18.202 21h2.172a1.964 1.964 0 0 0 1.818-2.717L21.663 17H24c1.013 0 2-.784 2-1.886V14c0-1.706-1.48-2.997-3.182-2.997H19.87l-.094-.311c-.433-1.431-1.063-2.865-2.178-3.94C16.457 5.655 14.887 5 12.72 5zm8.51 10.5l-.907-2.997h2.495c.985 0 1.682.727 1.682 1.497v1.114c0 .135-.17.386-.5.386h-2.77zm-1.067 1.795l.642 1.56a.468.468 0 0 1-.43.645h-2.173a.465.465 0 0 1-.42-.268l-.526-1.119a21.913 21.913 0 0 0 2.907-.818zm-11.912.804l-.532 1.133a.465.465 0 0 1-.421.268H5.104a.465.465 0 0 1-.43-.645l.632-1.54c.074.01.15.017.225.022c.893.313 1.802.567 2.72.762zm-3.604-3.597l-.272.897a2.14 2.14 0 0 1-.72-.897h.992zm2.587-3.376c.407-1.348.915-2.492 1.728-3.302C9.748 7.04 10.888 6.5 12.72 6.5c1.837 0 3.016.542 3.836 1.332c.843.813 1.38 1.959 1.784 3.294l1.427 4.717a20.4 20.4 0 0 1-13.959 0l1.426-4.716z" fill="currentColor"></path></g></svg>*/
}

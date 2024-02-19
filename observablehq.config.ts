// See https://observablehq.com/framework/config for documentation.
export default {
	// The project’s title; used in the sidebar and webpage titles.
	title: "Dashboards",

	// The pages and sections in the sidebar. If you don’t specify this option,
	// all pages will be listed in alphabetical order. Listing pages explicitly
	// lets you organize them into sections and have unlisted pages.
	pages: [
		{
			name: "Introductions",
			pages: [
				{ name: "Intro", path: "/intro" },
				{ name: "Intro Data", path: "/intro-data" },
			],
		},
		{
			name: "Explorations",
			pages: [
				{ name: "Jobs over time", path: "/job-over-time" },
				{ name: "Jobs over time filtered", path: "/job-over-time-filtered" },
			],
		},
		{
			name: "Components",
			pages: [
				{ name: "Table companies", path: "/components/table-companies" },
				{ name: "Table jobs", path: "/components/table-jobs" },
				{ name: "Timeline", path: "/components/timeline" },
				{ name: "Heatmap", path: "/components/heatmap" },
				{ name: "Heatmap company", path: "/components/heatmap-company" },
			],
		},
	],

	// Some additional configuration options and their defaults:
	// theme: "default", // try "light", "dark", "slate", etc.
	// header: "", // what to show in the header (HTML)
	// footer: "Built with Observable.", // what to show in the footer (HTML)
	// toc: true, // whether to show the table of contents
	// pager: true, // whether to show previous & next links in the footer
	// root: "docs", // path to the source root for preview
	// output: "dist", // path to the output root for build
};

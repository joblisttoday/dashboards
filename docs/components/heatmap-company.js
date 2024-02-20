import * as Plot from "npm:@observablehq/plot";

export default function githubStyleCommits(data = [], size = {}) {
	const { width = 800, height = 200 } = size;
	return Plot.plot({
		width,
		height,
		padding: 0,
		fy: { domain: [0, 6] },
		color: { scheme: "Turbo" },
		marks: [
			Plot.cell(data, {
				x: (d) => d.year + "-" + d.woy,
				y: (d) => d.dow,
				fill: "total",
				fillOpacity: 1,
				stroke: "var(--theme-background)",
				title: (d) =>
					`${d.total || "No"} job${d.total > 1 ? "s" : ""} published on ${d.date}`,
			}),
		],
		style: {
			color: "var(--c-fg)",
			backgroundColor: "var(--c-bg)",
			borderColor: "var(--c-fg)",
		},
		x: {
			tickFormat: (x) => {
				const [year, woy] = x.split("-");
				if (woy % 7 === 0) {
					return new Date(1000 * 60 * 60 * 24 * 7 * woy).toLocaleString(
						"en-us",
						{
							month: "short",
						},
					);
				}
			},
		},
		y: {
			tickFormat: (y) => {
				if (y % 2 === 0) {
					return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][y];
				}
			},
		},
	});
}

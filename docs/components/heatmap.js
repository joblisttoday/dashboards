import * as Plot from "npm:@observablehq/plot";
import { resize } from "npm:@observablehq/stdlib";

export default function heatmapCompany(
	data = [],
	{ height = 200, ...options } = {},
) {
	data = data.map((d) => {
		return { ...d, date: new Date(d.date) };
	});
	return resize((width) => {
		return Plot.plot({
			width,
			height,
			color: { scheme: "Turbo" },
			...options,
			marks: [
				Plot.cell(data, {
					x: (d) => d.year + "-" + d.woy,
					y: (d) => d.dow,
					fill: "total",
					fillOpacity: 0.9,
					stroke: "var(--theme-background)",
					inset: 1,
					title: (d) => {
						const date = d.date.toLocaleString("en-us", {
							year: "numeric",
							month: "short",
							day: "numeric",
						});
						return `${d.total || "No"} job${d.total > 1 ? "s" : ""} published on ${date}`;
					},
				}),
			],
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
			style: {
				color: "var(--theme-foreground)",
				backgroundColor: "var(--theme-background)",
				borderColor: "var(--theme-foreground)",
			},
		});
	});
}

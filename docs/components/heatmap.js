import * as Plot from "npm:@observablehq/plot";
import { resize } from "npm:@observablehq/stdlib";

export default function heatmap(data = [], { height, ...options } = {}) {
	return resize((width) => {
		return Plot.plot({
			width,
			height,
			color: { scheme: "Turbo" },
			...options,
			marks: [
				Plot.cell(data, {
					x: (d) => `${d.year}-${d.month}`,
					y: (d) => d.day,
					fill: "total",
					fillOpacity: 0.9,
					inset: 1,
					title: (d) => {
						return `${d.total || "No"} job${d.total > 1 ? "s" : ""} published on ${d.date}`;
					},
				}),
			],
			x: {
				tickFormat: (x) => {
					const [year, woy] = x.split("-");
					const month = new Date(1000 * 60 * 60 * 24 * 7 * woy).toLocaleString(
						"en-us",
						{
							month: "short",
						},
					);
					return `${year} - ${month}`;
				},
			},
			y: {
				tickFormat: (y) => {
					const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][y % 7];
					return `${day} ${y}`;
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

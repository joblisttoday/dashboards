import * as Plot from "npm:@observablehq/plot";
import { resize } from "npm:@observablehq/stdlib";

/* Plot graph of data published over time */
export default function timeline(data = [], config = {}) {
	const { x = "date", y = "total", z = "z", text = null, height } = config;
	return resize((width) => {
		return Plot.plot({
			width,
			height,
			grid: true,
			x: {
				label: "Job published date",
			},
			y: {
				label: "Number of jobs published",
			},
			marks: [
				Plot.line(data, {
					x,
					y,
					marker: true,
				}),
				Plot.text(data, {
					x,
					y,
					z,
					text,
					dx: -10,
					dy: -30,
					ticks: 10,
				}),
			],
		});
	});
}

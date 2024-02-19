import * as Plot from "npm:@observablehq/plot";
import { resize } from "npm:@observablehq/stdlib";

export default function heatmap(data = [], config = {}) {
	const { height = 400 } = config;
	return resize((width) => {
		return Plot.plot({
			width,
			height,
			marks: [
				Plot.cell(
					data,
					Plot.group(
						{ fill: "max" },
						{
							x: (d) => `${d.year} - ${d.month}`,
							y: (d) => d.day,
							fill: "total",
							inset: 0.5,
						},
					),
				),
			],
		});
	});
}

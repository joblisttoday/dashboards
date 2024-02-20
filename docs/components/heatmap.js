import * as Plot from "npm:@observablehq/plot";
import { resize } from "npm:@observablehq/stdlib";

export default function heatmap(data = [], { height, ...options } = {}) {
	return resize((width) => {
		return Plot.plot({
			width,
			height,
			...options,
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

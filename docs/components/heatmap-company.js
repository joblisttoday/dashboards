import * as Plot from "npm:@observablehq/plot";

export default function heatmapCompany(data = [], size = {}) {
	const { width = 400, height = 300 } = size;
	return Plot.plot({
		width,
		height,
		marks: [
			Plot.cell(
				data,
				Plot.group(
					{ fill: "max" },
					{
						x: (d) => d.month,
						y: (d) => d.day,
						fill: "total",
						inset: 0.5,
					},
				),
			),
		],
	});
}

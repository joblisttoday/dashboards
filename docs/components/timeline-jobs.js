import * as Plot from "npm:@observablehq/plot";

export function timelineJobs(jobsOvertime, size) {
    const {width, height} = size;
    return Plot.plot({
        width,
        height,
        marginTop: 30,
        x: {
            nice: true,
            label: "Published day",
            tickFormat: "%Y-%m-%d"
        },
        y: {
            // axis: null,
            nice: true,
            label: "Number of jobs published",
        },
        marks: [
            Plot.ruleX(jobsOvertime, {x: "published_day", y: "nb_job_published", markerEnd: "dot", strokeWidth: 2.5}),
            Plot.ruleY([0]),
            Plot.text(jobsOvertime, {x: "published_day", y: "nb_job_published", text: "name", lineAnchor: "bottom", dy: -10, lineWidth: 10, fontSize: 12})
        ]
    });
}

// const color = Plot.scale({
//   color: {
//     type: "categorical",
//     domain: d3.groupSort(jobsOvertime, (D) => -D.length, (d) => d.state),
//     unknown: "var(--theme-foreground-muted)"
//   }
// });

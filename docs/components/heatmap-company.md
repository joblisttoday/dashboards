---
title: Heatmap company
---
```js
import heatmapCompany from "./heatmap-company.js";
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
```
# Timeline query

```js
const searchParams = new URLSearchParams(window.location.search)
const slug = searchParams.get("slug") || "spacex"
const days = searchParams.get("days") || 365
const companyJobsPerDayQuery = `
SELECT
    published_date AS date,
    strftime('%Y', published_date) AS year,
    strftime('%m', published_date) AS month,
    strftime('%d', published_date) AS day,
    COUNT(*) AS total
FROM
    jobs
WHERE
    date > DATE('now', '-' || ? ||' day')
AND
    company_slug = ?
GROUP BY
    date
ORDER BY
    date DESC;
`;

const companyJobsPerDay = await db.query(companyJobsPerDayQuery, [days, slug]);
view(companyJobsPerDay)
```

Evolution of daily job postings for [${slug}](https://profiles.joblist.today/companies/${slug}).

## Heatmap

```js
resize((width) => heatmapCompany(companyJobsPerDay, {width}))
```

```js
Plot.plot({
  padding: 0,
  x: {axis: null},
  y: {tickFormat: Plot.formatWeekday("en", "narrow"), tickSize: 0},
  fy: {tickFormat: "", reverse: true},
  color: {scheme: "PiYG", legend: true, label: "Daily change", tickFormat: "+%", domain: [-0.06, 0.06]},
  marks: [
    Plot.cell(companyJobsPerDay, {
      x: (d) => d3.utcWeek.count(d.year, d.date),
      y: (d) => d.day,
      fy: (d) => d.year,
      fill: (d, i) => i > 0 ? (d.total - companyJobsPerDay[i - 1].total) / companyJobsPerDay[i - 1].total : NaN,
      title: (d, i) => i > 0 ? ((d.total - companyJobsPerDay[i - 1].total) / companyJobsPerDay[i - 1].total * 100).toFixed(1) : NaN,
      inset: 0.5
    })
  ]
})
```

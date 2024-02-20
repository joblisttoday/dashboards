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
const days = searchParams.get("days") || 31
const companyJobsPerDayQuery = `
WITH RECURSIVE date_range AS (
  SELECT MIN(published_date) AS min_date, MAX(published_date) AS max_date FROM jobs
  WHERE published_date > DATE('now', '-' || ? || ' ' || 'days')
  UNION ALL
  SELECT date(min_date, '+1 day'), max_date FROM date_range WHERE min_date < max_date
)
SELECT
  COALESCE(company_slug, ?) AS company_slug,
  date_range.min_date AS date,
  COALESCE(COUNT(DISTINCT ObjectId), 0) AS total,
  strftime('%Y', date_range.min_date) AS year,
  strftime('%m', date_range.min_date) AS month,
  strftime('%d', date_range.min_date) AS day
FROM
  date_range
LEFT JOIN
  jobs ON date_range.min_date = jobs.published_date
AND company_slug = ?
OR company_slug is null
GROUP BY 1,2
ORDER BY published_date ASC;
`;

const companyJobsPerDay = await db.query(companyJobsPerDayQuery, [days, slug, slug]);
view(companyJobsPerDay)
```

Evolution of daily job postings for **${slug}**.

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

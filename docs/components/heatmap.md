---
title: heatmap
---
```js
import heatmap from "./heatmap.js";
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
```
# Timeline query

Evolution of daily job postings over time, all jobs from all companies globally.
```js
const searchParams = new URLSearchParams(window.location.search)
const days = searchParams.get("days") || 365
```
> Use the `?days=` URL search param to update the sourced data.

```js
const jobs = await db.query("SELECT * FROM jobs;")
const jobsPerDayQuery = `
SELECT
    published_date AS date,
    strftime('%Y', published_date) AS year,
    strftime('%m', published_date) AS month,
    strftime('%d', published_date) AS day,
    COUNT(*) AS total
FROM
    jobs
WHERE
    date > DATE("now", "-" || ? || " " || "days")
GROUP BY
    date
ORDER BY
    date DESC;
`
const jobsPerDay = await db.query(jobsPerDayQuery, [days]);
view(jobsPerDay)
```
## Heatmap

```js
heatmap(jobsPerDay)
```

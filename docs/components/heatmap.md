---
title: heatmap
---
```js
import heatmap from "./heatmap.js";
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
```
# Heatmap
```js
const searchParams = new URLSearchParams(window.location.search)
const days = searchParams.get("days") || 365
```
> Use the `?days=` URL search param to update the sourced data.

Evolution of daily job postings **for all companies** in the last **${days}** days.

```js
const jobs = await db.query("SELECT * FROM jobs;")
const jobsPerDayQuery = `
WITH RECURSIVE date_range AS (
  SELECT
    MIN(published_date) AS min_date,
    MAX(published_date) AS max_date
  FROM jobs
  WHERE published_date > DATE('now', '-' || ? || ' days')
  UNION ALL
  SELECT DATE(min_date, '+1 day'), max_date
  FROM date_range
  WHERE min_date < max_date
)
SELECT
  date_range.min_date AS date,
  COALESCE(COUNT(DISTINCT jobs.id), 0) AS total,
  strftime('%Y', date_range.min_date) AS year,
  strftime('%m', date_range.min_date) AS month,
  strftime('%u', date_range.min_date) AS dow,
  strftime('%j', date_range.min_date) AS doy,
  strftime('%W', date_range.min_date) AS woy
FROM
  date_range
LEFT JOIN
  jobs ON DATE(date_range.min_date) = DATE(jobs.published_date)
GROUP BY
  date_range.min_date
ORDER BY
  date_range.min_date ASC;
`
const jobsPerDay = await db.query(jobsPerDayQuery, [days]);
```

```js
heatmap(jobsPerDay)
```

```js
view(jobsPerDay)
```

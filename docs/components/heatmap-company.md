---
title: Heatmap company
---
```js
import heatmap from "./heatmap.js";
const db = await SQLiteDatabaseClient.open("https://workers.joblist.today/joblist.db");
```
# Heatmap company
```js
const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id") || "spacex"
const days = searchParams.get("days") || 365
```
> Use the `?id=` and `?days=` URL search params to update the sourced data.

Evolution of daily job postings for **${id}** in the last **${days}** days.

```js
const companyJobsPerDayQuery = `
WITH RECURSIVE date_range AS (
  SELECT
    MIN(published_date) AS min_date,
    MAX(published_date) AS max_date
  FROM jobs
  WHERE published_date > DATE('now', '-' || ? || ' days')
  UNION ALL
  SELECT date(min_date, '+1 day'), max_date
  FROM date_range
  WHERE min_date < max_date
)
SELECT
  COALESCE(company_id, ?) AS company_id,
  date_range.min_date AS date,
  COALESCE(COUNT(DISTINCT id), 0) AS total,
  strftime('%Y', date_range.min_date) AS year,
  strftime('%m', date_range.min_date) AS month,
  strftime('%u', date_range.min_date) AS dow,
  strftime('%j', date_range.min_date) AS doy,
  strftime('%W', date_range.min_date) AS woy,
  strftime('%s', date_range.min_date) AS sec
FROM
  date_range
LEFT JOIN
  jobs ON date_range.min_date = jobs.published_date
AND company_id = ?
OR company_id is null
GROUP BY 1,2
ORDER BY published_date ASC;
`;

const companyJobsPerDay = await db.query(companyJobsPerDayQuery, [days, id, id]);
```

```js
heatmap(companyJobsPerDay)
```

```js
view(companyJobsPerDay)
```

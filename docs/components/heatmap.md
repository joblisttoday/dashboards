---
---
```js
import heatmap from "./heatmap.js";
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
```
# Timeline query

Evolution of daily job postings over time, all jobs from all companies globally.

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
    date > DATE("now", "-1 year")
GROUP BY
    date
ORDER BY
    date DESC;
`
const jobsPerDay = await db.query(jobsPerDayQuery);
view(jobsPerDay)
```
## Heatmap

```js
resize((width) => heatmap(jobsPerDay, {width}))
```

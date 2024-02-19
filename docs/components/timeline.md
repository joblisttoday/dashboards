```js
import timeline from "./timeline.js";
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
```
# Query

```js
const jobs = await db.query("SELECT * FROM jobs;")
const jobsPerDayQuery = `
SELECT
    published_date AS date,
    COUNT(*) AS total
FROM
    jobs
WHERE
    DATE(date) > DATE("now", "-10 day")
GROUP BY
    date;
`
const jobsPerDay = await db.query(jobsPerDayQuery);
view(jobsPerDay)
```

## Timeline

```js
resize((width) => timeline(jobsPerDay, {width}))
```

---
title: Jobs over time
toc: false
---

```js
import timeline from "./components/timeline.js";
import heatmap from "./components/heatmap.js";
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
```
# Jobs over time

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
    date > DATE("now", "-10 year")
GROUP BY
    date
ORDER BY
    date DESC;
`
const jobsPerDay = await db.query(jobsPerDayQuery);
view(jobsPerDay)
```

```js
const sinceDate = new Date();
sinceDate.setFullYear(sinceDate.getFullYear() - 1);
const inputDateFrom = view(Inputs.date({label: "from", value: sinceDate }));
const inputDateTo = view(Inputs.date({label: "to", value: Date.now()}));
```

```js
const dateFrom = new Date(inputDateFrom)
const dateTo = new Date(inputDateTo)
const filterByDate = function(item) {
    const itemDate = new Date(item.date)
    return  itemDate > dateFrom && itemDate < dateTo
}

const dateCompaniesJobs = jobsPerDay.filter(filterByDate)
display(dateCompaniesJobs)
```

## Timeline
```js
timeline(dateCompaniesJobs)
```
> The number of jobs posted by days, in the latest version of the database.

## Heatmap
```js
heatmap(dateCompaniesJobs)
```

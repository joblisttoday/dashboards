---
theme: dashboard
title: Jobs over time filtered
toc: false
---

# Jobs filtered

Trying to filter the jobs by companies, and display it over time.

## Load data

```js
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
```

Jobs by companies by date.
```js
const query = `
SELECT
  published_date,
  company_slug,
  COUNT(DISTINCT objectID) AS total_jobs
FROM jobs
WHERE published_date > DATE('now', '-1 month')
  AND published_date IS NOT NULL
GROUP BY published_date, company_slug;
`;
const companiesJobs = await db.query(query);
view(companiesJobs)
```

```js
const searchCompaniesJobs = view(Inputs.search(companiesJobs))
```

```js
Inputs.table(searchCompaniesJobs)
```

```js
const start = view(Inputs.date({label: "Start", value: "2021-09-21"}));
```

## Display stack bar chart filtered

```js
Plot.plot({
  color: {legend: true},
  y: {grid: true},
  marks: [
    Plot.rectY(searchCompaniesJobs, {x: "published_date", y: "total_jobs",fill: "company_slug"}),
    Plot.ruleY([0])
  ]
})
```

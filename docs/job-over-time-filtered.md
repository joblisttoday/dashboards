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

```js
const distCompaniesQuery = `
SELECT DISTINCT
  company_slug
FROM jobs
WHERE published_date > DATE('now', '-1 month')
  AND published_date IS NOT NULL;
`
const distCompanies = await db.query(distCompaniesQuery);
const distCompaniesSlugs = distCompanies.map((item) => {
		return item.company_slug
})
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
const searchOption = {
  datalist: distCompaniesSlugs

}
const searchCompaniesJobs = view(Inputs.search(companiesJobs, searchOption))
```

```js
const startDate = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
const start = view(Inputs.date({label: "From start date", value: startDate}));
```

```js
const startDate = new Date(start)

const filterByDate = function(item) {
  console.log(new Date(item.published_date) > startDate)
  return new Date(item.published_date) > startDate
}

const dateCompaniesJobs = searchCompaniesJobs.filter(filterByDate)
display(dateCompaniesJobs)
```

## Display stack bar chart filtered

```js
Plot.plot({
  color: {legend: true},
  y: {grid: true},
  marks: [
    Plot.rectY(dateCompaniesJobs, {x: "published_date", y: "total_jobs",fill: "company_slug"}),
    Plot.ruleY([0])
  ]
})
```

## Raw data

```js
Inputs.table(dateCompaniesJobs)
```

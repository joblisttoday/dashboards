---
title: Jobs over time filtered
toc: false
---

```js
import tableJobs from "./components/table-jobs.js"
```

# Jobs filtered

Trying to filter the jobs by companies, and display it over time.

## Load data

```js
const db = await SQLiteDatabaseClient.open("https://workers.joblist.today/joblist.db");
```

```js
const distCompaniesQuery = `
SELECT DISTINCT
  company_id
FROM jobs
WHERE published_date > DATE('now', '-1 month')
  AND published_date IS NOT NULL;
`
const distCompanies = await db.query(distCompaniesQuery);
const distCompaniesIds = distCompanies.map((item) => {
		return item.company_id
})
```

Jobs by companies by date.

```js
const query = `
SELECT
  published_date,
  company_id,
  COUNT(DISTINCT id) AS total_jobs
FROM jobs
WHERE published_date > DATE('now', '-1 month')
  AND published_date IS NOT NULL
GROUP BY published_date, company_id;
`;
const companiesJobs = await db.query(query);
view(companiesJobs)
```

```js
const searchOption = {
  datalist: distCompaniesIds

}
const searchCompaniesJobs = view(Inputs.search(companiesJobs, searchOption))
```

```js
const sinceDate = new Date();
sinceDate.setMonth(sinceDate.getMonth() - 1);
const inputDateFrom = view(Inputs.date({label: "from", value: sinceDate }));
const inputDateTo = view(Inputs.date({label: "to", value: Date.now()}));
```

```js
const dateFrom = new Date(inputDateFrom)
const dateTo = new Date(inputDateTo)
const filterByDate = function(item) {
    const itemDate = new Date(item.published_date)
    return  itemDate > dateFrom && itemDate < dateTo
}

const dateCompaniesJobs = searchCompaniesJobs.filter(filterByDate)
display(dateCompaniesJobs)
```

## Stack bar by companies
```js
resize((width) =>Plot.plot({
    width,
    color: {legend: true},
    y: {grid: true},
    marks: [
        Plot.rectY(dateCompaniesJobs, {x: "published_date", y: "total_jobs",fill: "company_id"}),
        Plot.ruleY([0])
    ]
}))
```

## Raw data
```js
tableJobs(dateCompaniesJobs)
```

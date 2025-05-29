---
title: Intro
toc: false
---

# Joblist Data introduction

```js
const databaseFile = await fetch("https://workers.joblist.today/joblist.db");
const db = await SQLiteDatabaseClient.open(databaseFile);
const companies = await db.query(`SELECT * FROM companies;`);
const jobs = await db.query(`SELECT * FROM jobs;`);
const totalCompanies = await db.query(`SELECT total_companies FROM companies_analyze`);
const companiesWithJobs = await db.query("SELECT DISTINCT company_id FROM jobs;")
const jobPublishedThisWeek = await db.query("SELECT * FROM jobs WHERE published_date >= DATE('now', '-7 days');")
```

General statistics about the database of companies and jobs.

<div class="grid grid-cols-4">
  <div class="card">
    <h2>Companies</h2>
    <span class="big">${companies.length.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Companies with Jobs</h2>
    <span class="big">${companiesWithJobs.length.toLocaleString("en-US")}</span>
  </div>
    <div class="card">
    <h2>Jobs</h2>
    <span class="big">${jobs.length.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Jobs published the last 7 days</h2>
    <span class="big">${jobPublishedThisWeek.length.toLocaleString("en-US")}</span>
  </div>
</div>


```js
const companyWithTopJobsQuery = `
SELECT
    companies.id,
    COUNT(jobs.id) AS total_jobs
FROM
    companies
INNER JOIN
    jobs ON companies.id = jobs.company_id
GROUP BY
    companies.id
ORDER BY
    total_jobs DESC
LIMIT 100;
`
const companyWithTop = await db.query(companyWithTopJobsQuery)
```
The companies with the highest number of jobs published are:
```js
view(Inputs.table(companyWithTop, {
    format: {
        id: (x) => html`<a href="https://joblist.today/${x}">${x}</a>`
    }
}))
```

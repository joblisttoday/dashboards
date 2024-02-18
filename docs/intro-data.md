---
theme: dashboard
title: Introduction to the data
toc: false
---

# Data introduction

```js
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
const companies = await db.query(`SELECT * FROM companies;`);
const jobs = await db.query(`SELECT * FROM jobs;`);
const totalCompanies = await db.query(`SELECT total_companies FROM companies_analyze`);
```

There are two main tables in the sqlite3 database `companies` and
`jobs` that have the following content.

# Companies

```js
const searchCompanies = view(Inputs.search(companies))
```

```js
const tableCompanies = view(Inputs.table(searchCompanies))
```

# Jobs
```js
const searchJobs = view(Inputs.search(jobs))
```
```js
const tableJobs = view(Inputs.table(searchJobs))
```

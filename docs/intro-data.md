---
title: Introduction to the data
toc: false
---

```js
import tableJobs from "./components/table-jobs.js"
import tableCompanies from "./components/table-companies.js"
```

# Data introduction

```js
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
const companies = await db.query(`SELECT * FROM companies;`);
const jobs = await db.query(`SELECT * FROM jobs;`);
```

There are two main tables in the sqlite3 database `companies` and
`jobs` that have the following content.

# Companies
```js
const searchCompanies = view(Inputs.search(companies));
```
```js
tableCompanies(searchCompanies)
```

# Jobs
```js
const searchJobs = view(Inputs.search(jobs));
```
```js
tableJobs(searchJobs)
```

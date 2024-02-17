---
theme: dashboard
title: Intro
toc: false
---

# Joblist Data introduction

```js
const databaseFile = await fetch("https://joblist.gitlab.io/workers/joblist.db");
const db = await SQLiteDatabaseClient.open(databaseFile);
const companies = await db.query(`SELECT * FROM companies;`);
const jobs = await db.query(`SELECT * FROM jobs;`);
const totalCompanies = await db.query(`SELECT total_companies FROM companies_analyze`);
```

General statistics about the database of companies and jobs.

<div class="grid grid-cols-4">
  <div class="card">
    <h2>Companies</h2>
    <span class="big">${companies.length.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Jobs</h2>
    <span class="big">${jobs.length.toLocaleString("en-US")}</span>
  </div>
</div>

## Notebook

This webpage aims to help visualize the data from the joblist project. It should also allow to explore the raw data, using the page as "code notebooks" (javasript/json data and sqlite3 queries).

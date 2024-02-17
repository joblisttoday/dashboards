---
theme: dashboard
title: Joblist Intro
toc: false
---

# Joblist Data 🚀

<!-- Load and transform the data -->

```js
const launches = FileAttachment("data/launches.csv").csv({typed: true});
const databaseFile = await fetch("https://joblist.gitlab.io/workers/joblist.db");
const db = await SQLiteDatabaseClient.open(databaseFile);
const companies = await db.query(`SELECT * FROM companies`)
const jobs = await db.query(`SELECT * FROM jobs`)
console.log("companies pass", companies);
```


<!-- Cards with big numbers -->

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

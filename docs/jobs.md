---
title: Jobs
toc: false
---

```js
import tableJobs from "./components/table-jobs.js"
```

```js
const db = await SQLiteDatabaseClient.open("https://workers.joblist.today/joblist.db");
const jobs = await db.query(`SELECT * FROM jobs;`);
```

# Jobs
```js
const searchJobs = view(Inputs.search(jobs));
```
```js
tableJobs(searchJobs)
```

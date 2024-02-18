---
theme: dashboard
title: Jobs over time
toc: false
---

Load data
```js
import {timelineJobs} from "./components/timeline-jobs.js";

const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
```

Transform data
```js
const dbDate = await db.query(`select DATE('now','-1 year');`)
console.log("dbDate", dbDate);

// Const to get the total nb of jobs published per day
const jobsOvertime = await db.query(`SELECT published_date, COUNT(*) AS nb_job_published FROM jobs WHERE published_date > DATE('now', '-1 year')  GROUP BY 1;`);
const jobsSerialize = jobsOvertime.map((job) => {
  return {
    published_date: new Date(job.published_date),
    nb_job_published: Number(job.nb_job_published),
  }
})
view(jobsSerialize)
```

# Jobs over time

```js
resize((width) => timelineJobs(jobsSerialize, {width, height: 400}))
```

> The number of jobs posted by days, in the latest version of the database.

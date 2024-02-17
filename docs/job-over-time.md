---
theme: dashboard
title: Jobs over time
toc: false
---

```js
import {timelineJobs} from "./components/timeline-jobs.js";

// Load and transform the data
const databaseFile = await fetch("https://joblist.gitlab.io/workers/joblist.db");
const db = await SQLiteDatabaseClient.open(databaseFile);

const dbDate = await db.query(`select DATE('now','-1 year');`)
console.log("dbDate", dbDate);
// Const to get the total nb of jobs published per day
const jobsOvertime = await db.query(`SELECT published_date AS published_day, COUNT(*) AS nb_job_published FROM jobs WHERE published_date > DATE('now', '-1 year')  GROUP BY 1;`);
const jobsSerialize = jobsOvertime.map((job) => {
  return {
    published_day: new Date(job.published_day),
    nb_job_published: Number(job.nb_job_published),
  }
})
console.log("jobsSerialize", jobsSerialize);

console.log("jobsOvertime pass", jobsOvertime[0]);
```

# Joblist Data 🚀

```js
resize((width) => timelineJobs(jobsSerialize, {width, height: 400}))
```
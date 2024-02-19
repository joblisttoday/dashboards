```js
import tableCompanies from "./table-companies.js"
```

```js
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
const jobs = await db.query(`SELECT * FROM jobs;`);
```

# Jobs
```js
const searchJobs = view(Inputs.search(jobs));
```
```js
tableCompanies(searchJobs)
```

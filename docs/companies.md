---
title: Companies
toc: false
---

```js
import tableCompanies from "./components/table-companies.js"
```

```js
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
const companies = await db.query(`SELECT * FROM companies;`);
```

# Companies
```js
const searchCompanies = view(Inputs.search(companies));
```
```js
tableCompanies(searchCompanies)
```

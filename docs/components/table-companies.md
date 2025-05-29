```js
import tableCompanies from "./table-companies.js"
```

```js
const db = await SQLiteDatabaseClient.open("https://workers.joblist.today/joblist.db");
const companies = await db.query(`SELECT * FROM companies;`);
```

# Companies
```js
const searchCompanies = view(Inputs.search(companies));
```
```js
tableCompanies(searchCompanies)
```

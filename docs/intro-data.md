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
view(Inputs.table(searchCompanies, {
    format: {
        slug: (x) => html`<a href="https://profiles.joblist.today/companies/${x}">${x}</a>`,
		job_board_url: (x) => html`<a href="${x}">${x}</a>`,
		company_url: (x) => html`<a href="${x}">${x}</a>`,
		twitter_url: (x) => html`<a href="${x}">${x}</a>`,
		wikipedia_url: (x) => html`<a href="${x}">${x}</a>`,
		github_url: (x) => html`<a href="${x}">${x}</a>`,
		linkedin_url: (x) => html`<a href="${x}">${x}</a>`,
    }
}))
```

# Jobs
```js
const searchJobs = view(Inputs.search(jobs))
```
```js
view(Inputs.table(searchJobs, {
    format: {
        company_slug: (x) => html`<a href="https://profiles.joblist.today/companies/${x}">${x}</a>`,
        url: (x) => html`<a href="${x}">${x}</a>`,
    }
}))
```

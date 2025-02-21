---
toc: false
---

# [Dashboards](http://dashboards.joblist.today) for Joblist

This project is using
[observablehq/framework](https://github.com/observablehq/framework) ([docs](https://observablehq.com/framework/)) to
help visualize the data available in the joblist ecosystem.

# About joblist

- [source code](https://gitlab.com/joblist/dashboards) of the observable 2 dashboards
- [joblist.today](http://joblist.today) for the homepage of this project
- [edit.joblist.today](http://edit.joblist.today) to edit the data, add a company
- [Boards](https://components.joblist.today/apps/boards) for the "job
  board providers" list, that joblist.today supports for indexing
- [joblist.today archives](https://archive.is/https://joblist.today/*)
  and [joblist.gitlab.io
  archives](https://archive.is/https://joblist.gitlab.io/*) the
  dashboard pages can be archived with services like archive.org
  wayback machine (does not seem to work) or
  [archive.today](https://archive.today), allowing to get snapshot of
  the job market's data at any point in time (from joblist's db). To
  make a new snapshot, archive a dashboard to be saved by pasting its
  URL in one of these services.

> See [observablehq@joblist](https://observablehq.com/@joblist) for
> the version 1 of observablehq dashboards, and introduction to
> joblist's data.


```js
const db = await SQLiteDatabaseClient.open("https://joblist.gitlab.io/workers/joblist.db");
const dbDate = await db.query(`select DATE('now') AS date;`)
const {date} = dbDate[0]
```

[Sqlite database date](https://joblist.gitlab.io/workers/joblist.db) ([explore raw](https://sqlime.org/#https://joblist.gitlab.io/workers/joblist.db)) ${date}.

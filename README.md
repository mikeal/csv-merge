# csv-merge

Takes two CSV files with identical columns and writes the last
column to new names in a new csv file.

```javascript
const fs = require('fs')
const read = fs.readFileSync
const f1 = '../npm-regressions/2019-02---2019-02/depOwnersPerMonth.csv'
const f2 = '../npm-regressions/2019-02---2019-02/ownerReleasesByMonth.csv'
const string = merge(read(f1), read(f2), 'dependedOn', 'releases')
console.log(string) // string of the new csv
```

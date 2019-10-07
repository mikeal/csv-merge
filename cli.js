#!/usr/bin/env node
const merge = require('./')
const { readFile } = require('fs').promises

const run = async argv => {
  const csv1 = await readFile(argv.csv1)
  const csv2 = await readFile(argv.csv2)
  console.log(merge(csv1, csv2, argv.column1, argv.column2))
}

const options = yargs => {
  let desc = 'CSV file path.'
  yargs.positional('csv1', { desc })
  yargs.positional('csv2', { desc })
  desc = 'New column name'
  yargs.positional('column1', { desc })
  yargs.positional('column2', { desc })
}

const usage = '$0 <csv1> <csv2> <column1> <column2>'
require('yargs').command(usage, 'merge two csv files', options, run).help().argv

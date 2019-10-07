'use strict'
const parse = require('csv-parse/lib/sync')
const mkcsv = require('mkcsv')
const assert = require('assert')

const parser = input => {
  const records = parse(input, {
    columns: true,
    skip_empty_lines: true
  })
  return records
}

const merge = (csv1, csv2, columnName1, columnName2, empty = 0) => {
  const rows1 = parser(csv1.toString())
  const rows2 = parser(csv2.toString())
  const keys1 = Object.keys(rows1[0])
  const keys2 = Object.keys(rows2[0])
  assert.deepStrictEqual(keys1, keys2)
  const valueKey = keys1.pop()
  const key = keys1

  const db1 = new Map()
  for (const row of rows1) {
    const _key = JSON.stringify(key.map(k => row[k]))
    db1.set(_key, row[valueKey])
  }
  const mk = (_key, v1, v2) => {
    const o = {}
    JSON.parse(_key).forEach((v, i) => { o[key[i]] = v })
    o[columnName1] = v1
    o[columnName2] = v2
    return o
  }
  const output = []
  for (const row of rows2) {
    const _key = JSON.stringify(key.map(k => row[k]))
    let value = db1.get(_key)
    if (!value) value = empty
    db1.delete(_key)
    output.push(mk(_key, value, row[valueKey]))
  }
  for (const [_key, value] of db1.entries()) {
    output.push(mk(_key, value, empty))
  }
  return mkcsv(output)
}

module.exports = merge

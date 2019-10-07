'use strict'
const assert = require('assert')
const { it } = require('mocha')
const main = require('../')

const test = it

const same = (x, y) => assert.ok(x === y)

test('basic ', done => {
  const csv1 = `one,two,three
first,second,3
first,next,3
`
  const csv2 = `one,two,three
first,second,4
next,second,4
`

  const merged = main(csv1, csv2, 'three', 'four')
  same(merged, `ONE,TWO,THREE,FOUR
first,second,3,4
next,second,0,4
first,next,3,0
`)
  done()
})

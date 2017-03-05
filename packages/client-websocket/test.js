'use strict'

const test = require('ava')
const Client = require('./lib/Client')

test('socketParameters()', t => {
  let params

  params = Client.prototype.socketParameters('ws://foo')
  t.is(params, 'ws://foo')

  params = Client.prototype.socketParameters('wss://foo')
  t.is(params, 'wss://foo')

  params = Client.prototype.socketParameters('http://foo')
  t.is(params, undefined)
})

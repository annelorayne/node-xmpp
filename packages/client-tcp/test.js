'use strict'

const test = require('ava')
const Client = require('./lib/Client')

test('socketParameters()', t => {
  let params

  params = Client.prototype.socketParameters('xmpp://foo')
  t.is(params.port, 5222)

  params = Client.prototype.socketParameters('xmpp://foo:1234')
  t.is(params.port, 1234)
})

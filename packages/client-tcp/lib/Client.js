'use strict'

const url = require('url')
const Connection = require('@xmpp/connection-tcp')

class ClientTCP extends Connection {
  connect(uri) {
    const match = Connection.match(uri)
    if (!match) throw new Error(`Invalid URI "${uri}"`)
    return super.connect(match)
  }
}

ClientTCP.prototype.NS = 'jabber:client'

module.exports = ClientTCP

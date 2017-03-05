'use strict'

const Connection = require('@xmpp/connection-tcp')

class ClientTCP extends Connection {
  socketParameters (uri) {
    const params = super.socketParameters(uri)
    params.port = params.port || 5222
    return params
  }
}

ClientTCP.prototype.NS = 'jabber:client'

module.exports = ClientTCP

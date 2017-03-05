'use strict'

const tls = require('tls')
const ConnectionTCP = require('@xmpp/connection-tcp')
const Connection = require('@xmpp/connection')

class ClientTLS extends ConnectionTCP {
  socketParameters (URI) {
    const params = Connection.prototype.socketParameters(URI)
    params.port = params.port || 5223
    return (params.protocol === 'xmpps:')
      ? params
      : undefined
  }
}

ClientTLS.prototype.Socket = tls.TLSSocket
ClientTLS.prototype.NS = 'jabber:client'

module.exports = ClientTLS

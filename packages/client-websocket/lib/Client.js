'use strict'

const Socket = require('./Socket')
const Connection = require('@xmpp/connection')
const xml = require('@xmpp/xml')

const NS_FRAMING = 'urn:ietf:params:xml:ns:xmpp-framing'

/* References
 * WebSocket protocol https://tools.ietf.org/html/rfc6455
 * WebSocket Web API https://html.spec.whatwg.org/multipage/comms.html#network
 * XMPP over WebSocket https://tools.ietf.org/html/rfc7395
*/

class ClientWebSocket extends Connection {
  // https://tools.ietf.org/html/rfc7395#section-3.6
  footer () {
    return xml`<close xmlns="${NS_FRAMING}"/>`
  }

  // https://tools.ietf.org/html/rfc7395#section-3.4
  streamParameters () {
    const params = super.streamParameters()
    params.name = 'open'
    params.attrs.xmlns = NS_FRAMING
    return params
  }

  socketParameters (uri) {
    return uri.match(/^wss?:\/\//) ? uri : undefined
  }
}

ClientWebSocket.prototype.Socket = Socket
ClientWebSocket.prototype.NS = 'jabber:client'

module.exports = ClientWebSocket

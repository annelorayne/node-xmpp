'use strict'

const Socket = require('net').Socket
const Connection = require('@xmpp/connection')
const {escapeXML} = require('@xmpp/xml')

const NS_STREAM = 'http://etherx.jabber.org/streams'

/* References
 * Extensible Messaging and Presence Protocol (XMPP): Core http://xmpp.org/rfcs/rfc6120.html
*/

class TCP extends Connection {
  socketParameters (uri) {
    const params = super.socketParameters(uri)
    return (params.protocol === 'xmpp:')
      ? params
      : undefined
  }

  // https://xmpp.org/rfcs/rfc6120.html#streams-open
  streamParameters () {
    const params = super.streamParameters()
    params.name = 'stream:stream'
    params.attrs['xmlns:stream'] = NS_STREAM
    console.log('tcp', params)
    return params
  }

  // https://xmpp.org/rfcs/rfc6120.html#streams-open
  header (...args) {
    const header = super.header(...args)
    console.log(header)
    return `<?xml version='1.0'?>` + header.substr(0, header.length - 2) + '>'
  }

  // https://xmpp.org/rfcs/rfc6120.html#streams-close
  footer() {
    return '</stream:stream>'
  }
}

TCP.NS = NS_STREAM
TCP.prototype.NS = NS_STREAM
TCP.prototype.Socket = Socket

module.exports = TCP

'use strict'

const Connection = require('@xmpp/connection-tcp')
const crypto = require('crypto')
const {tagString, tag} = require('@xmpp/xml')

/*
 * References
 * https://xmpp.org/extensions/xep-0114.html
 */

function getServerDomain (domain) {
  return domain.substr(domain.indexOf('.') + 1)
}

const NS = 'jabber:component:accept'

class Component extends Connection {
  socketParameters (uri) {
    const params = super.socketParameters(uri)
    params.port = params.port || 5347
    return params
  }

  // https://xmpp.org/extensions/xep-0114.html#example-4
  send (el) {
    if (this.jid && !el.attrs.from) {
      el.attrs.from = this.jid.toString()
    }

    if (this.jid && !el.attrs.to) {
      el.attrs.to = getServerDomain(this.jid.toString())
    }

    return super.send(el)
  }

  // https://xmpp.org/extensions/xep-0114.html#example-1
  header (domain, lang) {
    return tagString`
      <?xml version='1.0'?>
      <stream:stream to='${domain}' ${lang ? `xml:lang='${lang}'` : ''} xmlns='${this.NS}' xmlns:stream='${super.NS}'>
    `
  }

  // https://xmpp.org/extensions/xep-0114.html#example-2
  responseHeader (el, domain) {
    const {name, attrs} = el
    return (
      name === 'stream:stream' &&
      attrs.xmlns === this.NS &&
      attrs['xmlns:stream'] === super.NS &&
      attrs.from === domain &&
      attrs.id
    )
  }

  // https://xmpp.org/extensions/xep-0114.html#example-3
  open (...args) {
    return super.open(...args).then((el) => {
      this.emit('authenticate', (secret) => {
        return this.authenticate(el.attrs.id, secret)
      })
    })
  }

  // https://xmpp.org/extensions/xep-0114.html#example-3
  authenticate (id, password) {
    const hash = crypto.createHash('sha1')
    hash.update(id + password, 'binary')
    return this.sendReceive(tag`<handshake>${hash.digest('hex')}</handshake>`).then((el) => {
      if (el.name !== 'handshake') {
        throw new Error('unexpected stanza')
      }
      this._authenticated()
      this._jid(this._domain)
      this._online()
    })
  }
}

Component.NS = NS
Component.prototype.NS = NS

module.exports = Component

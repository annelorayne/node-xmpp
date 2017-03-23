'use strict'

var inherits = require('node-xmpp-core').inherits
var Mechanism = require('./mechanism')

function XToken () {}

inherits(XToken, Mechanism)

XToken.prototype.name = 'X-TOKEN'

XToken.prototype.auth = function () {
  return this.authzid + '\0' +
  this.authcid + '\0' +
  this.password
}

XToken.prototype.match = function (options) {
  if (options.password) return true
  return false
}

module.exports = XToken

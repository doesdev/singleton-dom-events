'use strict'

var evtManager = {}

module.exports = setEvent

function evtOn (el, evt, cb, capture) {
  if (!el || !(el.addEventListener || el.attachEvent)) return cb

  evt = el.addEventListener ? evt : ('on' + evt)
  var callee = (el.addEventListener || el.attachEvent)
  callee.call(el, evt, cb, capture)

  return cb
}

function evtOff (el, evt, cb, capture) {
  if (!el || !(el.removeEventListener || el.detachEvent)) return cb

  evt = el.removeEventListener ? evt : ('on' + evt)
  var callee = (el.removeEventListener || el.detachEvent)
  callee.call(el, evt, cb, capture)

  return cb
}

function removeEvent (identifier) {
  var evt = evtManager[identifier]

  if (!evt) return true

  evtOff(evt.el, evt.evt, evt.cb, evt.capture)
  delete evtManager[identifier]

  return true
}

function setEvent (identifier, el, evt, cb, capture) {
  capture = capture === true
  var crntEvt = { el: el, evt: evt, cb: cb, capture: capture }
  var oldEvt = evtManager[identifier] = evtManager[identifier] || crntEvt

  evtOff(oldEvt.el, oldEvt.evt, oldEvt.cb, capture)

  var newEvt = evtManager[identifier] = crntEvt
  evtOn(newEvt.el, newEvt.evt, newEvt.cb, capture)

  return cb
}

setEvent.remove = removeEvent

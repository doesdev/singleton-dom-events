// Setup
var evtManager = {}

// Exports
module.exports = setEvent

// Main
function evtOn (el, evt, cb, capture) {
  if (!el || !(el.addEventListener || el.attachEvent)) return cb
  evt = el.addEventListener ? evt : ('on' + evt)
  var callee = (el.addEventListener || el.attachEvent)
  callee.call(el, evt, cb, capture)
  return cb
}

function evtOff (el, evt, cb, capture) {
  if (!el || !(el.removeEventListener || el.detachEvent)) return cb
  evt = el.addEventListener ? evt : ('on' + evt)
  var callee = (el.removeEventListener || el.detachEvent)
  callee.call(el, evt, cb, capture)
  return cb
}

function setEvent (identifier, el, evt, cb, capture) {
  capture = capture === true
  var crntEvt = {el: el, evt: evt, cb: cb}
  var event = evtManager[identifier] = evtManager[identifier] || crntEvt
  evtOff(event.el, event.evt, event.cb, capture)
  event = evtManager[identifier] = crntEvt
  evtOn(event.el, event.evt, event.cb, capture)
  return cb
}

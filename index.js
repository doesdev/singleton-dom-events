// Setup
var evtManager = {}

// Exports
module.exports = setEvent

// Main
function evtOn (el, evt, cb, capture) {
  if (!el || !(el.addEventListener || el.attachEvent)) return cb
  evt = el.addEventListener ? evt : 'on' + evt
  let callee = el.addEventListener || el.attachEvent
  callee.call(el, evt, cb, capture)
  return cb
}

function evtOff (el, evt, cb, capture) {
  if (!el || !(el.removeEventListener || el.detachEvent)) return cb
  evt = el.addEventListener ? evt : 'on' + evt
  let callee = el.removeEventListener || el.detachEvent
  callee.call(el, evt, cb, capture)
  return cb
}

function setEvent (identifier, el, evt, cb, capture) {
  let event = evtManager[identifier] = evtManager[identifier] || {el, evt, cb}
  evtOff(event.el, event.evt, event.cb, capture || false)
  event = evtManager[identifier] = {el, evt, cb}
  evtOn(event.el, event.evt, event.cb, capture || false)
  return cb
}

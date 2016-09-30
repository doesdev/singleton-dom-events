# singleton-dom-events   [![npm version](https://badge.fury.io/js/singleton-dom-events.svg)](http://badge.fury.io/js/singleton-dom-events)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

DOM event manager that strictly allows one event per identifier.
It simply stores the elements and callbacks based on the passed identifier
and ensures they are removed before (re-)adding them.

## install
`npm i singleton-dom-events --save`

## api / function signature
- **identifier** *(String [unique identifier for event] - required)*
- **element** *(DOM element - required)*
- **eventName** *(String - required)*
- **callback** *(Function - required)*
- **useCapture** *(Boolean - optional)*

## usage
Example
```javascript
const setEvent = require('singleton-dom-events')

let myCb = => console.log('yay')

setEvent('window-resize', window, 'resize', myCb)

```

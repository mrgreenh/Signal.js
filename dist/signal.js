(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _modulesLowPass = require('./modules/LowPass');

var _modulesLowPass2 = _interopRequireDefault(_modulesLowPass);

var Signal = (function () {
    function Signal(configuration) {
        _classCallCheck(this, Signal);

        //TODO implement configuration parsing
        this._processingChain = new _modulesLowPass2['default'](10);
    }

    _createClass(Signal, [{
        key: 'push',
        value: function push(value) {
            return this._processingChain.queueSample(value);
        }
    }, {
        key: 'output',
        value: function output() {
            return this._processingChain.output();
        }
    }]);

    return Signal;
})();

exports['default'] = Signal;
module.exports = exports['default'];

},{"./modules/LowPass":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignalBuffer = (function () {
    function SignalBuffer(size) {
        _classCallCheck(this, SignalBuffer);

        this._maxSize = size;
        this.length = 0;
    }

    _createClass(SignalBuffer, [{
        key: "push",
        value: function push(item) {
            var record = {
                value: item
            };
            if (!this.hasOwnProperty("_firstItem")) this._firstItem = record;else this._lastItem.next = record;
            this._lastItem = record;

            this.length++;

            if (this._maxSize && this.length > this._maxSize) return this.shift();else return this._firstItem;
        }
    }, {
        key: "shift",
        value: function shift() {
            var shiftedElement;
            if (this.hasOwnProperty("_firstItem")) shiftedElement = this._firstItem;
            this._firstItem = this._firstItem.next;
            this.length--;
            return shiftedElement;
        }
    }, {
        key: "getFirstItem",
        value: function getFirstItem() {
            return this._firstItem;
        }
    }, {
        key: "updateLastValue",
        value: function updateLastValue(newValue) {
            this._lastItem = newValue;
        }
    }, {
        key: "iterate",
        value: regeneratorRuntime.mark(function iterate() {
            var counter, currentItem;
            return regeneratorRuntime.wrap(function iterate$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        counter = 0;
                        currentItem = this._firstItem;

                    case 2:
                        if (!currentItem.hasOwnProperty("next")) {
                            context$2$0.next = 9;
                            break;
                        }

                        context$2$0.next = 5;
                        return currentItem.value;

                    case 5:
                        currentItem = currentItem.next;
                        counter++;
                        context$2$0.next = 2;
                        break;

                    case 9:
                        return context$2$0.abrupt("return");

                    case 10:
                    case "end":
                        return context$2$0.stop();
                }
            }, iterate, this);
        })
    }]);

    return SignalBuffer;
})();

exports["default"] = SignalBuffer;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _SignalBuffer = require("./SignalBuffer");

var _SignalBuffer2 = _interopRequireDefault(_SignalBuffer);

var SignalModule = (function () {
    function SignalModule(bufferSize) {
        _classCallCheck(this, SignalModule);

        this._buffer = new _SignalBuffer2["default"](bufferSize);
    }

    _createClass(SignalModule, [{
        key: "queueSample",
        value: function queueSample(value) {
            if (isNaN(value)) throw "Signals only accept numbers";
            if (this.hasOwnProperty("chainedModule")) {
                var backPropagatedValue = this._chainedModule.queueSample(value);
                this._buffer.push(backPropagatedValue);
            } else {
                this._buffer.push(value);
            }

            return this.output();
        }
    }, {
        key: "output",
        value: function output() {
            return this._processOutput();
        }
    }, {
        key: "_processOutput",
        value: function _processOutput() {
            return this._buffer.getFirstItem() || 0;
        }
    }, {
        key: "chain",
        value: function chain(module) {
            this._chainedModule = module;
            module.addChainPredecessor(this);
            return module;
        }
    }, {
        key: "addChainPredecessor",
        value: function addChainPredecessor(module) {
            this._chainPredecessor = module;
        }
    }]);

    return SignalModule;
})();

exports["default"] = SignalModule;
module.exports = exports["default"];

},{"./SignalBuffer":2}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Signal = require('./Signal');

var _Signal2 = _interopRequireDefault(_Signal);

define(function () {
    return _Signal2['default'];
});

},{"./Signal":1}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _SignalModule2 = require('../SignalModule');

var _SignalModule3 = _interopRequireDefault(_SignalModule2);

var LowPass = (function (_SignalModule) {
    _inherits(LowPass, _SignalModule);

    function LowPass() {
        _classCallCheck(this, LowPass);

        _get(Object.getPrototypeOf(LowPass.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(LowPass, [{
        key: '_processOutput',
        value: function _processOutput() {
            var sum = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._buffer.iterate()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    sum += value;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return sum ? sum / this._buffer.length : 0;
        }
    }]);

    return LowPass;
})(_SignalModule3['default']);

exports['default'] = LowPass;
module.exports = exports['default'];

},{"../SignalModule":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2FybG9hbmRyZWFjb250ZS9EZXZlbG9wbWVudC9zeW5lc3RoZXNpYS9zdGF0aWMvanMvdmVuZG9yL3NpZ25hbGpzL3NyYy9TaWduYWwuanMiLCIvVXNlcnMvY2FybG9hbmRyZWFjb250ZS9EZXZlbG9wbWVudC9zeW5lc3RoZXNpYS9zdGF0aWMvanMvdmVuZG9yL3NpZ25hbGpzL3NyYy9TaWduYWxCdWZmZXIuanMiLCIvVXNlcnMvY2FybG9hbmRyZWFjb250ZS9EZXZlbG9wbWVudC9zeW5lc3RoZXNpYS9zdGF0aWMvanMvdmVuZG9yL3NpZ25hbGpzL3NyYy9TaWduYWxNb2R1bGUuanMiLCIvVXNlcnMvY2FybG9hbmRyZWFjb250ZS9EZXZlbG9wbWVudC9zeW5lc3RoZXNpYS9zdGF0aWMvanMvdmVuZG9yL3NpZ25hbGpzL3NyYy9tYWluLmpzIiwiL1VzZXJzL2NhcmxvYW5kcmVhY29udGUvRGV2ZWxvcG1lbnQvc3luZXN0aGVzaWEvc3RhdGljL2pzL3ZlbmRvci9zaWduYWxqcy9zcmMvbW9kdWxlcy9Mb3dQYXNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OzhCQ0FvQixtQkFBbUI7Ozs7SUFFakMsTUFBTTtBQUNHLGFBRFQsTUFBTSxDQUNJLGFBQWEsRUFBQzs4QkFEeEIsTUFBTTs7O0FBR0osWUFBSSxDQUFDLGdCQUFnQixHQUFHLGdDQUFZLEVBQUUsQ0FBQyxDQUFDO0tBQzNDOztpQkFKQyxNQUFNOztlQU1KLGNBQUMsS0FBSyxFQUFDO0FBQ1AsbUJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuRDs7O2VBRUssa0JBQUU7QUFDSixtQkFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDekM7OztXQVpDLE1BQU07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LENBQUMsQ0FBQztTQUMzQzs7O2VBRUksZUFBQyxNQUFNLEVBQUM7QUFDVCxnQkFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7QUFDN0Isa0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxtQkFBTyxNQUFNLENBQUM7U0FDakI7OztlQUVrQiw2QkFBQyxNQUFNLEVBQUM7QUFDdkIsZ0JBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7U0FDbkM7OztXQWpDQyxZQUFZOzs7cUJBb0NILFlBQVk7Ozs7Ozs7O3NCQ3RDUixVQUFVOzs7O0FBRTdCLE1BQU0sQ0FBQyxZQUFVO0FBQ2IsK0JBQWM7Q0FDakIsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQ0pzQixpQkFBaUI7Ozs7SUFFcEMsT0FBTztjQUFQLE9BQU87O2FBQVAsT0FBTzs4QkFBUCxPQUFPOzttQ0FBUCxPQUFPOzs7aUJBQVAsT0FBTzs7ZUFDSywwQkFBRTtBQUNaLGdCQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7Ozs7OztBQUNaLHFDQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSw4SEFBQzt3QkFBaEMsS0FBSzs7QUFDVCx1QkFBRyxJQUFJLEtBQUssQ0FBQztpQkFDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxtQkFBTyxHQUFHLEdBQUcsR0FBRyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUM1Qzs7O1dBUEMsT0FBTzs7O3FCQVVFLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IExvd1Bhc3MgZnJvbSAnLi9tb2R1bGVzL0xvd1Bhc3MnXG5cbmNsYXNzIFNpZ25hbCB7XG4gICAgY29uc3RydWN0b3IoY29uZmlndXJhdGlvbil7XG4gICAgICAgIC8vVE9ETyBpbXBsZW1lbnQgY29uZmlndXJhdGlvbiBwYXJzaW5nXG4gICAgICAgIHRoaXMuX3Byb2Nlc3NpbmdDaGFpbiA9IG5ldyBMb3dQYXNzKDEwKTtcbiAgICB9XG5cbiAgICBwdXNoKHZhbHVlKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NpbmdDaGFpbi5xdWV1ZVNhbXBsZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgb3V0cHV0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzaW5nQ2hhaW4ub3V0cHV0KCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbDsiLCJjbGFzcyBTaWduYWxCdWZmZXIge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpe1xuICAgICAgICB0aGlzLl9tYXhTaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIHB1c2goaXRlbSl7XG4gICAgICAgIHZhciByZWNvcmQgPSB7XG4gICAgICAgICAgICB2YWx1ZTogaXRlbVxuICAgICAgICB9O1xuICAgICAgICBpZighdGhpcy5oYXNPd25Qcm9wZXJ0eShcIl9maXJzdEl0ZW1cIikpXG4gICAgICAgICAgICB0aGlzLl9maXJzdEl0ZW0gPSByZWNvcmQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX2xhc3RJdGVtLm5leHQgPSByZWNvcmQ7XG4gICAgICAgIHRoaXMuX2xhc3RJdGVtID0gcmVjb3JkO1xuXG4gICAgICAgIHRoaXMubGVuZ3RoICsrO1xuXG4gICAgICAgIGlmKHRoaXMuX21heFNpemUgJiYgdGhpcy5sZW5ndGggPiB0aGlzLl9tYXhTaXplKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hpZnQoKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5fZmlyc3RJdGVtO1xuICAgIH1cblxuICAgIHNoaWZ0KCl7XG4gICAgICAgIHZhciBzaGlmdGVkRWxlbWVudDtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShcIl9maXJzdEl0ZW1cIikpXG4gICAgICAgICAgICBzaGlmdGVkRWxlbWVudCA9IHRoaXMuX2ZpcnN0SXRlbTtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0SXRlbSA9IHRoaXMuX2ZpcnN0SXRlbS5uZXh0O1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggLS07XG4gICAgICAgIHJldHVybiBzaGlmdGVkRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXRGaXJzdEl0ZW0oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0SXRlbTtcbiAgICB9XG5cbiAgICB1cGRhdGVMYXN0VmFsdWUobmV3VmFsdWUpe1xuICAgICAgICB0aGlzLl9sYXN0SXRlbSA9IG5ld1ZhbHVlO1xuICAgIH1cblxuICAgICppdGVyYXRlKCl7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5fZmlyc3RJdGVtO1xuICAgICAgICB3aGlsZShjdXJyZW50SXRlbS5oYXNPd25Qcm9wZXJ0eShcIm5leHRcIikpe1xuICAgICAgICAgICAgeWllbGQgY3VycmVudEl0ZW0udmFsdWU7XG4gICAgICAgICAgICBjdXJyZW50SXRlbSA9IGN1cnJlbnRJdGVtLm5leHQ7XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfSAgIFxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbEJ1ZmZlcjsiLCJpbXBvcnQgU2lnbmFsQnVmZmVyIGZyb20gJy4vU2lnbmFsQnVmZmVyJ1xuXG5jbGFzcyBTaWduYWxNb2R1bGUge1xuICAgIGNvbnN0cnVjdG9yKGJ1ZmZlclNpemUpe1xuICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgU2lnbmFsQnVmZmVyKGJ1ZmZlclNpemUpO1xuICAgIH1cblxuICAgIHF1ZXVlU2FtcGxlKHZhbHVlKXtcbiAgICAgICAgaWYoaXNOYU4odmFsdWUpKSB0aHJvdyBcIlNpZ25hbHMgb25seSBhY2NlcHQgbnVtYmVyc1wiO1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KFwiY2hhaW5lZE1vZHVsZVwiKSl7XG4gICAgICAgICAgICBsZXQgYmFja1Byb3BhZ2F0ZWRWYWx1ZSA9IHRoaXMuX2NoYWluZWRNb2R1bGUucXVldWVTYW1wbGUodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2goYmFja1Byb3BhZ2F0ZWRWYWx1ZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0KCk7XG4gICAgfVxuXG4gICAgb3V0cHV0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzT3V0cHV0KCk7XG4gICAgfVxuXG4gICAgX3Byb2Nlc3NPdXRwdXQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlci5nZXRGaXJzdEl0ZW0oKSB8fCAwO1xuICAgIH1cblxuICAgIGNoYWluKG1vZHVsZSl7XG4gICAgICAgIHRoaXMuX2NoYWluZWRNb2R1bGUgPSBtb2R1bGU7XG4gICAgICAgIG1vZHVsZS5hZGRDaGFpblByZWRlY2Vzc29yKHRoaXMpO1xuICAgICAgICByZXR1cm4gbW9kdWxlO1xuICAgIH1cblxuICAgIGFkZENoYWluUHJlZGVjZXNzb3IobW9kdWxlKXtcbiAgICAgICAgdGhpcy5fY2hhaW5QcmVkZWNlc3NvciA9IG1vZHVsZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbE1vZHVsZTsiLCJpbXBvcnQgU2lnbmFsIGZyb20gJy4vU2lnbmFsJ1xuXG5kZWZpbmUoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gU2lnbmFsO1xufSk7IiwiaW1wb3J0IFNpZ25hbE1vZHVsZSBmcm9tICcuLi9TaWduYWxNb2R1bGUnXG5cbmNsYXNzIExvd1Bhc3MgZXh0ZW5kcyBTaWduYWxNb2R1bGUge1xuICAgIF9wcm9jZXNzT3V0cHV0KCl7XG4gICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICBmb3IodmFyIHZhbHVlIG9mIHRoaXMuX2J1ZmZlci5pdGVyYXRlKCkpe1xuICAgICAgICAgICAgc3VtICs9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW0gPyBzdW0vdGhpcy5fYnVmZmVyLmxlbmd0aCA6IDA7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb3dQYXNzOyJdfQ==

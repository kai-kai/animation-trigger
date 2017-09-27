(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
  function Animation(args) {
    _classCallCheck(this, Animation);

    this.loadArr = typeof args.load !== 'undefined' ? args.load : '';
    this.scrollArr = typeof args.scroll !== 'undefined' ? args.scroll : '';
    this.init();
  }

  _createClass(Animation, [{
    key: 'init',
    value: function init() {
      this.setEvent();
    }
  }, {
    key: 'setEvent',
    value: function setEvent() {
      var _this = this;

      if (this.loadArr.length > 0) {
        _this.main(_this.loadArr, 'load');
      }
      if (this.scrollArr.length > 0) {
        _this.main(_this.scrollArr, 'scroll');
        window.addEventListener('scroll', function (e) {
          _this.main(_this.scrollArr, e.type);
        });
      }
    }
  }, {
    key: 'isReached',
    value: function isReached(a, b) {
      return a < b;
    }
  }, {
    key: 'main',
    value: function main(array, type) {
      var _this = this;

      array.forEach(function (obj) {
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.animFlag === 'undefined') {
          if (type === 'scroll') {
            var _winHeight = window.innerHeight;
            var _scrollVal = _winHeight - _winHeight / 5;
            if (!_this.isReached(obj.elm.getBoundingClientRect().top, _scrollVal)) return;
          }
          obj.elm.classList.add(obj.cName);
          obj.animFlag = true;
        }
      });
    }
  }]);

  return Animation;
}();

;

module.exports = Animation;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var animation = require('./mod/Animation');

var SampleClass = function () {
  function SampleClass(args) {
    _classCallCheck(this, SampleClass);

    this.args = typeof args !== 'undefined' ? args : {};
    this.animation = typeof this.args.animation !== 'undefined' ? this.args.animation : '';
    this.init();
  }

  _createClass(SampleClass, [{
    key: 'init',
    value: function init() {
      if (this.animation !== '') {
        new animation(this.animation);
      }
    }
  }]);

  return SampleClass;
}();

;

window.SampleClass = SampleClass;

},{"./mod/Animation":1}]},{},[2]);

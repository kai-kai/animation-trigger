'use strict';

const animation = require('./mod/Animation');

/**
 * @requires Animation
 */
class SampleClass {
  /**
   * コンストラクタ
   * @param {Object} args objectの引数です
   * @param {Element} args.element HTMLの要素を指定します
   */
  constructor(args) {
    this.args = (typeof args !== 'undefined') ? args : {};
    this.animation = (typeof this.args.animation !== 'undefined') ? this.args.animation : '';
    this.init();
  }

  /**
   * requireしたモジュールをインスタンス化
   */
  init() {
    if(this.animation !== '') {
      new animation(this.animation);
    }
  }
};

window.SampleClass = SampleClass;
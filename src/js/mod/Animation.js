'use strict';

const arrayFrom = require('array-from');

/**
 * アニメーション用のクラスを付与するクラスです。
 */
class Animation {
  /**
   * コンストラクタ
   * @param {Object} args オブジェクト
   * @param {Array} args.load ロード時に発火するアニメーションを定義するオブジェクトの配列
   * @param {Element} args.load.elm HTMLの要素を指定する
   * @param {String} args.load.cName クラス名を文字列で指定する
   * @param {Array} args.scroll スクロール時に発火するアニメーションを定義するオブジェクトの配列
   * @param {Element} args.scroll.elm HTMLの要素を指定する
   * @param {String} args.scroll.cName クラス名を文字列で指定する
   * @example
   * {
   *   load: [
   *     {
   *       elm: document.querySelector('.mv'),
   *       cName: 'animate'
   *     }
   *   ],
   *   scroll: [
   *     {
   *       elm: document.querySelector('.mv'),
   *       cName: 'animate'
   *     }
   *   ]
   * }
   */
  constructor(args) {
    this.loadArr = (typeof args.load !== 'undefined') ? args.load : '';
    this.scrollArr = (typeof args.scroll !== 'undefined') ? args.scroll : '';
    this.init();
  }

  /**
   * 初期化処理を行います
   */
  init() {
    this.setEvent();
  }

  /**
   * イベント登録を行います
   */
  setEvent() {
    var _this = this;

    if(this.loadArr.length > 0) {
      _this.main(_this.loadArr, 'load');
    }
    if(this.scrollArr.length > 0) {
      _this.main(_this.scrollArr, 'scroll');
      window.addEventListener('scroll', function(e) {
        _this.main(_this.scrollArr, e.type);
      });
    }
  }

  /**
   * 要素の位置とスクロール位置の比較を行いboolean値を返します
   * @param {Number} a 比較元の数値
   * @param {Number} b 比較先の数値
   * @returns {Boolean} 比較条件に合致すればtrue、異なればfalse
   */
  isReached(a, b) {
    return (a < b);
  }

  /**
   * 条件にあった要素にクラスを追加します
   * @param {Array} array コンストラクタで定義したオブジェクトの配列
   * @param {String} type イベントタイプを文字列で指定します（'load' or 'scroll'）
   */
  main(array, type) {
    const _this = this;

    array.forEach(function(obj) {
      if (typeof obj === 'object') {
        let elmArr = (obj.elm.nodeType === 1) ? [obj.elm] : arrayFrom(obj.elm, e => {
          return e;
        });

        for (let i = 0; i < elmArr.length; i++) {
          if (elmArr[i].classList.contains(obj.cName)) continue;

          if (type === 'scroll') {
            const _winHeight = window.innerHeight;
            const _scrollVal = _winHeight - _winHeight / 3;
            if (!_this.isReached(elmArr[i].getBoundingClientRect().top, _scrollVal)) return;
          }

          elmArr[i].classList.add(obj.cName);
        }
      }
    });
  }
};

module.exports = Animation;
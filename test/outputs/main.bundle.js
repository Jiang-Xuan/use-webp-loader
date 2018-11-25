(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../node_modules/is-support-webp/is-support-webp.js":
/*!*************************************************************************************************!*\
  !*** /Users/jiangxuan/loveTech/use-webp-loader/node_modules/is-support-webp/is-support-webp.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isSupportWebp() {
  if (isSupportWebp.result !== undefined) {
    return isSupportWebp.result
  }

  var elem = document.createElement('canvas')
  if (
    !!(elem.getContext && elem.getContext('2d'))
  ) {
     isSupportWebp.result = elem.toDataURL('image/webp').indexOf('data:image/webp') == 0

     return isSupportWebp.result
  }

  return false
}


/***/ }),

/***/ "./fixture.js":
/*!********************!*\
  !*** ./fixture.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hw_os_app_webp_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hw-os-app@webp.png */ "./hw-os-app@webp.png");
/* harmony import */ var _hw_os_app_webp_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hw_os_app_webp_png__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = (_hw_os_app_webp_png__WEBPACK_IMPORTED_MODULE_0___default.a);


/***/ }),

/***/ "./hw-os-app@webp.png":
/*!****************************!*\
  !*** ./hw-os-app@webp.png ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


        var isSupportWebp = __webpack_require__(/*! is-support-webp */ "../../node_modules/is-support-webp/is-support-webp.js")
        if (isSupportWebp()) {
          module.exports = __webpack_require__.p + "4b5a9c4a10556d8f205e9f412d1662e6.webp"
        } else {
          module.exports = __webpack_require__.p + "2af38ddf296b92cd6bbbf97322774c33.png"
        }
        

/***/ })

},[["./fixture.js","runtime~main"]]]);
//# sourceMappingURL=main.bundle.js.map
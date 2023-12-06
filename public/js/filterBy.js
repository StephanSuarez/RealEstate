/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/filterBy.js":
/*!****************************!*\
  !*** ./src/js/filterBy.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nlet categoryId = document.querySelector('#categoryFilterByMagnifier'),\r\n    searchTerm = document.querySelector('#userSearch');\r\n\r\ndocument.getElementById('submitButton').addEventListener('click', function() {\r\n    categoryId = categoryId.value;\r\n    searchTerm = searchTerm.value;\r\n    \r\n    const protocol = window.location.protocol;\r\n    const host = window.location.host;\r\n\r\n    let redirectURL = `${protocol}//${host}`;\r\n    let endUrl = ''\r\n    if(searchTerm == '' && categoryId != ''){\r\n        endUrl = `category/${categoryId}`\r\n    } else {\r\n        endUrl = `searchEngine?categoryId=${categoryId}&searchTerm=${searchTerm}`\r\n    }\r\n\r\n    redirectURL = `${redirectURL}/${endUrl}`;\r\n    \r\n    window.location.href = redirectURL;\r\n});\n\n//# sourceURL=webpack://real-estate/./src/js/filterBy.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/filterBy.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
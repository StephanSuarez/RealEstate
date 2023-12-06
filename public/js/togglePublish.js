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

/***/ "./src/js/togglePublish.js":
/*!*********************************!*\
  !*** ./src/js/togglePublish.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(async  function(){\r\n    const propertiesIds = document.querySelectorAll('.property-id');\r\n    propertiesIds.forEach(property => {\r\n        property.addEventListener('click', (e)=>{\r\n            updatePropertyPublicated(e)\r\n        });\r\n    });\r\n\r\n    async function updatePropertyPublicated(e){\r\n        const { propertyId } = e.target.dataset;\r\n\r\n        const url = `/property/update-publicated/${propertyId}`;\r\n        const response = await  fetch(url, {\r\n            method: 'PUT'\r\n        });\r\n        const res = await response.json();\r\n        \r\n        if (res.res === 'ok') {\r\n            \r\n            // Toggle the background color and text color based on the current status\r\n            const propertyElement = document.querySelector(`.property-id[data-property-id=\"${propertyId}\"]`);\r\n            const statusElement = document.querySelector(`.property-status[data-property-status=\"${propertyId}\"]`);\r\n            const statusElementBall = document.querySelector(`.property-status-ball[data-property-status-ball=\"${propertyId}\"]`);\r\n            \r\n            if (propertyElement) {\r\n                // Toggle styles based on the current property status\r\n                if (res.newStatus === 1) {\r\n                    propertyElement.textContent = 'Publish'\r\n                    statusElement.classList.remove('text-red-500');\r\n                    statusElement.classList.add('text-green-500');\r\n                    statusElement.textContent = 'Published'\r\n                    statusElementBall.classList.remove('bg-red-500');\r\n                    statusElementBall.classList.add('bg-green-500');\r\n                } else {\r\n                    propertyElement.textContent = 'Unpublis'\r\n                    statusElement.classList.remove('text-green-500');\r\n                    statusElement.classList.add('text-red-500');\r\n                    statusElement.textContent = 'Unpublished'\r\n                    statusElementBall.classList.remove('bg-green-500');\r\n                    statusElementBall.classList.add('bg-red-500');\r\n                }\r\n            }\r\n        }\r\n    }\r\n})();\r\n\n\n//# sourceURL=webpack://real-estate/./src/js/togglePublish.js?");

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
/******/ 	__webpack_modules__["./src/js/togglePublish.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
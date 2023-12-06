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

/***/ "./src/js/mapHome.js":
/*!***************************!*\
  !*** ./src/js/mapHome.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    const lat = 4.712485;\r\n    const lng = -74.071568;\r\n    const map = L.map('map').setView([lat, lng], 12);\r\n    const filters = {\r\n        category: '',\r\n        price: ''\r\n    }\r\n\r\n    let properties = [];\r\n\r\n    let markers = new L.FeatureGroup().addTo(map);\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);  \r\n\r\n    try {\r\n        const getPropertiesFromApi = async ()=>{\r\n            const url = '/api/properties';\r\n            const res = await fetch(url);\r\n            properties = await res.json();\r\n            \r\n            addPropertiesToMap(properties);\r\n        } \r\n        \r\n        getPropertiesFromApi();\r\n\r\n        const addPropertiesToMap = (properties)=>{\r\n            markers.clearLayers()   \r\n            properties.forEach(property => {\r\n                const marker = new L.marker([property?.latitude, property?.longitude], {\r\n                    autoPan: true,\r\n                }).addTo(map).bindPopup(`\r\n                <div class=\"\">\r\n                    <div class=\"text-lg\">\r\n                        <h3>${property.title}</h3>\r\n                        <a href=\"/property/information/${property.id}\">\r\n                            <img src=\"/uploads/${property.image}\" alt=\"${property.title}\" class=\"img-thumbnail\">\r\n                        </a>\r\n                        \r\n                    </div>\r\n                    <div class=\"text-center\" style=\"height: 100%;\">\r\n                    <p>Category: ${property.category.category}</p>\r\n                    <p>Price: ${property.price.price}</p>\r\n                        <div class=\"bg-gray-100 shadow-md p-4 rounded\">\r\n                            <p>${property.description}</p>\r\n                            <a style=\"color: #ffffff; transition: color 0.3s ease-in-out;\" href=\"/property/information/${property.id}\" class=\"text-lg font-semibold transition duration-300 ease-in-out transform hover:translate-y-0.5 hover:bg-black bg-green-500 px-4 py-2 rounded-lg shadow-lg\">Ver Propiedad</a>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                `);\r\n                markers.addLayer(marker);\r\n            });\r\n        }\r\n\r\n        document.querySelector('#categoryFilter').addEventListener('change', e=>{\r\n            filters.category = e.target.value;\r\n            filterProperties()\r\n        });\r\n    \r\n        document.querySelector('#priceFilter').addEventListener('change', e=>{\r\n            filters.price = e.target.value;\r\n            filterProperties()\r\n\r\n        });\r\n\r\n       \r\n        const filterProperties = ()=> {\r\n            const propertiesFilter = properties.filter( filterByCategories ).filter( filterByPrices );\r\n            addPropertiesToMap(propertiesFilter);\r\n            \r\n        };\r\n\r\n        const filterByCategories = property=> filters.category ? property.categoryId == filters.category : property ;\r\n\r\n        const filterByPrices = property => filters.price ? property.priceId == filters.price : property ;\r\n\r\n    } catch (error) {\r\n        console.log(error)\r\n    }\r\n\r\n})()\n\n//# sourceURL=webpack://real-estate/./src/js/mapHome.js?");

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
/******/ 	__webpack_modules__["./src/js/mapHome.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
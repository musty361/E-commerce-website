"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/checkout";
exports.ids = ["pages/api/checkout"];
exports.modules = {

/***/ "stripe":
/*!*************************!*\
  !*** external "stripe" ***!
  \*************************/
/***/ ((module) => {

module.exports = import("stripe");;

/***/ }),

/***/ "(api)/./pages/api/checkout.ts":
/*!*******************************!*\
  !*** ./pages/api/checkout.ts ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stripe */ \"stripe\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([stripe__WEBPACK_IMPORTED_MODULE_0__]);\nstripe__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_0__[\"default\"](process.env.STRIPE_SECRET_KEY, {\n    apiVersion: \"2022-11-15\"\n});\nasync function handler(req, res) {\n    if (req.method !== \"POST\") return res.status(405).end();\n    try {\n        const { cart } = req.body;\n        const total = cart.reduce((sum, item)=>sum + item.price, 0);\n        const paymentIntent = await stripe.paymentIntents.create({\n            amount: total * 100,\n            currency: \"usd\",\n            metadata: {\n                cart: JSON.stringify(cart)\n            }\n        });\n        res.status(200).json({\n            clientSecret: paymentIntent.client_secret\n        });\n    } catch (err) {\n        res.status(500).json({\n            error: err instanceof Error ? err.message : \"Unknown error\"\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2hlY2tvdXQudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDNEI7QUFPNUIsTUFBTUMsU0FBUyxJQUFJRCw4Q0FBTUEsQ0FBQ0UsUUFBUUMsR0FBRyxDQUFDQyxpQkFBaUIsRUFBRztJQUN4REMsWUFBWTtBQUNkO0FBRWUsZUFBZUMsUUFBUUMsR0FBbUIsRUFBRUMsR0FBb0I7SUFDN0UsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLFFBQVEsT0FBT0QsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLEdBQUc7SUFFckQsSUFBSTtRQUNGLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUdMLElBQUlNLElBQUk7UUFDekIsTUFBTUMsUUFBUUYsS0FBS0csTUFBTSxDQUFDLENBQUNDLEtBQWFDLE9BQW1CRCxNQUFNQyxLQUFLQyxLQUFLLEVBQUU7UUFFN0UsTUFBTUMsZ0JBQWdCLE1BQU1sQixPQUFPbUIsY0FBYyxDQUFDQyxNQUFNLENBQUM7WUFDdkRDLFFBQVFSLFFBQVE7WUFDaEJTLFVBQVU7WUFDVkMsVUFBVTtnQkFBRVosTUFBTWEsS0FBS0MsU0FBUyxDQUFDZDtZQUFNO1FBQ3pDO1FBRUFKLElBQUlFLE1BQU0sQ0FBQyxLQUFLaUIsSUFBSSxDQUFDO1lBQUVDLGNBQWNULGNBQWNVLGFBQWE7UUFBQztJQUNuRSxFQUFFLE9BQU9DLEtBQWM7UUFDckJ0QixJQUFJRSxNQUFNLENBQUMsS0FBS2lCLElBQUksQ0FBQztZQUFFSSxPQUFPRCxlQUFlRSxRQUFRRixJQUFJRyxPQUFPLEdBQUc7UUFBZ0I7SUFDckY7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vcGFnZXMvYXBpL2NoZWNrb3V0LnRzPzMxNzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgU3RyaXBlIGZyb20gXCJzdHJpcGVcIjtcblxuaW50ZXJmYWNlIENhcnRJdGVtIHtcbiAgbmFtZTogc3RyaW5nO1xuICBwcmljZTogbnVtYmVyO1xufVxuXG5jb25zdCBzdHJpcGUgPSBuZXcgU3RyaXBlKHByb2Nlc3MuZW52LlNUUklQRV9TRUNSRVRfS0VZISwge1xuICBhcGlWZXJzaW9uOiBcIjIwMjItMTEtMTVcIixcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSB7XG4gIGlmIChyZXEubWV0aG9kICE9PSBcIlBPU1RcIikgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5lbmQoKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHsgY2FydCB9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgdG90YWwgPSBjYXJ0LnJlZHVjZSgoc3VtOiBudW1iZXIsIGl0ZW06IENhcnRJdGVtKSA9PiBzdW0gKyBpdGVtLnByaWNlLCAwKTtcblxuICAgIGNvbnN0IHBheW1lbnRJbnRlbnQgPSBhd2FpdCBzdHJpcGUucGF5bWVudEludGVudHMuY3JlYXRlKHtcbiAgICAgIGFtb3VudDogdG90YWwgKiAxMDAsXG4gICAgICBjdXJyZW5jeTogXCJ1c2RcIixcbiAgICAgIG1ldGFkYXRhOiB7IGNhcnQ6IEpTT04uc3RyaW5naWZ5KGNhcnQpIH0sXG4gICAgfSk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGNsaWVudFNlY3JldDogcGF5bWVudEludGVudC5jbGllbnRfc2VjcmV0IH0pO1xuICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ1Vua25vd24gZXJyb3InIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiU3RyaXBlIiwic3RyaXBlIiwicHJvY2VzcyIsImVudiIsIlNUUklQRV9TRUNSRVRfS0VZIiwiYXBpVmVyc2lvbiIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJzdGF0dXMiLCJlbmQiLCJjYXJ0IiwiYm9keSIsInRvdGFsIiwicmVkdWNlIiwic3VtIiwiaXRlbSIsInByaWNlIiwicGF5bWVudEludGVudCIsInBheW1lbnRJbnRlbnRzIiwiY3JlYXRlIiwiYW1vdW50IiwiY3VycmVuY3kiLCJtZXRhZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJqc29uIiwiY2xpZW50U2VjcmV0IiwiY2xpZW50X3NlY3JldCIsImVyciIsImVycm9yIiwiRXJyb3IiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/checkout.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/checkout.ts"));
module.exports = __webpack_exports__;

})();
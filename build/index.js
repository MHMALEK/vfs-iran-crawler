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

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"socketServer\": () => (/* binding */ socketServer)\n/* harmony export */ });\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _controllers_checkAppointment_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/checkAppointment.controller */ \"./src/controllers/checkAppointment.controller.js\");\n/* harmony import */ var _services_appointment_checker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/appointment-checker */ \"./src/services/appointment-checker/index.js\");\n/* harmony import */ var _services_scheduldedFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/scheduldedFunctions */ \"./src/services/scheduldedFunctions.js\");\n/* harmony import */ var _services_rollbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/rollbar */ \"./src/services/rollbar/index.js\");\n/* harmony import */ var _controllers_main_controller__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controllers/main.controller */ \"./src/controllers/main.controller.js\");\n\nconst http = __webpack_require__(/*! http */ \"http\");\ndotenv__WEBPACK_IMPORTED_MODULE_0__.config();\nconst compression = __webpack_require__(/*! compression */ \"compression\");\n\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\n\n\n\n\nconst PORT = process.env.PORT || 3000;\n\nconst rollbar = (0,_services_rollbar__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\n\nconst middleWares = [express__WEBPACK_IMPORTED_MODULE_1__.json, (helmet__WEBPACK_IMPORTED_MODULE_2___default()), compression, rollbar.errorHandler, cors];\nconst initMiddleWares = (app) =>\n  middleWares.map((middleWare) => app.use(middleWare()));\n\nconst startApp = () => {\n  const app = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\n  initMiddleWares(app);\n\n  // rollbar logger for errors\n\n  // routes\n  app.get(\"/\", _controllers_main_controller__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\n  app.get(\"/check-appointment\", _controllers_checkAppointment_controller__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n\n  app.listen(PORT, () => console.log(`App listening at port ${PORT}`));\n  return app;\n};\n\nconst checkAppointmentEveryDayJob = (0,_services_scheduldedFunctions__WEBPACK_IMPORTED_MODULE_5__[\"default\"])({\n  expression: _services_scheduldedFunctions__WEBPACK_IMPORTED_MODULE_5__.cronJobDefaultConfig.expression,\n  callBack: _services_appointment_checker__WEBPACK_IMPORTED_MODULE_4__.checkAppointmentServiceResult,\n});\n\nconst app = startApp();\n\nconst createSocketIOServer = () => {\n  const server = http.createServer(app);\n  const { Server } = __webpack_require__(/*! socket.io */ \"socket.io\");\n  const io = new Server(server);\n  return io;\n};\n\nconst socketServer = createSocketIOServer();\n\nsocketServer.on(\"connection\", (socket) => {\n  console.log(\"a user connected\");\n  socket.on(\"disconnect\", () => {\n    console.log(\"user disconnected\");\n  });\n});\n\n\n\n\n//# sourceURL=webpack://vfs-checker/./src/app.js?");

/***/ }),

/***/ "./src/controllers/checkAppointment.controller.js":
/*!********************************************************!*\
  !*** ./src/controllers/checkAppointment.controller.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _services_appointment_checker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/appointment-checker */ \"./src/services/appointment-checker/index.js\");\n\n\nconst checkAppointmentsController = async (req, res, next) => {\n  try {\n    const result = await (0,_services_appointment_checker__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    // sendMessageToAllUsers(result)\n    res.send(result);\n  } catch (e) {\n    next(e);\n    throw new Error(e);\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkAppointmentsController);\n\n\n//# sourceURL=webpack://vfs-checker/./src/controllers/checkAppointment.controller.js?");

/***/ }),

/***/ "./src/controllers/main.controller.js":
/*!********************************************!*\
  !*** ./src/controllers/main.controller.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _services_appointment_checker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/appointment-checker */ \"./src/services/appointment-checker/index.js\");\n\n\nconst mainController = async (req, res, next) => {\n  try {\n    res.send(\n      \"this app is a simple robot to help you find and make appointment in VFS global in Iran!!!\"\n    );\n  } catch (e) {\n    next(e);\n    throw new Error(e);\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainController);\n\n\n//# sourceURL=webpack://vfs-checker/./src/controllers/main.controller.js?");

/***/ }),

/***/ "./src/services/appointment-checker/index.js":
/*!***************************************************!*\
  !*** ./src/services/appointment-checker/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkAppointmentServiceResult\": () => (/* binding */ checkAppointmentServiceResult),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _browser_browser_DOM_interactions_goToLoginPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/goToLoginPage */ \"./src/services/browser/browser-DOM/interactions/goToLoginPage.js\");\n/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../browser */ \"./src/services/browser/index.js\");\n/* harmony import */ var _browser_browser_DOM_errors_errorScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../browser/browser-DOM/errors/errorScreen */ \"./src/services/browser/browser-DOM/errors/errorScreen.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_fillLoginForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/fillLoginForm */ \"./src/services/browser/browser-DOM/interactions/fillLoginForm.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_selectFamilyVisitInSelectBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/selectFamilyVisitInSelectBox */ \"./src/services/browser/browser-DOM/interactions/selectFamilyVisitInSelectBox.js\");\n/* harmony import */ var _browser_browser_request_interceptor_appointmentRequestInterceptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../browser/browser-request-interceptor/appointmentRequestInterceptor */ \"./src/services/browser/browser-request-interceptor/appointmentRequestInterceptor.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_selectLocation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/selectLocation */ \"./src/services/browser/browser-DOM/interactions/selectLocation.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_resolveCaptcha__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/resolveCaptcha */ \"./src/services/browser/browser-DOM/interactions/resolveCaptcha.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_logout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/logout */ \"./src/services/browser/browser-DOM/interactions/logout.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_selectVisaCategory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/selectVisaCategory */ \"./src/services/browser/browser-DOM/interactions/selectVisaCategory.js\");\n\n\n\n\n\n\n\n\n\n\n\nconst handleErrorPage = async (page) => {\n  // if login was not sucessfull\n  const isErrorElementVisible = await page.$(\n    \"#ApplicantListForm > div.validation-summary-errors > ul > li\"\n  );\n  if (isErrorElementVisible) {\n    const errorText = await isErrorElementVisible.evaluate(\n      (el) => el.textContent\n    ); // grab the textContent from the element, by evaluating this function in the browser context\n    // res.send(errorText)\n    steps.LOGIN_ACTION.succesfull = false;\n    throw new Error(errorText);\n  }\n};\n\nconst getAppointmentData = async (page) => {\n  return await page\n    .waitForXPath(\n      \"/html/body/div[2]/div[1]/div[3]/div[3]/form/div[1]/div[2]/div[7]/div[6]/div/table/thead/tr[2]/td[1]/label[2]\",\n      {\n        timeout: 10000,\n      }\n    )\n    .then(async (res) => {\n      console.log('asdsadsad', res)\n      if (res !== null) {\n        const appointmetntTimeText = await res.evaluate(\n          (el) => el.innerHTML\n        );\n        console.log(\"appointmetntTimeText\", appointmetntTimeText);\n        return appointmetntTimeText;\n      }\n    })\n    .catch((e) => new Error());\n};\n\nconst steps = {\n  GO_TO_LOGIN_PAGE: {\n    id: 0,\n    label: \"Go to login page\",\n    succesfull: false,\n  },\n  GET_CAPTCHA: {\n    id: 1,\n    label: \"Get Captcha Image\",\n    succesfull: false,\n  },\n  RESOLVE_CAPTCHA: {\n    id: 2,\n    label: \"Resolve Captch Image by Third Party App\",\n    succesfull: false,\n  },\n  ENTER_LOGIN_DETAILS: {\n    id: 3,\n    label: \"Enter Login details\",\n    succesfull: false,\n  },\n  LOGIN_ACTION: {\n    id: 4,\n    label: \"Login to VFS successfully\",\n    succesfull: false,\n  },\n  SELECT_LOCATION: {\n    id: 5,\n    label: \"Select location\",\n    succesfull: false,\n  },\n};\n\nconst AppointmentCheckerService = async () => {\n  const browser = await _browser__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create();\n  const page = await browser.newPage();\n\n  try {\n    // go to login page\n    await (0,_browser_browser_DOM_interactions_goToLoginPage__WEBPACK_IMPORTED_MODULE_0__.goToLoginPage)(page);\n\n    // show error if it couldn't show the login page\n    const hasErrorOnStart = await (0,_browser_browser_DOM_errors_errorScreen__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(page);\n    if (hasErrorOnStart) {\n      const errorText = (0,_browser_browser_DOM_errors_errorScreen__WEBPACK_IMPORTED_MODULE_2__.getErrorText)();\n      steps.GO_TO_LOGIN_PAGE.succesfull = false;\n      throw new Error(errorText);\n    }\n\n    steps.GO_TO_LOGIN_PAGE.succesfull = true;\n\n    // login flow\n    console.log(\"44444\");\n    const captcha = await (0,_browser_browser_DOM_interactions_resolveCaptcha__WEBPACK_IMPORTED_MODULE_7__.resolveCaptcha)(page);\n\n    steps.GET_CAPTCHA.succesfull = true;\n\n    await (0,_browser_browser_DOM_interactions_fillLoginForm__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(page, captcha);\n\n    // submit form and wait until login finish\n    await Promise.all([\n      page.click(\"#btnSubmit\"),\n      page.waitForNavigation({ waitUntil: \"networkidle2\" }),\n    ]);\n\n    steps.RESOLVE_CAPTCHA.succesfull = true;\n\n    handleErrorPage();\n\n    steps.LOGIN_ACTION.succesfull = true;\n\n    await (0,_browser_browser_DOM_interactions_selectFamilyVisitInSelectBox__WEBPACK_IMPORTED_MODULE_4__.selectFamilyVisitInSelectBox)(page);\n\n    // select visa center on list\n    await (0,_browser_browser_DOM_interactions_selectLocation__WEBPACK_IMPORTED_MODULE_6__.selectVFSLocation)(page);\n\n    steps.SELECT_LOCATION.succesfull = true;\n\n\n    // select visa category\n    await (0,_browser_browser_DOM_interactions_selectVisaCategory__WEBPACK_IMPORTED_MODULE_9__.selectCategory)(page)\n\n    // handle appointment response for this center\n    const isAppointmentAvailable =\n      await (0,_browser_browser_request_interceptor_appointmentRequestInterceptor__WEBPACK_IMPORTED_MODULE_5__.isAppointmentAvailableByRequestInterceptor)(page);\n\n    let time;\n    if (isAppointmentAvailable) {\n      console.log('1111')\n      // select appointment on the menu\n      time = await getAppointmentData(page);\n      console.log(\"time\", time);\n    }\n\n    await (0,_browser_browser_DOM_interactions_logout__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(page);\n    await browser.close();\n    return `Soonest available appointment for VFS is ${time}`\n  } catch (e) {\n    await (0,_browser_browser_DOM_interactions_logout__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(page);\n    await browser.close();\n    console.log(\"eeeeee\", e);\n\n    throw new Error(e);\n  }\n};\n\nconst checkAppointmentServiceResult = async () => {\n  try {\n    const result = await AppointmentCheckerService();\n    // sendMessageToAllUsers(result);\n  } catch (e) {\n    throw new Error(e);\n  }\n};\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppointmentCheckerService);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/appointment-checker/index.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/errors/errorScreen.js":
/*!****************************************************************!*\
  !*** ./src/services/browser/browser-DOM/errors/errorScreen.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getErrorText\": () => (/* binding */ getErrorText)\n/* harmony export */ });\nconst isErrorScreen = async (page) => {\n  return getErrorText()\n    .then(() => true)\n    .catch(() => false);\n};\n\nconst getErrorText = async (page) => {\n  return await page\n    .waitForXPath('//*[contains(text(), \"Your estimated wait time\")]', {\n      timeout: 10000,\n    })\n    .then(async () => {\n      if (queueText !== null) {\n        const estimatedTimeText = await queueText.evaluate(\n          (el) => el.innerHTML\n        );\n        return estimatedTimeText;\n      }\n    })\n    .catch((e) => new Error());\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isErrorScreen);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/errors/errorScreen.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/interactions/fillLoginForm.js":
/*!************************************************************************!*\
  !*** ./src/services/browser/browser-DOM/interactions/fillLoginForm.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst fillLoginForm = async (page, captchResolved) => {\n  await page.type(\"#EmailId\", process.env.VFS_USER_NAME);\n  await page.type(\"#Password\", process.env.VFS_PASSWORD);\n  await page.type(\"#CaptchaInputText\", captchResolved.toUpperCase());\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fillLoginForm);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/interactions/fillLoginForm.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/interactions/goToLoginPage.js":
/*!************************************************************************!*\
  !*** ./src/services/browser/browser-DOM/interactions/goToLoginPage.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"goToLoginPage\": () => (/* binding */ goToLoginPage)\n/* harmony export */ });\nconst goToLoginPage = async (page) => {\n  // go to login page\n  try {\n    return await page.goto(process.env.VFS_BASE_URL, {\n      waitUntil: \"load\",\n      timeout: 0,\n    });\n  } catch (e) {\n    console.log(\"vvvvv\", e);\n  }\n};\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/interactions/goToLoginPage.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/interactions/logout.js":
/*!*****************************************************************!*\
  !*** ./src/services/browser/browser-DOM/interactions/logout.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selectors */ \"./src/services/browser/browser-DOM/selectors.js\");\n\n\nconst logout = async (page) => {\n  try {\n    await page.$((0,_selectors__WEBPACK_IMPORTED_MODULE_0__.selectLogOutButton)());\n    await page.click((0,_selectors__WEBPACK_IMPORTED_MODULE_0__.selectLogOutButton)());\n    return false;\n  } catch {\n    // Does not exit\n    return true;\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logout);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/interactions/logout.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/interactions/resolveCaptcha.js":
/*!*************************************************************************!*\
  !*** ./src/services/browser/browser-DOM/interactions/resolveCaptcha.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resolveCaptcha\": () => (/* binding */ resolveCaptcha)\n/* harmony export */ });\n/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selectors */ \"./src/services/browser/browser-DOM/selectors.js\");\n/* harmony import */ var _captcha_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../captcha-resolver */ \"./src/services/captcha-resolver/index.js\");\n\n\n\nconst resolveCaptcha = async (page) => {\n  const captchaBase64 = await (0,_selectors__WEBPACK_IMPORTED_MODULE_0__.selectCaptchaImage)(page);\n  console.log('99999', captchaBase64)\n\n  const captchResolved = await (0,_captcha_resolver__WEBPACK_IMPORTED_MODULE_1__.resolveCaptchaService)(captchaBase64);\n  console.log('100000', captchResolved)\n\n  return captchResolved;\n};\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/interactions/resolveCaptcha.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/interactions/selectFamilyVisitInSelectBox.js":
/*!***************************************************************************************!*\
  !*** ./src/services/browser/browser-DOM/interactions/selectFamilyVisitInSelectBox.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectFamilyVisitInSelectBox\": () => (/* binding */ selectFamilyVisitInSelectBox)\n/* harmony export */ });\n/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selectors */ \"./src/services/browser/browser-DOM/selectors.js\");\n\n\nconst selectFamilyVisitInSelectBox = async (page) => {\n  try {\n    const scheduleMenuItem = await (0,_selectors__WEBPACK_IMPORTED_MODULE_0__.selectScheduleMenuItem)(page);\n    return await Promise.all([\n      scheduleMenuItem.click(),\n      page.waitForNavigation({ waitUntil: \"networkidle2\" }),\n    ]);\n  } catch (e) {\n    throw new Error(e);\n  }\n};\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/interactions/selectFamilyVisitInSelectBox.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/interactions/selectLocation.js":
/*!*************************************************************************!*\
  !*** ./src/services/browser/browser-DOM/interactions/selectLocation.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectVFSLocation\": () => (/* binding */ selectVFSLocation)\n/* harmony export */ });\n/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selectors */ \"./src/services/browser/browser-DOM/selectors.js\");\n\n\nconst selectVFSLocation = async (page) => {\n  try {\n   return await page.select((0,_selectors__WEBPACK_IMPORTED_MODULE_0__.selectLocationIdDropdown)(), \"220\");\n  } catch (e) {\n    throw new Error(e);\n  }\n};\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/interactions/selectLocation.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/interactions/selectVisaCategory.js":
/*!*****************************************************************************!*\
  !*** ./src/services/browser/browser-DOM/interactions/selectVisaCategory.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectCategory\": () => (/* binding */ selectCategory)\n/* harmony export */ });\n/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selectors */ \"./src/services/browser/browser-DOM/selectors.js\");\n\n\nconst selectCategory = async (page) => {\n  try {\n   return await page.select((0,_selectors__WEBPACK_IMPORTED_MODULE_0__.selectVisaCategoryDropwdown)(page), \"4887\");\n  } catch (e) {\n    throw new Error(e);\n  }\n};\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/interactions/selectVisaCategory.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/selectors.js":
/*!*******************************************************!*\
  !*** ./src/services/browser/browser-DOM/selectors.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectCaptchaImage\": () => (/* binding */ selectCaptchaImage),\n/* harmony export */   \"selectLocationIdDropdown\": () => (/* binding */ selectLocationIdDropdown),\n/* harmony export */   \"selectLogOutButton\": () => (/* binding */ selectLogOutButton),\n/* harmony export */   \"selectScheduleMenuItem\": () => (/* binding */ selectScheduleMenuItem),\n/* harmony export */   \"selectVisaCategoryDropwdown\": () => (/* binding */ selectVisaCategoryDropwdown)\n/* harmony export */ });\nconst selectCaptchaImage = async (page) => {\n  // TODO: get confing from env or user\n  const path = \"captcha.png\";\n  const encoding = \"base64\";\n  const captchaScreenShotConfig = {\n    encoding,\n  };\n  await page.waitForSelector(\"#CaptchaImage\");\n  const captchImage = await page.$(\"#CaptchaImage\");\n  console.log('77777', captchImage)\n  const captchaImageBase64ScreenShot = await captchImage.screenshot(\n    captchaScreenShotConfig\n  );\n\n  console.log('88888', captchaImageBase64ScreenShot)\n\n\n  return captchaImageBase64ScreenShot;\n};\n\nconst selectScheduleMenuItem = async (page) => {\n  try {\n    return await page.$(\n      \"#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(2) > a\"\n    );\n  } catch (e) {\n    throw new Error(e);\n  }\n};\nconst selectLocationIdDropdown = () => \"select[name='LocationId']\";\n\nconst selectVisaCategoryDropwdown = () => \"select[name='VisaCategoryId']\";\n\n\nconst selectLogOutButton = (page) => \"#logoutForm  > a > span\";\n\n\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/selectors.js?");

/***/ }),

/***/ "./src/services/browser/browser-request-interceptor/appointmentRequestInterceptor.js":
/*!*******************************************************************************************!*\
  !*** ./src/services/browser/browser-request-interceptor/appointmentRequestInterceptor.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isAppointmentAvailableByRequestInterceptor\": () => (/* binding */ isAppointmentAvailableByRequestInterceptor)\n/* harmony export */ });\nconst isAppointmentAvailableByRequestInterceptor = (\n  page,\n  slotEndPointUrl = \"Account/CheckSeatAllotment\"\n) =>\n  new Promise((resolve, reject) => {\n    try {\n      page.on(\"response\", async (response) => {\n        const originalRequest = response.request();\n        if (originalRequest.url().includes(slotEndPointUrl)) {\n          const responseFromEndpoint = await response.json();\n          if (JSON.stringify(responseFromEndpoint).includes(\"no seat\")) {\n            // appointmetn is not available\n            return resolve(false);\n          } else {\n            // appointmetn is available\n            return resolve(true);\n          }\n        }\n      });\n    } catch (e) {\n      return reject(e);\n    }\n  });\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-request-interceptor/appointmentRequestInterceptor.js?");

/***/ }),

/***/ "./src/services/browser/config.js":
/*!****************************************!*\
  !*** ./src/services/browser/config.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst UserAgent = __webpack_require__(/*! user-agents */ \"user-agents\");\n\nconst userAgentDefault =\n  \"--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36\";\n\nconst randomUserAgent = new UserAgent({\n  deviceCategory: \"desktop\",\n  platform: \"Linux x86_64\",\n});\n\nconsole.log(\"development\", \"process.env.NODE_ENV\");\nconsole.log(\";randomUserAgent\", randomUserAgent.data.userAgent);\n\nconst puppeteerConfig = {\n  headless:  true ? false : 0,\n  args: [\n    randomUserAgent.data.userAgent,\n    \"--no-sandbox\",\n    \"--disable-setuid-sandbox\",\n  ],\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (puppeteerConfig);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/config.js?");

/***/ }),

/***/ "./src/services/browser/index.js":
/*!***************************************!*\
  !*** ./src/services/browser/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/services/browser/config.js\");\n\n\n// with stealth to trick vfs to not recongnize the bot\nconst puppeteer = __webpack_require__(/*! puppeteer-extra */ \"puppeteer-extra\");\n\n// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)\nconst StealthPlugin = __webpack_require__(/*! puppeteer-extra-plugin-stealth */ \"puppeteer-extra-plugin-stealth\");\npuppeteer.use(StealthPlugin());\n\nconst create = async ({ headless, args } = _config__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) => {\n  const browser = await puppeteer.launch({\n    headless,\n    args,\n  });\n  return browser;\n};\n\nconst browser = {\n  create,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (browser);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/index.js?");

/***/ }),

/***/ "./src/services/captcha-resolver/index.js":
/*!************************************************!*\
  !*** ./src/services/captcha-resolver/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resolveCaptchaService\": () => (/* binding */ resolveCaptchaService)\n/* harmony export */ });\nconst captchClient = __webpack_require__(/*! @infosimples/node_two_captcha */ \"@infosimples/node_two_captcha\");\n\nconst resolveCaptchaService = async (captcha) => {\n  const captchResolver = new captchClient(process.env.CAPTCHA_SERVER_API_TOKEN, {\n    timeout: 60000,\n    polling: 5000,\n    throwErrors: false,\n  });\n\n  const res = await captchResolver.decode({\n    base64: captcha,\n  });\n  return res.text;\n};\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/captcha-resolver/index.js?");

/***/ }),

/***/ "./src/services/rollbar/index.js":
/*!***************************************!*\
  !*** ./src/services/rollbar/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Rollbar = __webpack_require__(/*! rollbar */ \"rollbar\");\n\nconst initilizeRollbarLogger = () => {\n  // include and initialize the rollbar library with your access token\n  return new Rollbar({\n    accessToken: \"a448a0ece2324e8eb5a4273565a815ee\",\n    captureUncaught: true,\n    captureUnhandledRejections: true,\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initilizeRollbarLogger);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/rollbar/index.js?");

/***/ }),

/***/ "./src/services/scheduldedFunctions.js":
/*!*********************************************!*\
  !*** ./src/services/scheduldedFunctions.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cronJobDefaultConfig\": () => (/* binding */ cronJobDefaultConfig),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst CronJob = __webpack_require__(/*! node-cron */ \"node-cron\");\n\nconst cronJobDefaultConfig = {\n  // every day at 12 pm\n  expression: `0 12 * * *`,\n  callBack: () => console.log(\"executed on a schedule!\"),\n};\nconst createScheduledJobs = ({\n  callBack,\n  expression,\n} = cronJobDefaultConfig) => {\n  const scheduledJobFunction = CronJob.schedule(expression, callBack);\n\n  scheduledJobFunction.start();\n  return {\n    start: () => scheduledJobFunction.start(),\n    stop: () => scheduledJobFunction.stop,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createScheduledJobs);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/scheduldedFunctions.js?");

/***/ }),

/***/ "@infosimples/node_two_captcha":
/*!************************************************!*\
  !*** external "@infosimples/node_two_captcha" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@infosimples/node_two_captcha");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "node-cron":
/*!****************************!*\
  !*** external "node-cron" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node-cron");

/***/ }),

/***/ "puppeteer-extra":
/*!**********************************!*\
  !*** external "puppeteer-extra" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("puppeteer-extra");

/***/ }),

/***/ "puppeteer-extra-plugin-stealth":
/*!*************************************************!*\
  !*** external "puppeteer-extra-plugin-stealth" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("puppeteer-extra-plugin-stealth");

/***/ }),

/***/ "rollbar":
/*!**************************!*\
  !*** external "rollbar" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("rollbar");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "user-agents":
/*!******************************!*\
  !*** external "user-agents" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("user-agents");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;
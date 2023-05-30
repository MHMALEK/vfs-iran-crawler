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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"app\": () => (/* binding */ app),\n/* harmony export */   \"io\": () => (/* binding */ io),\n/* harmony export */   \"server\": () => (/* binding */ server)\n/* harmony export */ });\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _controllers_checkAppointment_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/checkAppointment.controller */ \"./src/controllers/checkAppointment.controller.js\");\n/* harmony import */ var _services_rollbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/rollbar */ \"./src/services/rollbar/index.js\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./database */ \"./src/database/index.js\");\n/* harmony import */ var _services_get_soonest_appointment_cronjob__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/get-soonest-appointment-cronjob */ \"./src/services/get-soonest-appointment-cronjob/index.js\");\n/* harmony import */ var _controllers_main_controller__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controllers/main.controller */ \"./src/controllers/main.controller.js\");\n/* harmony import */ var _services_telegram_bot_init__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/telegram-bot/init */ \"./src/services/telegram-bot/init.js\");\n\ndotenv__WEBPACK_IMPORTED_MODULE_0__.config();\nconst compression = __webpack_require__(/*! compression */ \"compression\");\n\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\n\n\n\n\n\n\n\nconst PORT = \"3007\" || 0;\n\nconst rollbar = (0,_services_rollbar__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n\nconst middleWares = [express__WEBPACK_IMPORTED_MODULE_1__.json, (helmet__WEBPACK_IMPORTED_MODULE_2___default()), compression, rollbar.errorHandler, cors];\nconst initMiddleWares = (app) =>\n  middleWares.map((middleWare) => app.use(middleWare()));\n\nconst startApp = () => {\n  const app = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\n  initMiddleWares(app);\n\n  // rollbar logger for errors\n\n  // routes\n  app.get(\"/\", _controllers_main_controller__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\n  app.get(\"/check-appointment\", _controllers_checkAppointment_controller__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n  app.get(\"/show-soonest\", _controllers_checkAppointment_controller__WEBPACK_IMPORTED_MODULE_3__.showSoonestAppointmentFromDBController);\n\n  const server = app.listen(PORT, () =>\n    console.log(`App listening at port ${PORT}`)\n  );\n  return { app, server };\n};\n\n(0,_database__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\n\n(0,_services_get_soonest_appointment_cronjob__WEBPACK_IMPORTED_MODULE_7__[\"default\"])();\n\n// init telegram bot\n\n(0,_services_telegram_bot_init__WEBPACK_IMPORTED_MODULE_9__[\"default\"])();\n\nconst { app, server } = startApp();\n\nconst io = new socket_io__WEBPACK_IMPORTED_MODULE_5__.Server(server, {\n  cors: {\n    origin: \"*\",\n  },\n});\n\nio.on(\"connection\", (socket) => {\n  console.log(`⚡: ${socket.id} user just connected!`);\n  socket.on(\"disconnect\", () => {\n    console.log(\"🔥: A user disconnected\");\n  });\n});\n\n\n\n\n//# sourceURL=webpack://vfs-checker/./src/app.js?");

/***/ }),

/***/ "./src/controllers/checkAppointment.controller.js":
/*!********************************************************!*\
  !*** ./src/controllers/checkAppointment.controller.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"sendSoonestAppointmentTelegramController\": () => (/* binding */ sendSoonestAppointmentTelegramController),\n/* harmony export */   \"showSoonestAppointmentFromDBController\": () => (/* binding */ showSoonestAppointmentFromDBController)\n/* harmony export */ });\n/* harmony import */ var _models_Times__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Times */ \"./src/models/Times.js\");\n/* harmony import */ var _services_appointment_checker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/appointment-checker */ \"./src/services/appointment-checker/index.js\");\n\n\n\nconst checkAppointmentsController = async (req, res, next) => {\n  try {\n    const soonestTime = await (0,_services_appointment_checker__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    res.json({ soonestTime });\n  } catch (e) {\n    next(e);\n    throw new Error(e);\n  }\n};\n\nconst showSoonestAppointmentFromDBController = async (req, res, next) => {\n  try {\n    const soonestTime = await (0,_models_Times__WEBPACK_IMPORTED_MODULE_0__.getSoonestTime)();\n    res.send(soonestTime);\n  } catch (e) {\n    next(e);\n    throw new Error(e);\n  }\n};\n\nconst sendSoonestAppointmentTelegramController = async (req, res, next) => {\n  try {\n    const soonestTime = await (0,_models_Times__WEBPACK_IMPORTED_MODULE_0__.getSoonestTime)();\n    \n  } catch (e) {\n    next(e);\n    throw new Error(e);\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkAppointmentsController);\n\n\n//# sourceURL=webpack://vfs-checker/./src/controllers/checkAppointment.controller.js?");

/***/ }),

/***/ "./src/controllers/main.controller.js":
/*!********************************************!*\
  !*** ./src/controllers/main.controller.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nconst mainController = async (req, res, next) => {\n  try {\n    res.send(\n      \"this app is a simple robot to help you find and make appointment in VFS global in Iran!!!\"\n    );\n  } catch (e) {\n    next(e);\n    throw new Error(e);\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainController);\n\n\n//# sourceURL=webpack://vfs-checker/./src/controllers/main.controller.js?");

/***/ }),

/***/ "./src/database/index.js":
/*!*******************************!*\
  !*** ./src/database/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst initDataBase = () => {\n  try {\n    const mongoString = \"mongodb+srv://mhosmalek:LV8Sduyf6g3fejCd@cluster0.vvvcesp.mongodb.net/\";\n    console.log(\"mongoString\", mongoString);\n    mongoose.connect(mongoString, {\n      dbName: \"vfs-appointments\",\n    });\n    const database = mongoose.connection;\n\n    database.on(\"error\", (error) => {\n      console.log(error);\n      throw new Error(\"can not connect to database\");\n    });\n\n    database.once(\"connected\", () => {\n      console.log(\"Database Connected\");\n      return database;\n    });\n  } catch (e) {}\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initDataBase);\n\n\n//# sourceURL=webpack://vfs-checker/./src/database/index.js?");

/***/ }),

/***/ "./src/models/Times.js":
/*!*****************************!*\
  !*** ./src/models/Times.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getSoonestTime\": () => (/* binding */ getSoonestTime),\n/* harmony export */   \"getSoonestTimes\": () => (/* binding */ getSoonestTimes),\n/* harmony export */   \"updateTime\": () => (/* binding */ updateTime)\n/* harmony export */ });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst timeSchema = new mongoose.Schema({\n  time: {\n    type: String,\n    unique: false,\n  },\n  lastUpdated: {\n    type: Date,\n    unique: true,\n  },\n});\n\nconst timeModel = mongoose.model(\"time\", timeSchema);\n\nconst getSoonestTimes = async () => await timeModel.find();\n\nconst getSoonestTime = async () => {\n  const res = await timeModel.findOne().sort({ _id: -1 });\n  console.log(\"asd\", res);\n  return res;\n};\nconst updateTime = async (time) => {\n  const soonestTime = new timeModel({\n    time,\n    lastUpdated: new Date(),\n  });\n  return await soonestTime.save(function (err) {\n    if (err) console.log(err);\n    console.log(\"Inserted document into the collection\");\n  });\n};\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timeModel);\n\n\n//# sourceURL=webpack://vfs-checker/./src/models/Times.js?");

/***/ }),

/***/ "./src/models/User.js":
/*!****************************!*\
  !*** ./src/models/User.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addUserForTelegramBot\": () => (/* binding */ addUserForTelegramBot),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"findAllTelegramUserByChatId\": () => (/* binding */ findAllTelegramUserByChatId),\n/* harmony export */   \"findAllTelegramUsers\": () => (/* binding */ findAllTelegramUsers),\n/* harmony export */   \"isTelegramUserExist\": () => (/* binding */ isTelegramUserExist)\n/* harmony export */ });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst telegramUserSchema = new mongoose.Schema({\n  chatId: {\n    type: Number,\n    unique: true,\n  },\n});\n\nconst telegramUserModel = mongoose.model(\"telegram\", telegramUserSchema);\n\nconst findAllTelegramUsers = async () => await telegramUserModel.find();\n\nconst findAllTelegramUserByChatId = async (chatId) => await telegramUserModel.findOne({ chatId });\n\nconst isTelegramUserExist = async (chatId) => {\n  const isUserSavedBefore = await findUserByChatId(chatId);\n  if (isUserSavedBefore) {\n    return true;\n  }\n  return false;\n};\n\nconst addUserForTelegramBot = async (chatId) => {\n  const user = new telegramUserModel({\n    chatId,\n  });\n  return await user.save(function (err) {\n    if (err) console.log(err);\n    console.log(\"Inserted document into the collection\");\n  });\n};\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (telegramUserModel);\n\n\n//# sourceURL=webpack://vfs-checker/./src/models/User.js?");

/***/ }),

/***/ "./src/services/appointment-checker/index.js":
/*!***************************************************!*\
  !*** ./src/services/appointment-checker/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _browser_browser_DOM_interactions_goToLoginPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/goToLoginPage */ \"./src/services/browser/browser-DOM/interactions/goToLoginPage.js\");\n/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../browser */ \"./src/services/browser/index.js\");\n/* harmony import */ var _browser_browser_DOM_errors_errorScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../browser/browser-DOM/errors/errorScreen */ \"./src/services/browser/browser-DOM/errors/errorScreen.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_fillLoginForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/fillLoginForm */ \"./src/services/browser/browser-DOM/interactions/fillLoginForm.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_selectFamilyVisitInSelectBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/selectFamilyVisitInSelectBox */ \"./src/services/browser/browser-DOM/interactions/selectFamilyVisitInSelectBox.js\");\n/* harmony import */ var _browser_browser_request_interceptor_appointmentRequestInterceptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../browser/browser-request-interceptor/appointmentRequestInterceptor */ \"./src/services/browser/browser-request-interceptor/appointmentRequestInterceptor.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_selectLocation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/selectLocation */ \"./src/services/browser/browser-DOM/interactions/selectLocation.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_resolveCaptcha__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/resolveCaptcha */ \"./src/services/browser/browser-DOM/interactions/resolveCaptcha.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_logout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/logout */ \"./src/services/browser/browser-DOM/interactions/logout.js\");\n/* harmony import */ var _browser_browser_DOM_interactions_selectVisaCategory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../browser/browser-DOM/interactions/selectVisaCategory */ \"./src/services/browser/browser-DOM/interactions/selectVisaCategory.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../app */ \"./src/app.js\");\n/* harmony import */ var user_agents__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! user-agents */ \"user-agents\");\n/* harmony import */ var user_agents__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(user_agents__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _browser_useragent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../browser/useragent */ \"./src/services/browser/useragent/index.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst handleErrorPage = async (page) => {\n  // if login was not sucessfull\n  const isErrorElementVisible = await page.$(\n    \"#ApplicantListForm > div.validation-summary-errors > ul > li\"\n  );\n  if (isErrorElementVisible) {\n    const errorText = await isErrorElementVisible.evaluate(\n      (el) => el.textContent\n    ); // grab the textContent from the element, by evaluating this function in the browser context\n    // res.send(errorText)\n    steps.LOGIN_ACTION.succesfull = false;\n    _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"errorHappend\", e);\n    throw new Error(errorText);\n  }\n};\n\nconst getAppointmentData = async (page) => {\n  return await page\n    .waitForXPath(\n      \"/html/body/div[2]/div[1]/div[3]/div[3]/form/div[1]/div[2]/div[7]/div[6]/div/table/thead/tr[2]/td[1]/label[2]\",\n      {\n        timeout: 10000,\n      }\n    )\n    .then(async (res) => {\n      console.log(\"asdsadsad\", res);\n      if (res !== null) {\n        const appointmetntTimeText = await res.evaluate((el) => el.innerHTML);\n        console.log(\"appointmetntTimeText\", appointmetntTimeText);\n        return appointmetntTimeText;\n      }\n    })\n    .catch((e) => new Error());\n};\n\nconst steps = {\n  GO_TO_LOGIN_PAGE: {\n    id: 0,\n    label: \"در حال ورود به وبسایت \",\n    desc: \"ما در حال باز کردن سایت VFS گلوبال هستیم... لطفا مرورگر رو نبنید و منتظر اتمام فرآیند باشید.\",\n    succesfull: false,\n  },\n  GET_CAPTCHA: {\n    id: 1,\n    label: \"در حال ذخیره سازی تصویر کپچا\",\n    desc: \"ما داریم تصویر کپچا رو استخراج میکنیم تا بتونیم اونو حل کنیم و فرآیند ورود رو انجام بدیم.\",\n\n    succesfull: false,\n  },\n  RESOLVE_CAPTCHA: {\n    id: 2,\n    label: \"حل کپچا\",\n    desc: \"تصویر کپچا در حال حل شدن است...\",\n\n    succesfull: false,\n  },\n  ENTER_LOGIN_DETAILS: {\n    id: 3,\n    label: \"وارد کردن اطلاعات ورود\",\n    desc: \"ما در حال وارد کردن اطلاعات ورود و ورود به ناحیه کاربری در وبسایت ٰVFS هستیم.\",\n\n    succesfull: false,\n  },\n  LOGIN_ACTION: {\n    id: 4,\n    label: \"ورود به وبسایت VFS با موفقیت انجام شد!\",\n    desc: \"ما حالا میتونیم اطلاعات قرار ملاقات رو از وبسایت پیدا کنیم.\",\n\n    succesfull: false,\n  },\n  SELECT_SERVICE: {\n    id: 5,\n    label: \"انتخاب سرویس ثبت قرار ملاقات\",\n    desc: \"ما سرویس ثبت قرار ملاقات رو انتخاب میکنیم.\",\n\n    succesfull: false,\n  },\n  SELECT_LOCATION: {\n    id: 6,\n    label: \"انتخاب محل\",\n    desc: \"ما دفتر تهران رو برای این قرار انتخاب میکنیم.\",\n\n    succesfull: false,\n  },\n  SELECT_APPOINTMENT_TYPE: {\n    id: 7,\n    label: \"انتخاب سرویس\",\n    desc: \"ما سرویس ملاقات خانواده و دوستان رو انتخاب میکنیم.\",\n\n    succesfull: false,\n  },\n  GET_SOONEST_DATA: {\n    id: 8,\n    label: \"در حال ارسال درخواست قرار ملاقات\",\n    desc: \"ما اطلاعات قرار ملاقات رو دریافت می‌کنیم\",\n    succesfull: false,\n  },\n  LOGOUT_ACTION: {\n    id: 9,\n    label: \"خروج از سیستم\",\n    succesfull: false,\n  },\n};\n\nconst AppointmentCheckerService = async () => {\n  const browser = await _browser__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create();\n\n  const page = await browser.newPage();\n\n  // set cache to false\n  await page.setCacheEnabled(false);\n\n  await (0,_browser_useragent__WEBPACK_IMPORTED_MODULE_12__[\"default\"])(page);\n\n  page.setDefaultNavigationTimeout(180000);\n\n  let captcha;\n\n  try {\n    // go to login page\n    await (0,_browser_browser_DOM_interactions_goToLoginPage__WEBPACK_IMPORTED_MODULE_0__.goToLoginPage)(page);\n\n    // show error if it couldn't show the login page\n    const hasErrorOnStart = await (0,_browser_browser_DOM_errors_errorScreen__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(page);\n    if (hasErrorOnStart) {\n      const errorText = (0,_browser_browser_DOM_errors_errorScreen__WEBPACK_IMPORTED_MODULE_2__.getErrorText)();\n      steps.GO_TO_LOGIN_PAGE.succesfull = false;\n      steps.ENTER_LOGIN_DETAILS.succesfull = false;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"errorHappend\", e);\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n      throw new Error(errorText);\n    }\n\n    steps.GO_TO_LOGIN_PAGE.succesfull = true;\n    _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n\n    // login flow\n\n    try {\n      captcha = await (0,_browser_browser_DOM_interactions_resolveCaptcha__WEBPACK_IMPORTED_MODULE_7__.resolveCaptcha)(page);\n      steps.RESOLVE_CAPTCHA.succesfull = true;\n      steps.GET_CAPTCHA.succesfull = true;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    } catch (e) {\n      console.log(\"asdasdasdasdads\", e);\n      steps.GET_CAPTCHA.succesfull = false;\n      steps.RESOLVE_CAPTCHA.succesfull = false;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"errorHappend\", e);\n    }\n\n    try {\n      await (0,_browser_browser_DOM_interactions_fillLoginForm__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(page, captcha);\n      steps.ENTER_LOGIN_DETAILS = true;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    } catch (e) {\n      steps.ENTER_LOGIN_DETAILS = false;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"errorHappend\", e);\n    }\n\n    try {\n      // submit form and wait until login finish\n      await Promise.all([\n        page.click(\"#btnSubmit\"),\n        page.waitForNavigation({ waitUntil: \"networkidle2\" }),\n      ]);\n\n      steps.LOGIN_ACTION.succesfull = true;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    } catch (e) {\n      steps.LOGIN_ACTION.succesfull = false;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"errorHappend\", e);\n    }\n\n    handleErrorPage();\n\n    try {\n      await (0,_browser_browser_DOM_interactions_selectFamilyVisitInSelectBox__WEBPACK_IMPORTED_MODULE_4__.selectFamilyVisitInSelectBox)(page);\n      steps.SELECT_SERVICE.succesfull = true;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    } catch (e) {\n      steps.SELECT_SERVICE.succesfull = false;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"errorHappend\", e);\n    }\n\n    try {\n      // select visa center on list\n      await (0,_browser_browser_DOM_interactions_selectLocation__WEBPACK_IMPORTED_MODULE_6__.selectVFSLocation)(page);\n      steps.SELECT_LOCATION.succesfull = true;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    } catch (e) {\n      steps.SELECT_LOCATION.succesfull = false;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"errorHappend\", e);\n    }\n\n    try {\n      // select visa category\n      await (0,_browser_browser_DOM_interactions_selectVisaCategory__WEBPACK_IMPORTED_MODULE_9__.selectCategory)(page);\n      steps.SELECT_APPOINTMENT_TYPE.succesfull = true;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    } catch (e) {\n      steps.SELECT_APPOINTMENT_TYPE.succesfull = false;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"errorHappend\", e);\n    }\n\n    let time;\n\n    try {\n      // handle appointment response for this center\n      const isAppointmentAvailable =\n        await (0,_browser_browser_request_interceptor_appointmentRequestInterceptor__WEBPACK_IMPORTED_MODULE_5__.isAppointmentAvailableByRequestInterceptor)(page);\n\n      if (isAppointmentAvailable) {\n        // select appointment on the menu\n        time = await getAppointmentData(page);\n        console.log(\"time\", time);\n        steps.GET_SOONEST_DATA.succesfull = true;\n        _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n      }\n    } catch (e) {\n      steps.GET_SOONEST_DATA.succesfull = false;\n      _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    }\n\n    await (0,_browser_browser_DOM_interactions_logout__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(page);\n    steps.LOGOUT_ACTION.succesfull = true;\n    _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    await browser.close();\n    return time;\n  } catch (e) {\n    await (0,_browser_browser_DOM_interactions_logout__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(page);\n    steps.LOGOUT_ACTION.succesfull = true;\n    _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"newUpdate\", steps);\n    _app__WEBPACK_IMPORTED_MODULE_10__.io.emit(\"errorHappend\", e);\n\n    await browser.close();\n    console.log(\"eeeeee\", e);\n\n    throw new Error(e);\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppointmentCheckerService);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/appointment-checker/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst fillLoginForm = async (page, captchResolved) => {\n  function getRandomItem(array) {\n    const randomIndex = Math.floor(Math.random() * array.length);\n    return array[randomIndex];\n  }\n\n  let user;\n  const users = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(\"http://localhost:3000/users/verified\");\n\n  console.log(\"ssdasdasdasdsadsad\", users);\n  if (users.data.length > 0) {\n    console.log(\"asdsadsadasdasdsad\");\n    user = getRandomItem(users.data).data.username;\n    console.log(\"asdsadsadasdasdsad\", user, getRandomItem(users.data));\n  }\n  await page.type(\"#EmailId\", user || \"mhos.malek@gmail.com\");\n  await page.type(\"#Password\", \"74UKzg5oI!%8\");\n  await page.type(\"#CaptchaInputText\", captchResolved.toUpperCase());\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fillLoginForm);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/interactions/fillLoginForm.js?");

/***/ }),

/***/ "./src/services/browser/browser-DOM/interactions/goToLoginPage.js":
/*!************************************************************************!*\
  !*** ./src/services/browser/browser-DOM/interactions/goToLoginPage.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"goToLoginPage\": () => (/* binding */ goToLoginPage)\n/* harmony export */ });\nconst goToLoginPage = async (page) => {\n  // go to login page\n  try {\n    return await page.goto(\"https://row7.vfsglobal.com/Global-Appointment/Account/RegisteredLogin?q=shSA0YnE4pLF9Xzwon/x/MI24mBrB3J1rBC1vdDKa5IQdrJXKYTs+DdVJBpH9l4l7y9kr9wkS1P1QdJpp0GPog==\", {\n      waitUntil: \"load\",\n      timeout: 0,\n    });\n  } catch (e) {\n    console.log(\"vvvvv\", e);\n  }\n};\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/interactions/goToLoginPage.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectCaptchaImage\": () => (/* binding */ selectCaptchaImage),\n/* harmony export */   \"selectLocationIdDropdown\": () => (/* binding */ selectLocationIdDropdown),\n/* harmony export */   \"selectLogOutButton\": () => (/* binding */ selectLogOutButton),\n/* harmony export */   \"selectScheduleMenuItem\": () => (/* binding */ selectScheduleMenuItem),\n/* harmony export */   \"selectVisaCategoryDropwdown\": () => (/* binding */ selectVisaCategoryDropwdown)\n/* harmony export */ });\nconst selectCaptchaImage = async (page) => {\n  const encoding = \"base64\";\n  const captchaScreenShotConfig = {\n    encoding,\n  };\n  await page.waitForSelector(\"#CaptchaImage\", { timeout: 180000 });\n  const captchImage = await page.$(\"#CaptchaImage\");\n  const captchaImageBase64ScreenShot = await captchImage.screenshot(\n    captchaScreenShotConfig\n  );\n\n  return captchaImageBase64ScreenShot;\n};\n\nconst selectScheduleMenuItem = async (page) => {\n  try {\n    return await page.$(\n      \"#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(2) > a\"\n    );\n  } catch (e) {\n    throw new Error(e);\n  }\n};\nconst selectLocationIdDropdown = () => \"select[name='LocationId']\";\n\nconst selectVisaCategoryDropwdown = () => \"select[name='VisaCategoryId']\";\n\nconst selectLogOutButton = (page) => \"#logoutForm  > a > span\";\n\n\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/browser-DOM/selectors.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst UserAgent = __webpack_require__(/*! user-agents */ \"user-agents\");\n\nconst userAgentDefault =\n  \"--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36\";\n\nconst randomUserAgent = new UserAgent();\n\nconsole.log(\"development\", \"process.env.NODE_ENV\");\nconsole.log(\";randomUserAgent\", randomUserAgent.data.userAgent);\n\nconst puppeteerConfig = {\n  headless:  true ? false : 0,\n  args: [\"--no-sandbox\", \"--disable-setuid-sandbox\"],\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (puppeteerConfig);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/config.js?");

/***/ }),

/***/ "./src/services/browser/index.js":
/*!***************************************!*\
  !*** ./src/services/browser/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var user_agents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! user-agents */ \"user-agents\");\n/* harmony import */ var user_agents__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(user_agents__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _get_proxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../get-proxy */ \"./src/services/get-proxy/index.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ \"./src/services/browser/config.js\");\n\n\n\n\n\n\n// with stealth to trick vfs to not recongnize the bot\nconst puppeteer = __webpack_require__(/*! puppeteer-extra */ \"puppeteer-extra\");\n\n// add stealth plugin and use defaults (all evasion techniques)\nconst StealthPlugin = __webpack_require__(/*! puppeteer-extra-plugin-stealth */ \"puppeteer-extra-plugin-stealth\");\npuppeteer.use(StealthPlugin());\n\nconst create = async ({\n  headless,\n  args,\n  useProxy = false,\n} = _config__WEBPACK_IMPORTED_MODULE_3__[\"default\"]) => {\n  let browser;\n  if (useProxy) {\n    browser = await (0,_get_proxy__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n      headless,\n      args,\n    });\n  } else {\n    browser = await puppeteer.launch({\n      headless,\n      args: [...args],\n    });\n  }\n  return browser;\n};\n\nconst browser = {\n  create,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (browser);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/index.js?");

/***/ }),

/***/ "./src/services/browser/useragent/create.js":
/*!**************************************************!*\
  !*** ./src/services/browser/useragent/create.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var user_agents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! user-agents */ \"user-agents\");\n/* harmony import */ var user_agents__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(user_agents__WEBPACK_IMPORTED_MODULE_0__);\n// Create random user-agent to be set through plugin\n\n\n\nconst createUserAgent = () => {\n  const userAgent = new (user_agents__WEBPACK_IMPORTED_MODULE_0___default())();\n  const userAgentStr = userAgent.toString();\n  return userAgentStr;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createUserAgent);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/useragent/create.js?");

/***/ }),

/***/ "./src/services/browser/useragent/index.js":
/*!*************************************************!*\
  !*** ./src/services/browser/useragent/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create */ \"./src/services/browser/useragent/create.js\");\n\n\nconst cerateAndSetRandomUserAgent = async (page) => {\n  const userAgent = (0,_create__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  await page.setUserAgent(userAgent);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cerateAndSetRandomUserAgent);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/browser/useragent/index.js?");

/***/ }),

/***/ "./src/services/captcha-resolver/index.js":
/*!************************************************!*\
  !*** ./src/services/captcha-resolver/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resolveCaptchaService\": () => (/* binding */ resolveCaptchaService)\n/* harmony export */ });\nconst captchClient = __webpack_require__(/*! @infosimples/node_two_captcha */ \"@infosimples/node_two_captcha\");\n\nconst resolveCaptchaService = async (captcha) => {\n  const captchResolver = new captchClient(\"0e819916b2290052cd066c68014a4282\", {\n    timeout: 60000,\n    polling: 5000,\n    throwErrors: false,\n  });\n\n  const res = await captchResolver.decode({\n    base64: captcha,\n  });\n  return res.text;\n};\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/captcha-resolver/index.js?");

/***/ }),

/***/ "./src/services/get-proxy/index.js":
/*!*****************************************!*\
  !*** ./src/services/get-proxy/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getProxyFromRotatingProxyServer\": () => (/* binding */ getProxyFromRotatingProxyServer)\n/* harmony export */ });\nconst request = __webpack_require__(/*! request-promise */ \"request-promise\");\n\nconst getProxyFromRotatingProxyServer = async () => {\n  const proxy = await request({\n    url: \"http://ipv4.webshare.io/\",\n    proxy: \"http://jkwivzej-rotate:yf18u54hfjfx@p.webshare.io:80\",\n  });\n  return proxy;\n};\n\nconst handleProxyForPuppeteer = async ({\n    \n}) => {\n  const browser = await puppeteer.launch({\n    ...options,\n    args: [...options.args, \"--proxy-server=http://p.webshare.io:80\"],\n  });\n\n  const page = await browser.newPage();\n\n  await page.authenticate({\n    username: \"jkwivzej-rotate\",\n    password: \"yf18u54hfjfx\",\n  });\n  return browser;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleProxyForPuppeteer);\n\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/get-proxy/index.js?");

/***/ }),

/***/ "./src/services/get-soonest-appointment-cronjob/index.js":
/*!***************************************************************!*\
  !*** ./src/services/get-soonest-appointment-cronjob/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_Times__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/Times */ \"./src/models/Times.js\");\n/* harmony import */ var _appointment_checker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../appointment-checker */ \"./src/services/appointment-checker/index.js\");\n/* harmony import */ var _scheduldedFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scheduldedFunctions */ \"./src/services/scheduldedFunctions.js\");\n/* harmony import */ var _telegram_bot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../telegram-bot */ \"./src/services/telegram-bot/index.js\");\n\n\n\n\n\nconst getAndSaveAppointmentCronjobCallback = async () => {\n  try {\n    const result = await (0,_appointment_checker__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    (0,_models_Times__WEBPACK_IMPORTED_MODULE_0__.updateTime)(result);\n    (0,_telegram_bot__WEBPACK_IMPORTED_MODULE_3__.sendMessageToBot)(result)\n  } catch (e) {\n    throw new Error(e);\n  }\n};\n\nconst checkAppointmentEveryDayJob = (0,_scheduldedFunctions__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n  expression: _scheduldedFunctions__WEBPACK_IMPORTED_MODULE_2__.cronJobDefaultConfig.expression,\n  callBack: getAndSaveAppointmentCronjobCallback,\n});\n\nconst getAndSaveAppointmentCronjobService = () => {\n  checkAppointmentEveryDayJob.start();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAndSaveAppointmentCronjobService);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/get-soonest-appointment-cronjob/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cronJobDefaultConfig\": () => (/* binding */ cronJobDefaultConfig),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst CronJob = __webpack_require__(/*! node-cron */ \"node-cron\");\n\nconst cronJobDefaultConfig = {\n  // every day at 12 pm\n  // expression: `0 12 * * *`,\n  expression: \"*/30 * * * *\",\n  callBack: () => console.log(\"executed on a schedule!\"),\n};\nconst createScheduledJobs = ({\n  callBack,\n  expression,\n} = cronJobDefaultConfig) => {\n  const scheduledJobFunction = CronJob.schedule(expression, callBack);\n\n  scheduledJobFunction.start();\n  return {\n    start: () => scheduledJobFunction.start(),\n    stop: () => scheduledJobFunction.stop,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createScheduledJobs);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/scheduldedFunctions.js?");

/***/ }),

/***/ "./src/services/telegram-bot/index.js":
/*!********************************************!*\
  !*** ./src/services/telegram-bot/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getBot\": () => (/* binding */ getBot),\n/* harmony export */   \"initBot\": () => (/* binding */ initBot),\n/* harmony export */   \"sendMessageToBot\": () => (/* binding */ sendMessageToBot),\n/* harmony export */   \"startBot\": () => (/* binding */ startBot)\n/* harmony export */ });\n/* harmony import */ var grammy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grammy */ \"grammy\");\n/* harmony import */ var grammy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(grammy__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/User */ \"./src/models/User.js\");\n\n\n\n// Create an instance of the `Bot` class and pass your bot token to it.\nconst bot = new grammy__WEBPACK_IMPORTED_MODULE_0__.Bot(\"6225139319:AAEtFdJlbuS9Dp4bvoJzxPjDOCzIMXwd1AU\"); //\n\nconst initBot = (onStartCommandCallback) => {\n  // Handle the /start command.\n  bot.command(\"start\", (ctx) => {\n    ctx.reply(\"Welcome! This bot will check VFS appointment system and will notify about the soonest available appointment\");\n    onStartCommandCallback(ctx.from.id);\n  });\n  // Handle other messages.\n  bot.on(\"message\", (ctx) => ctx.reply(\"Got another message!\"));\n};\nconst sendMessageToBot = async (message) => {\n  const telegramUsers = await (0,_models_User__WEBPACK_IMPORTED_MODULE_1__.findAllTelegramUsers)();\n  telegramUsers.map(\n    async (telegramUser) =>\n      await bot.api.sendMessage(telegramUser.chatId, message)\n  );\n};\n\n// Start the bot.\nconst startBot = async (onStartCommandCallback) => {\n  initBot(onStartCommandCallback);\n  bot.start();\n};\n\nconst getBot = () => {\n  return bot;\n};\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/telegram-bot/index.js?");

/***/ }),

/***/ "./src/services/telegram-bot/init.js":
/*!*******************************************!*\
  !*** ./src/services/telegram-bot/init.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/services/telegram-bot/index.js\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/User */ \"./src/models/User.js\");\n\n\n\nconst startTelegramBotAndSaveUsersOnStartCommand = () => {\n  // init telegram bot\n  (0,___WEBPACK_IMPORTED_MODULE_0__.startBot)(_models_User__WEBPACK_IMPORTED_MODULE_1__.addUserForTelegramBot);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startTelegramBotAndSaveUsersOnStartCommand);\n\n\n//# sourceURL=webpack://vfs-checker/./src/services/telegram-bot/init.js?");

/***/ }),

/***/ "@infosimples/node_two_captcha":
/*!************************************************!*\
  !*** external "@infosimples/node_two_captcha" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@infosimples/node_two_captcha");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

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

/***/ "grammy":
/*!*************************!*\
  !*** external "grammy" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("grammy");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

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

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("request-promise");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;
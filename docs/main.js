(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./packages/core/src/directives/form-submit.directive.ts":
/*!***************************************************************!*\
  !*** ./packages/core/src/directives/form-submit.directive.ts ***!
  \***************************************************************/
/*! exports provided: NgxFormSubmitDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxFormSubmitDirective", function() { return NgxFormSubmitDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _form_validator_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-validator.directive */ "./packages/core/src/directives/form-validator.directive.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NgxFormSubmitDirective = /** @class */ (function () {
    function NgxFormSubmitDirective(ngForm, validatorDirective) {
        this.ngForm = ngForm;
        this.validatorDirective = validatorDirective;
        this.ngxFormSubmit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    NgxFormSubmitDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.validatorDirective.onSubmitSuccess = function ($event) {
            _this.ngxFormSubmit.emit($event);
        };
    };
    NgxFormSubmitDirective.prototype.onSubmit = function ($event) {
        this.validatorDirective.submit($event);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], NgxFormSubmitDirective.prototype, "ngxFormSubmit", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NgxFormSubmitDirective.prototype, "onSubmit", null);
    NgxFormSubmitDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[ngxFormSubmit],[ngx-form-submit]'
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgForm"],
            _form_validator_directive__WEBPACK_IMPORTED_MODULE_2__["NgxFormValidatorDirective"]])
    ], NgxFormSubmitDirective);
    return NgxFormSubmitDirective;
}());



/***/ }),

/***/ "./packages/core/src/directives/form-validator.directive.ts":
/*!******************************************************************!*\
  !*** ./packages/core/src/directives/form-validator.directive.ts ***!
  \******************************************************************/
/*! exports provided: NgxEnterKeyMode, NgxFormValidatorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxEnterKeyMode", function() { return NgxEnterKeyMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxFormValidatorDirective", function() { return NgxFormValidatorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _validator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validator.service */ "./packages/core/src/validator.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var KEY_CODES_ENTER = 13;
// 1. submit 按 Enter 键提交, Textare 除外，需要按 Ctrl | Command + Enter 提交
// 2. alwaysSubmit 不管是哪个元素 按 Enter 键都提交
// 3. forbidSubmit Enter 键禁止提交
// 默认 submit
var NgxEnterKeyMode;
(function (NgxEnterKeyMode) {
    NgxEnterKeyMode["submit"] = "submit";
    NgxEnterKeyMode["alwaysSubmit"] = "alwaysSubmit";
    NgxEnterKeyMode["forbidSubmit"] = "forbidSubmit";
})(NgxEnterKeyMode || (NgxEnterKeyMode = {}));
var NgxFormValidatorDirective = /** @class */ (function () {
    function NgxFormValidatorDirective(ngZone, renderer, elementRef, validator, ngForm) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.validator = validator;
        this.ngForm = ngForm;
    }
    Object.defineProperty(NgxFormValidatorDirective.prototype, "ngxFormValidatorConfig", {
        set: function (config) {
            this.validator.setValidatorConfig(config);
        },
        enumerable: true,
        configurable: true
    });
    NgxFormValidatorDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.unsubscribe = _this.renderer.listen(_this.elementRef.nativeElement, 'keydown', _this.onKeydown.bind(_this));
        });
        this.validator.initialize(this.ngForm, this.elementRef.nativeElement);
    };
    NgxFormValidatorDirective.prototype.submit = function ($event) {
        if (this.validator.validate($event) && this.onSubmitSuccess) {
            this.onSubmitSuccess($event);
        }
    };
    NgxFormValidatorDirective.prototype.submitRunInZone = function ($event) {
        var _this = this;
        this.ngZone.run(function () {
            _this.submit($event);
        });
    };
    NgxFormValidatorDirective.prototype.onKeydown = function ($event) {
        var currentInput = document.activeElement;
        var key = $event.which || $event.keyCode;
        if (key === KEY_CODES_ENTER && currentInput.tagName) {
            if (!this.enterKeyMode ||
                this.enterKeyMode === NgxEnterKeyMode.submit) {
                // TEXTAREA Ctrl + Enter 或者 Command + Enter 阻止默认行为并提交
                if (currentInput.tagName === 'TEXTAREA') {
                    if ($event.ctrlKey || $event.metaKey) {
                        $event.preventDefault();
                        this.submitRunInZone($event);
                    }
                }
                else {
                    // 不是 TEXTAREA Enter 阻止默认行为并提交
                    $event.preventDefault();
                    this.submitRunInZone($event);
                }
            }
            else if (this.enterKeyMode === NgxEnterKeyMode.alwaysSubmit) {
                $event.preventDefault();
                this.submitRunInZone($event);
            }
            else {
                // do nothing
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], NgxFormValidatorDirective.prototype, "enterKeyMode", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NgxFormValidatorDirective.prototype, "ngxFormValidatorConfig", null);
    NgxFormValidatorDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: 'form[ngxFormValidator],form[ngx-form-validator]',
            providers: [_validator_service__WEBPACK_IMPORTED_MODULE_1__["NgxFormValidatorService"]]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _validator_service__WEBPACK_IMPORTED_MODULE_1__["NgxFormValidatorService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"]])
    ], NgxFormValidatorDirective);
    return NgxFormValidatorDirective;
}());



/***/ }),

/***/ "./packages/core/src/helpers.ts":
/*!**************************************!*\
  !*** ./packages/core/src/helpers.ts ***!
  \**************************************/
/*! exports provided: isFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
function isFunction(value) {
    var type = typeof value;
    return !!value && type === 'function';
}


/***/ }),

/***/ "./packages/core/src/module.ts":
/*!*************************************!*\
  !*** ./packages/core/src/module.ts ***!
  \*************************************/
/*! exports provided: NgxValidatorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxValidatorModule", function() { return NgxValidatorModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _directives_form_validator_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./directives/form-validator.directive */ "./packages/core/src/directives/form-validator.directive.ts");
/* harmony import */ var _directives_form_submit_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives/form-submit.directive */ "./packages/core/src/directives/form-submit.directive.ts");
/* harmony import */ var _validator_class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validator.class */ "./packages/core/src/validator.class.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var NgxValidatorModule = /** @class */ (function () {
    function NgxValidatorModule() {
    }
    NgxValidatorModule_1 = NgxValidatorModule;
    NgxValidatorModule.forRoot = function (config) {
        return {
            ngModule: NgxValidatorModule_1,
            providers: [
                {
                    provide: _validator_class__WEBPACK_IMPORTED_MODULE_4__["NGX_VALIDATOR_CONFIG"],
                    useValue: config
                }
            ]
        };
    };
    var NgxValidatorModule_1;
    NgxValidatorModule = NgxValidatorModule_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_directives_form_validator_directive__WEBPACK_IMPORTED_MODULE_2__["NgxFormValidatorDirective"], _directives_form_submit_directive__WEBPACK_IMPORTED_MODULE_3__["NgxFormSubmitDirective"]],
            imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]],
            exports: [_directives_form_validator_directive__WEBPACK_IMPORTED_MODULE_2__["NgxFormValidatorDirective"], _directives_form_submit_directive__WEBPACK_IMPORTED_MODULE_3__["NgxFormSubmitDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]]
        })
    ], NgxValidatorModule);
    return NgxValidatorModule;
}());



/***/ }),

/***/ "./packages/core/src/public_api.ts":
/*!*****************************************!*\
  !*** ./packages/core/src/public_api.ts ***!
  \*****************************************/
/*! exports provided: NgxValidatorModule, NgxValidatorLoader, NGX_VALIDATOR_CONFIG, NgxEnterKeyMode, NgxFormValidatorDirective, NgxFormSubmitDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ "./packages/core/src/module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxValidatorModule", function() { return _module__WEBPACK_IMPORTED_MODULE_0__["NgxValidatorModule"]; });

/* harmony import */ var _validator_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validator-loader.service */ "./packages/core/src/validator-loader.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxValidatorLoader", function() { return _validator_loader_service__WEBPACK_IMPORTED_MODULE_1__["NgxValidatorLoader"]; });

/* harmony import */ var _validator_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validator.class */ "./packages/core/src/validator.class.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NGX_VALIDATOR_CONFIG", function() { return _validator_class__WEBPACK_IMPORTED_MODULE_2__["NGX_VALIDATOR_CONFIG"]; });

/* harmony import */ var _directives_form_validator_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives/form-validator.directive */ "./packages/core/src/directives/form-validator.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxEnterKeyMode", function() { return _directives_form_validator_directive__WEBPACK_IMPORTED_MODULE_3__["NgxEnterKeyMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxFormValidatorDirective", function() { return _directives_form_validator_directive__WEBPACK_IMPORTED_MODULE_3__["NgxFormValidatorDirective"]; });

/* harmony import */ var _directives_form_submit_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/form-submit.directive */ "./packages/core/src/directives/form-submit.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgxFormSubmitDirective", function() { return _directives_form_submit_directive__WEBPACK_IMPORTED_MODULE_4__["NgxFormSubmitDirective"]; });

/*
 * Public API Surface of core
 */







/***/ }),

/***/ "./packages/core/src/validator-loader.service.ts":
/*!*******************************************************!*\
  !*** ./packages/core/src/validator-loader.service.ts ***!
  \*******************************************************/
/*! exports provided: NgxValidatorLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxValidatorLoader", function() { return NgxValidatorLoader; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _validator_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validator.class */ "./packages/core/src/validator.class.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./packages/core/src/helpers.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var INVALID_CLASS = 'is-invalid';
var INVALID_FEEDBACK_CLASS = 'invalid-feedback';
var defaultValidatorConfig = {
    showElementError: true,
    removeElementError: true,
    validationMessages: {}
};
var globalValidationMessages = {
    required: '该选项不能为空',
    maxlength: '该选项输入值长度不能大于{maxlength}',
    minlength: '该选项输入值长度不能小于{minlength}',
    thyUniqueCheck: '输入值已经存在，请重新输入',
    email: '输入邮件的格式不正确',
    repeat: '两次输入不一致',
    pattern: '该选项输入格式不正确',
    number: '必须输入数字',
    url: '输入URL格式不正确',
    max: '该选项输入值不能大于{max}',
    min: '该选项输入值不能小于{min}'
};
var NgxValidatorLoader = /** @class */ (function () {
    function NgxValidatorLoader(config) {
        this.config = Object.assign({}, defaultValidatorConfig, config);
    }
    NgxValidatorLoader.prototype._getDefaultValidationMessage = function (key) {
        if (this.config.globalValidationMessages &&
            this.config.globalValidationMessages[key]) {
            return this.config.globalValidationMessages[key];
        }
        else {
            return globalValidationMessages[key];
        }
    };
    Object.defineProperty(NgxValidatorLoader.prototype, "validationMessages", {
        get: function () {
            return this.config.validationMessages;
        },
        enumerable: true,
        configurable: true
    });
    NgxValidatorLoader.prototype.getErrorMessage = function (name, key) {
        if (this.validationMessages[name] &&
            this.validationMessages[name][key]) {
            return this.validationMessages[name][key];
        }
        else {
            return this._getDefaultValidationMessage(key);
        }
    };
    NgxValidatorLoader.prototype.getErrorMessages = function (name, validationErrors) {
        var messages = [];
        for (var validationError in validationErrors) {
            if (validationErrors.hasOwnProperty(validationError)) {
                messages.push(this.getErrorMessage(name, validationError));
            }
        }
        return messages;
    };
    NgxValidatorLoader.prototype.defaultShowError = function (element, errorMessages) {
        if (element && element.parentElement) {
            var documentFrag = document.createDocumentFragment();
            var divNode = document.createElement('DIV');
            var textNode = document.createTextNode(errorMessages[0]);
            divNode.appendChild(textNode);
            divNode.setAttribute('class', INVALID_FEEDBACK_CLASS);
            documentFrag.appendChild(divNode);
            element.parentElement.append(documentFrag);
        }
    };
    NgxValidatorLoader.prototype.defaultRemoveError = function (element) {
        if (element && element.parentElement) {
            var invalidFeedback = element.parentElement.querySelector('.invalid-feedback');
            element.parentElement.removeChild(invalidFeedback);
        }
    };
    NgxValidatorLoader.prototype.removeError = function (element) {
        element.classList.remove(INVALID_CLASS);
        if (_helpers__WEBPACK_IMPORTED_MODULE_2__["isFunction"](this.config.removeElementError)) {
            this.config.showElementError(element);
        }
        else if (this.config.showElementError) {
            this.defaultRemoveError(element);
        }
        else {
            // do nothings
        }
    };
    NgxValidatorLoader.prototype.showError = function (element, errorMessages) {
        element.classList.add(INVALID_CLASS);
        if (_helpers__WEBPACK_IMPORTED_MODULE_2__["isFunction"](this.config.showElementError)) {
            this.config.showElementError(element, errorMessages);
        }
        else if (this.config.showElementError) {
            this.defaultShowError(element, errorMessages);
        }
        else {
            // do nothings
        }
    };
    NgxValidatorLoader.prototype.addValidationMessages = function (messages) {
        Object.assign(this.config.validationMessages, messages);
    };
    NgxValidatorLoader.prototype.setGlobalValidationMessages = function (validationMessages) {
        this.config.globalValidationMessages = validationMessages;
    };
    NgxValidatorLoader = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"])()),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_validator_class__WEBPACK_IMPORTED_MODULE_1__["NGX_VALIDATOR_CONFIG"])),
        __metadata("design:paramtypes", [Object])
    ], NgxValidatorLoader);
    return NgxValidatorLoader;
}());



/***/ }),

/***/ "./packages/core/src/validator.class.ts":
/*!**********************************************!*\
  !*** ./packages/core/src/validator.class.ts ***!
  \**********************************************/
/*! exports provided: NGX_VALIDATOR_CONFIG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NGX_VALIDATOR_CONFIG", function() { return NGX_VALIDATOR_CONFIG; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var NGX_VALIDATOR_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('NGX_VALIDATION_CONFIG');


/***/ }),

/***/ "./packages/core/src/validator.service.ts":
/*!************************************************!*\
  !*** ./packages/core/src/validator.service.ts ***!
  \************************************************/
/*! exports provided: NgxFormValidatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxFormValidatorService", function() { return NgxFormValidatorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _validator_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validator-loader.service */ "./packages/core/src/validator-loader.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NgxFormValidatorService = /** @class */ (function () {
    function NgxFormValidatorService(thyFormValidateLoader) {
        this.thyFormValidateLoader = thyFormValidateLoader;
        // public errors: string[];
        // 记录所有元素的验证信息
        this.validations = {};
    }
    NgxFormValidatorService.prototype._getElement = function (name) {
        var element = this._formElement[name];
        if (element) {
            return element;
        }
        else {
            return this._formElement.querySelector("[name='" + name + "']");
        }
    };
    NgxFormValidatorService.prototype._clearElementError = function (name) {
        if (this.validations[name] && this.validations[name].hasError) {
            this.validations[name].hasError = false;
            this.validations[name].errorMessages = [];
            this.thyFormValidateLoader.removeError(this._getElement(name));
        }
    };
    NgxFormValidatorService.prototype._tryGetValidation = function (name) {
        if (!this.validations[name]) {
            this._initializeFormControlValidation(name, this._ngForm.controls[name]);
        }
        return this.validations[name];
    };
    NgxFormValidatorService.prototype._initializeFormControlValidation = function (name, control) {
        var _this = this;
        this.validations[name] = {
            hasError: false,
            errorMessages: []
        };
        control.valueChanges.subscribe(function () {
            _this._clearElementError(name);
        });
    };
    NgxFormValidatorService.prototype._restFormControlValidation = function (name) {
        var validation = this.validations[name];
        if (validation) {
            validation.hasError = false;
            validation.errorMessages = [];
        }
    };
    NgxFormValidatorService.prototype._getValidationMessage = function (name, validationError) {
        if (this._config &&
            this._config.validationMessages &&
            this._config.validationMessages[name] &&
            this._config.validationMessages[name][validationError]) {
            return this._config.validationMessages[name][validationError];
        }
        return this.thyFormValidateLoader.getErrorMessage(name, validationError);
    };
    NgxFormValidatorService.prototype._getValidationMessages = function (name, validationErrors) {
        var messages = [];
        for (var validationError in validationErrors) {
            if (validationErrors.hasOwnProperty(validationError)) {
                messages.push(this._getValidationMessage(name, validationError));
            }
        }
        return messages;
    };
    NgxFormValidatorService.prototype._setControlValidationError = function (name, errorMessages) {
        var validation = this._tryGetValidation(name);
        validation.errorMessages = errorMessages;
        validation.hasError = true;
        this.thyFormValidateLoader.showError(this._getElement(name), errorMessages);
    };
    NgxFormValidatorService.prototype.initialize = function (ngForm, formElement) {
        this._ngForm = ngForm;
        this._formElement = formElement;
    };
    NgxFormValidatorService.prototype.setValidatorConfig = function (config) {
        this._config = config;
    };
    NgxFormValidatorService.prototype.validateControl = function (name) {
        this._clearElementError(name);
        var control = this._ngForm.controls[name];
        if (control && control.invalid) {
            var errorMessages = this._getValidationMessages(name, control.errors);
            this._setControlValidationError(name, errorMessages);
        }
    };
    NgxFormValidatorService.prototype.validateControls = function () {
        var _this = this;
        // 主要是 无法检测到 ngForm 的 controls 的变化，或者是我没有找到
        // 验证的时候循环 ngForm 的 controls 验证
        // 发现没有 validation 初始化一个，已经存在不会重新初始化，保存缓存数据
        for (var name_1 in this._ngForm.controls) {
            if (this._ngForm.controls.hasOwnProperty(name_1)) {
                this._tryGetValidation(name_1);
                this.validateControl(name_1);
            }
        }
        // 移除已经不存在的 validation
        var names = Object.keys(this.validations);
        names.forEach(function (name) {
            if (!_this._ngForm.controls[name]) {
                delete _this.validations[name];
            }
        });
    };
    NgxFormValidatorService.prototype.validate = function ($event) {
        this._ngForm.onSubmit($event);
        this.validateControls();
        return this._ngForm.valid;
    };
    NgxFormValidatorService.prototype.reset = function () {
        this._ngForm.reset();
        for (var name_2 in this.validations) {
            if (this.validations.hasOwnProperty(name_2)) {
                this._restFormControlValidation(name_2);
                this._clearElementError(name_2);
            }
        }
    };
    NgxFormValidatorService.prototype.setElementErrorMessage = function (name, message) {
        this._clearElementError(name);
        this._setControlValidationError(name, [message]);
    };
    NgxFormValidatorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_validator_loader_service__WEBPACK_IMPORTED_MODULE_1__["NgxValidatorLoader"]])
    ], NgxFormValidatorService);
    return NgxFormValidatorService;
}());



/***/ }),

/***/ "./packages/integration/src/$$_lazy_route_resource lazy recursive":
/*!*******************************************************************************!*\
  !*** ./packages/integration/src/$$_lazy_route_resource lazy namespace object ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./packages/integration/src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./packages/integration/src/app/app.component.html":
/*!*********************************************************!*\
  !*** ./packages/integration/src/app/app.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"example-container\">\n    <h2 class=\"title\">@why520crazy/ngx-validator Example</h2>\n    <div class=\"row\">\n        <div class=\"col-sm col-sm-6\">\n            <form\n                name=\"exampleForm\"\n                novalidate\n                ngx-form-validator\n                [ngxFormValidatorConfig]=\"validatorConfig\"\n            >\n                <div class=\"form-group\">\n                    <label for=\"email1\">Email address</label>\n                    <input\n                        type=\"email\"\n                        class=\"form-control\"\n                        name=\"email\"\n                        id=\"email1\"\n                        [(ngModel)]=\"model.email\"\n                        required\n                        aria-describedby=\"emailHelp\"\n                        placeholder=\"Enter email\"\n                    />\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"username\">Username</label>\n                    <input\n                        type=\"text\"\n                        class=\"form-control\"\n                        id=\"username\"\n                        required\n                        pattern=\"^[A-Za-z]{1}[0-9A-Za-z_]{1,19}\"\n                        name=\"username\"\n                        [(ngModel)]=\"model.username\"\n                        placeholder=\"Enter username\"\n                    />\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"exampleInputPassword1\">Password</label>\n                    <input\n                        type=\"password\"\n                        class=\"form-control\"\n                        [(ngModel)]=\"model.password\"\n                        name=\"password\"\n                        required\n                        id=\"exampleInputPassword1\"\n                        placeholder=\"Password\"\n                    />\n                </div>\n                <div class=\"form-group\" *ngIf=\"message\">\n                    <div class=\"alert alert-success\">{{ message }}</div>\n                </div>\n                <button\n                    type=\"button\"\n                    (ngxFormSubmit)=\"submit()\"\n                    class=\"btn btn-primary\"\n                >\n                    Submit\n                </button>\n            </form>\n        </div>\n        <div class=\"col-sm col-sm-6\">\n            <pre><code [highlight]=\"exampleCode\"></code></pre>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./packages/integration/src/app/app.component.scss":
/*!*********************************************************!*\
  !*** ./packages/integration/src/app/app.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-container {\n  margin: 30px 60px; }\n  .example-container .title {\n    text-align: center;\n    margin-bottom: 30px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9oYWlmZW5nL0lULzAxX1N0dWR5L3Byb2plY3RzL25neC12YWxpZGF0b3IvcGFja2FnZXMvaW50ZWdyYXRpb24vc3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7RUFDSSxrQkFBaUIsRUFLcEI7RUFORDtJQUdRLG1CQUFrQjtJQUNsQixvQkFBbUIsRUFDdEIiLCJmaWxlIjoicGFja2FnZXMvaW50ZWdyYXRpb24vc3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAuZXhhbXBsZS1jYXJkIHtcbi8vICAgd2lkdGg6IDYwMHB4O1xuLy8gICBoZWlnaHQ6IDgwMHB4O1xuLy8gfVxuXG4uZXhhbXBsZS1jb250YWluZXIge1xuICAgIG1hcmdpbjogMzBweCA2MHB4O1xuICAgIC50aXRsZSB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcbiAgICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./packages/integration/src/app/app.component.ts":
/*!*******************************************************!*\
  !*** ./packages/integration/src/app/app.component.ts ***!
  \*******************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _example_code__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./example-code */ "./packages/integration/src/app/example-code.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.message = '';
        this.exampleCode = _example_code__WEBPACK_IMPORTED_MODULE_1__["exampleCode"];
        this.model = {
            username: '',
            email: '',
            password: ''
        };
        this.validatorConfig = {
            validationMessages: {
                username: {
                    required: '用户名不能为空',
                    pattern: '用户名格式不正确，以字母，数字，下划线组成，首字母不能位数字，必须是2-20个字符'
                }
            }
        };
    }
    AppComponent.prototype.setMessage = function (message) {
        this.message = message;
    };
    AppComponent.prototype.submit = function () {
        this.setMessage('This form has submit');
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./packages/integration/src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./packages/integration/src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./packages/integration/src/app/app.module.ts":
/*!****************************************************!*\
  !*** ./packages/integration/src/app/app.module.ts ***!
  \****************************************************/
/*! exports provided: hljsLanguages, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hljsLanguages", function() { return hljsLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _core_src_public_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/src/public_api */ "./packages/core/src/public_api.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./packages/integration/src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_highlightjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-highlightjs */ "./node_modules/ngx-highlightjs/fesm5/ngx-highlightjs.js");
/* harmony import */ var highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! highlight.js/lib/languages/xml */ "./node_modules/highlight.js/lib/languages/xml.js");
/* harmony import */ var highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var highlight_js_lib_languages_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! highlight.js/lib/languages/scss */ "./node_modules/highlight.js/lib/languages/scss.js");
/* harmony import */ var highlight_js_lib_languages_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(highlight_js_lib_languages_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! highlight.js/lib/languages/typescript */ "./node_modules/highlight.js/lib/languages/typescript.js");
/* harmony import */ var highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_8__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









function hljsLanguages() {
    return [
        { name: 'typescript', func: highlight_js_lib_languages_typescript__WEBPACK_IMPORTED_MODULE_8___default.a },
        { name: 'scss', func: highlight_js_lib_languages_scss__WEBPACK_IMPORTED_MODULE_7___default.a },
        { name: 'xml', func: highlight_js_lib_languages_xml__WEBPACK_IMPORTED_MODULE_6___default.a }
    ];
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _core_src_public_api__WEBPACK_IMPORTED_MODULE_2__["NgxValidatorModule"],
                ngx_highlightjs__WEBPACK_IMPORTED_MODULE_5__["HighlightModule"].forRoot({
                    languages: hljsLanguages
                })
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./packages/integration/src/app/example-code.ts":
/*!******************************************************!*\
  !*** ./packages/integration/src/app/example-code.ts ***!
  \******************************************************/
/*! exports provided: exampleCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exampleCode", function() { return exampleCode; });
var exampleCode = "\n@Component({\n    selector: 'app-example',\n    template: `\n<form name=\"exampleForm\" novalidate ngx-form-validator [ngxFormValidatorConfig]=\"validatorConfig\">\n   <div class=\"form-group\">\n       <label for=\"email1\">Email address</label>\n        <input type=\"email\" class=\"form-control\" name=\"email\" id=\"email1\"\n                [(ngModel)]=\"model.email\" required placeholder=\"Enter email\" />\n    </div>\n    <button type=\"button\" (ngxFormSubmit)=\"submit()\" class=\"btn btn-primary\">Submit</button>\n <form>\n    `\n})\nexport class AppExampleComponent {\n\n    model = {\n        username: '',\n        email: '',\n        password: ''\n    };\n\n    validatorConfig: NgxFormValidatorConfig = {\n        validationMessages: {\n            username: {\n                required: '\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A',\n                pattern:\n                    '\u7528\u6237\u540D\u683C\u5F0F\u4E0D\u6B63\u786E\uFF0C\u4EE5\u5B57\u6BCD\uFF0C\u6570\u5B57\uFF0C\u4E0B\u5212\u7EBF\u7EC4\u6210\uFF0C\u9996\u5B57\u6BCD\u4E0D\u80FD\u4F4D\u6570\u5B57\uFF0C\u5FC5\u987B\u662F2-20\u4E2A\u5B57\u7B26'\n            }\n        }\n    };\n\n    submit() {\n        console('This form has submit');\n    }\n}\n";


/***/ }),

/***/ "./packages/integration/src/environments/environment.ts":
/*!**************************************************************!*\
  !*** ./packages/integration/src/environments/environment.ts ***!
  \**************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./packages/integration/src/main.ts":
/*!******************************************!*\
  !*** ./packages/integration/src/main.ts ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./packages/integration/src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./packages/integration/src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!************************************************!*\
  !*** multi ./packages/integration/src/main.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/haifeng/IT/01_Study/projects/ngx-validator/packages/integration/src/main.ts */"./packages/integration/src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
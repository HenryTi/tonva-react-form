var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, computed } from 'mobx';
export class ControlBase {
    constructor(formView) {
        this.formView = formView;
    }
    get hasError() { return false; }
    get filled() { return false; }
    readValues(values) { }
    setError(fieldName, error) { }
    setInitValues(values) { }
    isOk() { this.validate(); return !this.hasError; }
    validate() { }
}
export class Control extends ControlBase {
    constructor(formView, field, face) {
        super(formView);
        this.field = field;
        this.face = face;
        this.init();
        this.setProps();
    }
    ref(element) {
        this.element = element;
    }
    init() {
        this.rules = [];
        let r = this.field.rules;
        if (r !== undefined) {
            if (Array.isArray(r) === true)
                this.rules.push(...r);
            else
                this.rules.push(r);
        }
    }
    ;
    setProps() {
        return this.props = {
            ref: this.ref.bind(this),
            name: this.field.name,
        };
    }
    ;
    get hasError() { return this.error !== undefined; }
    get filled() {
        let ret = this.value !== undefined && this.value !== this.field.defaultValue;
        return ret;
    }
    readValues(values) {
        values[this.field.name] = this.value;
    }
    setError(fieldName, error) { }
    setInitValues(values) { }
    getValueFromElement() { }
    validate() {
        try {
            let v = this.getValueFromElement();
            if (this.rules.length > 0) {
                let isOk;
                for (let rule of this.rules) {
                    let err = rule(v);
                    if (err === true) {
                        isOk = true;
                    }
                    else if (err !== undefined) {
                        this.error = err;
                        return;
                    }
                }
                this.isOK = isOk;
            }
            this.value = v;
        }
        catch (e) {
            this.error = e.message;
        }
    }
}
__decorate([
    observable
], Control.prototype, "isOK", void 0);
__decorate([
    observable
], Control.prototype, "error", void 0);
__decorate([
    observable
], Control.prototype, "value", void 0);
__decorate([
    computed
], Control.prototype, "hasError", null);
__decorate([
    computed
], Control.prototype, "filled", null);
//# sourceMappingURL=control.js.map
import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import { Control } from './control';
const TxtRequired = '必须填入要求内容';
export class CharsControl extends Control {
    init() {
        super.init();
        if (this.field.required === true) {
            this.rules.push((v) => {
                if (v === undefined)
                    return TxtRequired;
                return true;
            });
        }
    }
    getValueFromElement() { return this.parseValue(this.element.value); }
    setProps() {
        super.setProps();
        _.assign(this.props, {
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this),
        });
        let face = this.face;
        if (face !== undefined) {
            _.assign(this.props, {
                placeholder: face.placeholder,
            });
        }
        return this.props;
    }
    ;
    parseValue(value) { return value; }
    onBlur() {
        this.validate();
    }
    onFocus() {
        this.error = undefined;
        this.formView.clearErrors();
    }
    className() {
        return classNames({
            "form-control": true,
            "has-success": this.isOK === true,
            "is-invalid": this.error !== undefined,
            "is-valid": this.error === undefined && this.isOK === true,
        });
    }
    renderInput() {
        return React.createElement("input", Object.assign({ className: this.className() }, this.props));
    }
    renderError() {
        if (this.error === undefined)
            return null;
        return React.createElement("div", { className: "invalid-feedback" }, this.error);
    }
    setError(fieldName, error) {
        if (this.field.name === fieldName)
            this.error = error;
    }
    setInitValues(values) {
        let v = values[this.field.name];
        if (v === undefined)
            return;
        this.element.value = v;
        this.value = v;
    }
    renderControl() {
        return React.createElement(React.Fragment, null,
            this.renderInput(),
            this.renderError());
    }
}
//# sourceMappingURL=charsControl.js.map
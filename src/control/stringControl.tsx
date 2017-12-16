import * as React from 'react';
import * as _ from 'lodash';
import {CharsControl} from './charsControl';
import {StringField} from '../field';

export class StringControl extends CharsControl {
    protected field: StringField;
    protected setProps() {
        let p = super.setProps();
        _.assign(p, {
            type: 'text',
            maxLength: this.field.maxLength,
        });
        return p;
    };
}

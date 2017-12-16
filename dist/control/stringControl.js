import * as _ from 'lodash';
import { CharsControl } from './charsControl';
export class StringControl extends CharsControl {
    setProps() {
        let p = super.setProps();
        _.assign(p, {
            type: 'text',
            maxLength: this.field.maxLength,
        });
        return p;
    }
    ;
    parseValue(value) {
        if (value === undefined)
            return undefined;
        if (value.trim().length === 0)
            return undefined;
        return value;
    }
}
//# sourceMappingURL=stringControl.js.map
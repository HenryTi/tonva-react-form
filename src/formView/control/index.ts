export * from './control';
export * from './buttonsControl';
export * from './stringControl';
export * from './numberControl';

import {Field} from '../field';
import {Face} from '../face';
import {Control, ControlBase} from './control';
import {ButtonsControl} from './buttonsControl';
import {CheckControl} from './checkControl';
import {RadioControl} from './radioControl';
import {TextAreaControl} from './textAreaControl';
import {SelectControl} from './selectControl';
import {UnknownControl, EmptyControl} from './unknownControl';
import {StringControl} from './stringControl';
import {NumberControl} from './numberControl';

import {FormView, FormRow, GroupRow, FieldRow, LabelFormRow} from '../formView';
import { PickIdControl } from './pickIdControl';

export type CreateControl = (form:FormView, row: FormRow) => ControlBase

export const createControl:CreateControl = (form:FormView, row: LabelFormRow):ControlBase => {
    let label = row.label;
    if ((<GroupRow>row).group !== undefined)
        return createGroupControl(form, label, row as GroupRow);
    if ((<FieldRow>row).field !== undefined)
        return createFieldControl(form, label, row as FieldRow);
    return new EmptyControl(form, row.help);
}

const controls:{[type:string]: new (formView:FormView, field:Field, face:Face) => Control} = {
    "string": StringControl,
    "number": NumberControl,
    "checkbox": CheckControl,
    "radiobox": RadioControl,
    "select": SelectControl,
    "pick-id": PickIdControl,
    "textarea": TextAreaControl,
};
const defaultFaces:{[type:string]: Face} = {
    "string": {type:'string'},
    "number": {type:'number'},
    "int": {type:'number'},
    "dec": {type:'number'},
    "bool": {type:'checkbox'},
}
function createFieldControl(form:FormView, label:string, fieldRow: FieldRow):Control {
    let {field, face} = fieldRow;
    if (face === undefined) {
        face = defaultFaces[field.type];
        if (face === undefined) return new UnknownControl(form, field, face);
    }
    let control = controls[face.type] || UnknownControl;
    return new control(form, field, face);
}

function createGroupControl(form:FormView, label:string, groupRow: GroupRow):Control {
    return new UnknownControl(form, groupRow as any, undefined);
}

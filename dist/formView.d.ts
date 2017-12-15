/// <reference types="react" />
import { FormEvent } from 'react';
import { Rule } from './rule';
import { Field } from './field';
import { Face } from './face';
import { CreateControl } from './control';
import { CreateRow } from './rowContainer';
export interface FieldView {
    field: Field;
    face?: Face;
}
export interface LabeledRow {
    key?: number | string;
    label?: string;
    createRow?: CreateRow;
    createControl?: CreateControl;
}
export interface FieldRow extends LabeledRow, FieldView {
}
export interface GroupRow extends LabeledRow {
    group: FieldView[];
}
export declare type FormRow = FieldRow | GroupRow | LabeledRow;
export interface SubmitResult {
    success: boolean;
    message?: string;
    result?: any;
}
export interface FormProps {
    formRows: FormRow[];
    rules?: Rule | Rule[];
    onSumit: (values: any) => Promise<SubmitResult | undefined>;
    submitButton?: string | JSX.Element;
    clearButton?: string | boolean;
    resetButton?: string | boolean;
    createRow?: CreateRow;
    createControl?: CreateControl;
}
export declare class FormView {
    private initValues;
    private rows;
    private buttonsRow;
    props: FormProps;
    createControl?: CreateControl;
    constructor(props: FormProps, initValues?: any);
    readonly hasError: boolean;
    readonly nothing: boolean;
    readValues(): any;
    clearErrors(): void;
    setError(fieldName: string, error: string): void;
    setInitValues(): void;
    private buildRows(props);
    private buildRow(formRow, formRowCreator);
    private createButtons(form, row);
    render(): JSX.Element;
    row(key: number | string): JSX.Element;
    others(): JSX.Element[];
    buttons(): JSX.Element;
    onSubmit(event: FormEvent<HTMLFormElement>): Promise<void>;
}

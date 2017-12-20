/// <reference types="react" />
import * as React from 'react';
export interface MediaProps {
    icon: string | JSX.Element;
    main: string | JSX.Element;
    discription?: string | JSX.Element;
    px?: number;
    py?: number;
}
export declare class Media extends React.Component<MediaProps> {
    render(): JSX.Element;
}

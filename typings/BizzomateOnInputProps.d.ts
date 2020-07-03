/**
 * This file was generated from BizzomateOnInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type OnInputReadOnlyEnum = "control" | "text";

export interface BizzomateOnInputContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    onInputPlaceholder?: DynamicValue<string>;
    onInputAttribute: EditableValue<string>;
    onInputReadOnly: OnInputReadOnlyEnum;
    onInputAction?: ActionValue;
    onInputDelay: number;
    onInputFocus: boolean;
}

export interface BizzomateOnInputPreviewProps {
    class: string;
    style: string;
    onInputPlaceholder: string;
    onInputAttribute: string;
    onInputReadOnly: OnInputReadOnlyEnum;
    onInputAction: {} | null;
    onInputDelay: number | null;
    onInputFocus: boolean;
}

/**
 * This file was generated from BizzomateOnInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ObjectItem } from "mendix";

export type OnInputReadOnlyEnum = "control" | "text";

export interface BizzomateOnInputContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    onInputPlaceholder?: DynamicValue<string>;
    onInputListItemContent?: (item: ObjectItem) => ReactNode;
    onInputEmptyMessage?: DynamicValue<string>;
    onInputAttribute: EditableValue<string>;
    onInputListDataSource?: ListValue;
    onInputReadOnly: OnInputReadOnlyEnum;
    onInputAction?: ActionValue;
    onInputDelay: number;
    onInputFocus: boolean;
}

export interface BizzomateOnInputPreviewProps {
    class: string;
    style: string;
    onInputPlaceholder: string;
    onInputListItemContent: { widgetCount: number; renderer: ComponentType };
    onInputEmptyMessage: string;
    onInputAttribute: string;
    onInputListDataSource: {} | null;
    onInputReadOnly: OnInputReadOnlyEnum;
    onInputAction: {} | null;
    onInputDelay: number | null;
    onInputFocus: boolean;
}

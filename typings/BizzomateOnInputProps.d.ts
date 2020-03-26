/**
 * This file was generated from BizzomateOnInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface BizzomateOnInputContainerProps extends CommonProps {
    onInputPlaceholder?: DynamicValue<string>;
    onInputAttribute: EditableValue<string>;
    onInputAction?: ActionValue;
    onInputDelay: number;
    onInputFocus: boolean;
}

export interface BizzomateOnInputPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    onInputPlaceholder?: string;
    onInputAttribute: string;
    onInputAction: ActionPreview;
    onInputDelay: number;
    onInputFocus: boolean;
}

export interface VisibilityMap {
    onInputPlaceholder: boolean;
    onInputAttribute: boolean;
    onInputAction: boolean;
    onInputDelay: boolean;
    onInputFocus: boolean;
}

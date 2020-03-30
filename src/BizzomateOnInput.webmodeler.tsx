import { Component, ReactNode, createElement } from "react";
import { BizzomateOnInputPreviewProps } from "../typings/BizzomateOnInputProps";

import { TextInput } from "./components/TextInput";

declare function require(name: string): string;

export class preview extends Component<BizzomateOnInputPreviewProps> {
    render(): ReactNode {
        const value = this.props.onInputAttribute || "";
        return <TextInput
            value={value}
            style={this.props.styleObject}
            className={this.props.class}
            placeholder={this.props.onInputPlaceholder}
        />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/BizzomateOnInput.css");
}

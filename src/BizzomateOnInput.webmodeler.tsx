import { Component, ReactNode, createElement } from "react";
import { BizzomateOnInputPreviewProps } from "../typings/BizzomateOnInputProps";

import { TextInput } from "./components/TextInput";

declare function require(name: string): string;

export class preview extends Component<BizzomateOnInputPreviewProps> {
    render(): ReactNode {
        return <TextInput value={this.props.onInputAttribute} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/BizzomateOnInput.css");
}

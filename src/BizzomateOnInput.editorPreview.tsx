import { Component, ReactNode, createElement } from "react";
import { BizzomateOnInputPreviewProps } from "../typings/BizzomateOnInputProps";

import { TextInput } from "./components/TextInput";

declare function require(name: string): string;

export class preview extends Component<BizzomateOnInputPreviewProps> {
    render(): ReactNode {
        const value = this.props.onInputAttribute || "";
        return <TextInput
            value={value}
            style= {this.parseStyle(this.props.style)}
            className={this.props.class}
            placeholder={this.props.onInputPlaceholder}
        />;
    }

    private parseStyle(style = ""): { [key: string]: string } {
        try {
            return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
                const pair = line.split(":");
                if (pair.length === 2) {
                    const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                    styleObject[name] = pair[1].trim();
                }
            return styleObject;
            }, {});
        } catch (_) {
            return {};
        }
    }
}

export function getPreviewCss(): string {
    return require("./ui/BizzomateOnInput.css");
}

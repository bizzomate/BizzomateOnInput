import { Component, ReactNode, createElement, CSSProperties, ChangeEvent, FocusEvent } from "react";
import classNames from 'classnames';

export interface InputProps {
    id?: string;
    value: string;
    placeholder?: string;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    onUpdate?: (value: string) => void;
    onFocus?: (value: string) => void;
    disabled?: "no" | "control" | "text";
    hasError?: boolean;
}

export class TextInput extends Component<InputProps> {
    private readonly onChangeHandle = this.onChange.bind(this);
    private readonly onFocusHandle = this.onFocus.bind(this);
    render(): ReactNode {
        const className = classNames("form-control", this.props.className);
        //const describedBy = `${this.props.id}-label` + (this.props.hasError ? ` ${this.props.id}-error` : "");
        if (this.props.disabled == "text") {
            if (this.props.value) {
                return <div className="form-control-static">{this.props.value}</div>;
            } else {
                return <div className="form-control-static">&nbsp;</div>
            }
        } else {
            return <input
                id={this.props.id}
                type="text"
                placeholder={this.props.placeholder}
                className={className}
                style={this.props.style}
                value={this.props.value}
                tabIndex={this.props.tabIndex}
                onFocus={this.onFocusHandle}
                onChange={this.onChangeHandle}
                disabled={this.props.disabled == "control"}
                aria-invalid={this.props.hasError}
                //aria-describedby={describedBy}
            />;
        }

    }
    private onChange(event: ChangeEvent<HTMLInputElement>): void {
        if (this.props.onUpdate) {
            this.props.onUpdate(event.target.value);
        }
    }
    private onFocus(event: FocusEvent<HTMLInputElement>): void {
        if (this.props.onFocus) {
            this.props.onFocus(event.target.value);
        }
    }
}

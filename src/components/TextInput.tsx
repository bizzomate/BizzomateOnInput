import { Component, ReactNode, createElement, CSSProperties, ChangeEvent } from "react";
import classNames from 'classnames';

export interface InputProps {
    id?: string;
    value: string;
    className?: string;
    style?: CSSProperties;
    tabIndex: number;
    onUpdate?: (value: string) => void;
    disabled?: boolean;
    hasError?: boolean;
}

export class TextInput extends Component<InputProps> {
    private readonly onChangeHandle = this.onChange.bind(this);
    render(): ReactNode {
        const className = classNames("form-control", this.props.className);
        //const describedBy = `${this.props.id}-label` + (this.props.hasError ? ` ${this.props.id}-error` : "");
        return <input
            id={this.props.id}
            type="text"
            className={className}
            style={this.props.style}
            value={this.props.value}
            tabIndex={this.props.tabIndex}
            onChange={this.onChangeHandle}
            disabled={this.props.disabled}
            aria-invalid={this.props.hasError}
            //aria-describedby={describedBy}
        />;
    }
    private onChange(event: ChangeEvent<HTMLInputElement>): void {
        if (this.props.onUpdate) {
            this.props.onUpdate(event.target.value);
        }
    }
}

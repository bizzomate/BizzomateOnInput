import { Component, ReactNode, Fragment, createElement } from "react";
import { Alert } from "./components/Alert";
import { hot } from "react-hot-loader/root";

import { BizzomateOnInputContainerProps } from "../typings/BizzomateOnInputProps";
import { TextInput } from "./components/TextInput";

import "./ui/BizzomateOnInput.css";

class BizzomateOnInput extends Component<BizzomateOnInputContainerProps> {
    private readonly onUpdateHandle = this.onUpdate.bind(this);
    private readonly callActionHandle = this.callAction.bind(this);
    private callActionTimeOut!: number;
    private waitingForExecution!: boolean;
    componentWillUnmount() {
        clearTimeout(this.callActionTimeOut);
    }
    componentDidUpdate() {
        if (this.waitingForExecution && !this.props.onInputAction?.isExecuting) {
            this.callActionHandle();
        }
    }
    render(): ReactNode {
        const value = this.props.onInputAttribute.value || "";
        const placeholder = this.props.onInputPlaceholder?.value || "";
        const onFocusHandler = this.props.onInputFocus ? this.callActionHandle : undefined;
        const validationFeedback = this.props.onInputAttribute.validation;
        const disabled = !this.props.onInputAttribute.readOnly ? "no" : this.props.onInputReadOnly == "text" ? "text" : "control";
        return <Fragment>
                <TextInput
                    value={value}
                    style={this.props.style}
                    placeholder={placeholder}
                    className={this.props.class}
                    tabIndex={this.props.tabIndex}
                    onUpdate={this.onUpdateHandle}
                    onFocus={onFocusHandler}
                    disabled={disabled}
                    hasError={!!validationFeedback}
                />
            <Alert>{validationFeedback}</Alert>
        </Fragment>;
    }
    private onUpdate(value: string): void {
        this.props.onInputAttribute.setValue(value);
        clearTimeout(this.callActionTimeOut);
        this.callActionTimeOut = setTimeout(this.callActionHandle, this.props.onInputDelay);
    }
    private callAction(): void {
        if (!this.props.onInputAttribute.readOnly && this.props.onInputAction?.canExecute) {
            if (!this.props.onInputAction.isExecuting){
                this.waitingForExecution = false;
                this.props.onInputAction.execute();
            } else {
                this.waitingForExecution = true;
            }
        }
    }
}

export default hot(BizzomateOnInput);

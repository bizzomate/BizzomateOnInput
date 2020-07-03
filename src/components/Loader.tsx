import { Component, ReactNode, createElement } from "react";

export interface LoaderProps {
    show?: boolean;
}

export class Loader extends Component<LoaderProps> {
    render(): ReactNode {
        return <div
            className="bizzomateOnInput-loadingContainer">
            {this.props.show &&
                <div className="dot-flashing"></div>}
        </div>
    }
}

import { Component, ReactNode, createElement } from "react";

export interface ListItemProps {
    index: number;
    children : ReactNode;
}

export class ListItem extends Component<ListItemProps> {
    render(): ReactNode {
        const className = 'mx-name-index-' + this.props.index;
        return (
            <li
                className={className}
                tabIndex={-1}>
                <div className='mx-dataview'>
                    <div className='mx-dataview-content'>{this.props.children}</div>
                </div>
            </li>);
    }
}

import { Component, ReactNode, createElement, CSSProperties } from "react";
import { ListValue, ObjectItem } from "mendix";
import { ListItem } from './ListItem';
import classNames from 'classnames'

export interface ListDataSourceProps {
    listData: ListValue;
    listItemContent: (item: ObjectItem) => ReactNode;
    emptyMessage?: string;
    class?: string;
    style?: CSSProperties;
    show: boolean;
    loading: boolean;
}

export class ListDataSource extends Component<ListDataSourceProps> {
    render(): ReactNode {
        const className = classNames('mx-listview', this.props.class);
        const hasResults = this.props.listData.totalCount && this.props.listData.totalCount ? true : false;
        return (
            <div
                className={className}
                style={this.props.style}>
                {this.props.show &&
                    <ul>
                        {this.props.loading &&
                            <li className="bizzomateOnInput-loadingContainer"><div className="dot-flashing"></div></li>
                        }
                        {!this.props.loading && !hasResults &&
                            <li className="mx-listview-empty"><label>{this.props.emptyMessage}</label></li>
                        }
                        {!this.props.loading && hasResults && this.props.listData.items?.map((item, i) =>
                            <ListItem index={i}>{this.props.listItemContent(item)}</ListItem>)}
                    </ul>
                }
            </div>
        );
    }
}
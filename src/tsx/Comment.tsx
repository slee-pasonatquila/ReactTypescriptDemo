///<reference path="../../typings/tsd.d.ts"/>
import * as React from 'react';
import * as ReactDOM from "react-dom";

export interface Data {
    id: number;
    author: string;
    text: string;
}

interface Props extends React.Props<Comment> {
  author: string;
}

interface State {
}

export class Comment extends React.Component<Props, any> {
    constructor(Props) {
        super(Props);
    }
    render() {
        var rawMarkup = this.props.children ? marked(this.props.children.toString()) : '<em>No Input</em';
        return (
            <tr className="comment">
                <td>{this.props.author}</td>
                <td><span dangerouslySetInnerHTML={{ __html: rawMarkup }}></span></td>
            </tr>
        );
    }
}

///<reference path="../../typings/tsd.d.ts"/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Comment, Data} from "./Comment";

interface CommentListProps extends React.Props<any>{
    data: Data[];
}

export class CommentList extends React.Component<CommentListProps, any>{
    render() {
        var CommentNodes = this.props.data.map((comment:Data)=>{
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td className="col-lg-2">氏　名</td>
                        <td className="col-lg-10">コメント</td>
                    </tr>
                </thead>
                <tbody>
                    {CommentNodes}
                </tbody>
            </table>
        );
    }
}

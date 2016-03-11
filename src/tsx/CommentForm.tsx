///<reference path="../../typings/tsd.d.ts"/>
import * as React from 'react';
import * as ReactDOM from "react-dom";
import {Data} from "./Comment";

interface CommentFormProp extends React.Props<any>{
    onCommentSubmit: (data: Data) => void;
}

export class CommentForm extends React.Component<any, any>{
    private handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        var author = (ReactDOM.findDOMNode(this.refs["author"]) as HTMLInputElement).value.trim();
        var text = (ReactDOM.findDOMNode(this.refs["text"]) as HTMLInputElement).value.trim();

        if (!text || !author) {
            alert('Please input something first.');
            return;
        }

        this.props.onCommentSubmit({ author: author, text: text } as Data);
        (ReactDOM.findDOMNode(this.refs["author"]) as HTMLInputElement).value = "";
        (ReactDOM.findDOMNode(this.refs["text"]) as HTMLInputElement).value = "";
        return;
    }

    render() {
        return(
            <form className="commentForm col-lg-2" onSubmit={this.handleSubmit.bind(this) }>
                <div className="form-group">
                     <label for="author">氏　名</label>
                     <input id="author" className="form-control" type="text" placeholder="氏名を入力してください。" ref="author" />
                </div>
                <div className="form-group">
                     <label for="text">コメント</label>
                     <input id="text" className="form-control" type="text" placeholder="コメントを入力してください。" ref="text" />
                </div>
                <div className="form-group center">
                    <button className="btn btn-sm btn-success"><i className="fa fa-save"/> 追　加</button>
                </div>
            </form>
        );
    }
}

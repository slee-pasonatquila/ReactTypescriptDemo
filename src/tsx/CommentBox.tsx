///<reference path="../../typings/tsd.d.ts"/>
import * as React from 'react';
import * as ReactDOM from "react-dom";
import {CommentList} from "./CommentList";
import {Data} from "./Comment";
import {CommentForm} from "./CommentForm";

interface CommentBoxProps extends React.Props<any>{
    url: string;
    poolInterval: number;
}
interface CommentBoxState {
    data: Data[]
}

export class CommentBox extends React.Component<CommentBoxProps, CommentBoxState> {
    constructor(props: CommentBoxProps) {
        super(props);
        this.state = {data: []};
    }
    private loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false,
            success: (data => this.setState({ data: data } as CommentBoxState)).bind(this),
            error: ((xhr, status, err) => console.error(this.props.url, status, err.toString())).bind(this)
        });
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer.bind(this), this.props.poolInterval);
    }
    private handleCommentSubmit(comment: Data) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments } as CommentBoxState);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data => this.setState({ data: data } as CommentBoxState)).bind(this),
            error: ((xhr, status, err) => {
                this.setState({ data: comments } as CommentBoxState);
                console.error(this.props.url, status, err.toString());
            }).bind(this)
        });
    }
    render() {
        return (
            <div className="commentBox">
              <h1>Comments</h1>
              <CommentList data={this.state.data}/>
              <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
            </div>
        );
    }
}
ReactDOM.render(
  <CommentBox url="/api/comments" poolInterval={2000}/>,
  document.getElementById('content')
);

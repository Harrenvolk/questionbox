import React from 'react';
import CommentForm from './comment_form';
import Comment from './comment';

class Answer extends React.Component {

  constructor(props){
    super(props);
    this.state = { showComments: false };
    this.toggleComments = this.toggleComments.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
  }

  toggleComments(){
    this.setState({
      showComments: !this.state.showComments
    });
  }

  deleteAnswer(){
    if (this.props.answer.author.id === this.props.currentUser.id){
      this.props.deleteAnswer(this.props.answer.id);
    }
  }

  render(){
    if (!this.props.answer){
      return (<h2>Loading</h2>);
    }
    return(
      <li className="answer">
        <div className = "answer-header">
          <img src={this.props.answer.author.avatar_url} width="40" height="40"/>
          <span>{this.props.answer.author.first_name + " " + this.props.answer.author.last_name}</span>
        </div>
        <div className = "answer-body">
          {this.props.answer.content}
        </div>
        <div className = "answer-footer">
          <a onClick={this.toggleComments}>Toggle Comments</a>
        </div>
        {this.state.showComments &&
          <div className = "answer-comments">
          <CommentForm
            question={this.props.question}
            createComment={this.props.createComment}
            commentableType={"Answer"}
            commentableId={this.props.answer.id}
            currentUser={this.props.currentUser}
            />
          <div className="comment-list">
            {this.props.answer.comments &&
              Object.keys(this.props.answer.comments).map(key =>
                <Comment key={key} comment={this.props.answer.comments[key]}
                  question={this.props.question}
                  createComment={this.props.createComment}
                  deleteComment={this.props.deleteComment}
                  commentableType={"Answer"}
                  commentableId={this.props.answer.id}
                  currentUser={this.props.currentUser}/>)}
          </div>
        </div>}
      </li>
    );
  }
}

export default Answer;

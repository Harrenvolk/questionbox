import React from 'react';
import {Link, withRouter} from 'react-router';
import QuestionIndexItem from './question_index_item';
import QueryBar from './query_bar';
import TopicSearchBar from './topic_search_bar';

class QuestionIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {showTopicSearch: false};
    this.toggleTopicSearch = this.toggleTopicSearch.bind(this);
    this.unfollowTopic = this.unfollowTopic.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllQuestions();
  }

  toggleTopicSearch(){
    this.setState({showTopicSearch: !this.state.showTopicSearch});
  }

  unfollowTopic(topic) {
    return e => {
      this.props.removeFollow(topic.id);
    }
  }

  render(){
    const questionIndexItems = this.props.questions.map(question => (
      <QuestionIndexItem key={question.id} question={question}
        updateQuestion={this.props.updateQuestion}/>
    ));
    return (
      <div className="homepage">
        <QueryBar createQuestion={this.props.createQuestion}
          logout={this.props.logout}
          questions={this.props.questions}/>
        <div className="main">
          <div className="left-sidebar-container">
            <div className="left-sidebar">
              <div className="left-sidebar-header">
                <h2>Feeds</h2>
                <a onClick={this.toggleTopicSearch}>
                  {!this.state.showTopicSearch && "Edit"}
                  {this.state.showTopicSearch && "Done"}
                </a>

              </div>
              <ul className="topics-list">
                <li>Top Stories</li>
                {this.props.currentUser &&
                  Object.keys(this.props.currentUser.topics).map(key =>
                  <li key={key}>
                    <Link to={`/topic/${key}`}>{this.props.currentUser.topics[key].name}</Link>
                    {this.state.showTopicSearch &&
                      <div className="unfollow-button" onClick={this.unfollowTopic(this.props.currentUser.topics[key])}>X</div>
                    }
                  </li>
                )}
              </ul>
              {this.state.showTopicSearch && <TopicSearchBar currentUser={this.props.currentUser}
                fetchAllTopics={this.props.fetchAllTopics}
                addFollow={this.props.addFollow}/>}
            </div>
          </div>
          <div className="main-content">
            <div className="main-content-header">
              <h2>Top Stories For You</h2>
            </div>
            <ul className="question-feed">
              {questionIndexItems}
            </ul>
          </div>
          <div className="right-sidebar-container">
            <div className="right-sidebar">
              <div className="right-sidebar-header">
                <h2>Setup Your Account</h2>
              </div>
              <ul className="right-sidebar-tasklist">
                <li>Visit your feed</li>
                <li>Follow 10 more topics</li>
                <li>Find your friends on Quora</li>
                <li>Upvote 5 more good answers</li>
                <li>Ask your first question</li>
                <li>Add info about what you know</li>
                <li>Answer a question</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuestionIndex);

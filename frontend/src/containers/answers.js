import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAnswers } from '../actions/answers'
import Answer from './answer'

import { getQuestions } from '../actions/questions'


class Answers extends Component {

render() {
  var { question } = this.props
  question.answers=[];
  // console.log(this.props);

  // console.log(question["question"] + " this is the question");
  // console.log(question.answers+" is this defined");
return (
  // console
  // console.log(question.answers+" is this defined")
  <div>
      { question ? question.answers.sort(function(a,b) 
        { return (a.count < b.count) ? 1 : ((b.count > a.count) ? -1 : 0)} 
          ).map(answer =>  
            <Answer key={answer.id} answer={answer} questionId={question.id} />
          ) : 
        <p>Loading...</p>
        }
  </div>  
    );
  }    
}


export default connect(null, { getAnswers, getQuestions })(Answers);

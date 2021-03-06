const API_URL='http://localhost:3000';

// Action Creators
const setQuestions = questions => {
  return {
    type: 'GET_QUESTIONS_SUCCESS',
    questions
  }
}

const addQuestion = question => {
  return {
    type: 'CREATE_QUESTION_SUCCESS',
    question
  }
}

const addQuestionData = question => {
  return {
    type: 'CREATE_DATA_SUCCESS',
    question
  }
}

const removeQuestion = questionId => {
  return {
    type: 'DELETE_QUESTION_SUCCESS',
    questionId: questionId
  }
}

// Async Actions
export const getQuestions = () => {
  console.log("Getting question");
  return dispatch => {
    return fetch(`${API_URL}/questions`)
    .then(response => response.json())
    .then(questions => dispatch(setQuestions(questions)))
    .catch(error => console.log(error));
  }
}


// GET /questions/all<br/><br/>
// GET /questions/:id<br/><br/>

export const getQuestion = (questionId) => {
  console.log("getting eac question");
  return dispatch => {
    return fetch(`${API_URL}/questions/${questionId}`)
    .then(response => response.json())
    .then(question => {
      dispatch(addQuestionData(question))

  })
    .catch(error => console.log(error));
  }
}
// POST  /questions/add      BODY {question}<br/><br/>
export const createQuestion = (question, routerHistory) => {
  console.log("posting question")
  // console.log( " bearer token=" + bearer);
  console.log(question);
  // var url = API_URL;
  var bearer = 'Bearer '+sessionStorage.getItem('token');
  console.log(" bearer token=" + bearer);
  return dispatch => {
    return fetch(`${API_URL}/questions/add`, {
      method: 'POST',
      headers: {
        'Authorization':bearer,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question["question"] , topics :[1,2] }),
    })
      .then(response => {
        response.json()
    })
      .then(question => {
        dispatch(addQuestion(question));
        routerHistory.replace(`/questions/${question.id}`)
    })
      .catch(error => console.log(error))
  }
}

export function deleteQuestion(questionId, routerHistory) {
  return (dispatch) => {
    return fetch(`${API_URL}/questions/${questionId}`, {
      method: 'DELETE',
    }).then(res => {
      dispatch(removeQuestion(questionId))
      routerHistory.replace(`/`)
    })
  }
}





        

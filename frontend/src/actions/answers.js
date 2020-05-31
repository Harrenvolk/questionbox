// const API_URL = process.env.REACT_APP_API_URL;
const API_URL='http://192.168.1.7:3000'

// ** Action Creators **
export const setAnswers = (answers, questionId) => {
  return {
    type: 'GET_ANSWERS_SUCCESS',
    answers,
    questionId: questionId 
  };
};

export const addAnswer = (answer, questionId) => {
  return {
    type: 'CREATE_ANSWER_SUCCESS',
    answer,
    questionId: questionId
  };
};

export const updateAnswer = (answer, questionId) => {
  return {
    type: 'UPDATE_ANSWER_SUCCESS',
    answer,
    questionId: questionId
  };
}

// ** Async Actions **
// /question/:q_id
export const createAnswer = (answer, questionId) => {
  var bearer = 'Bearer'+sessionStorage.getItem('token');
  console.log("the berarer token is"+ bearer);
  console.log(answer)
  return dispatch => {
    return fetch(`${API_URL}/answers/question/${questionId}`, {
      method: 'POST',
      withCredentials:true,
      credentials:'include',
      'Access-Control-Allow-Origin':API_URL,
      headers:new Headers( {
        'Access-Control-Allow-Origin':API_URL,
        'Authorization':bearer,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ answer: answer }),
    })
      .then(response => response.json())
      .then(answer => {
        dispatch(addAnswer(answer, questionId));
    })
      .catch(error => console.log(error))
  }
}
// GET /answers/question/:q_id
export const getAnswers = (questionId) => {
  console.log("getting answers");
  return dispatch => {
    return fetch(`${API_URL}/answers/question/${questionId}`)
      .then(response => response.json())
      .then(answers => dispatch(setAnswers(answers, questionId)))
  };
};

export const changeAnswer = (questionId, updatedAnswer) => {
    
    return dispatch => {
        return fetch(`${API_URL}/questions/${questionId}/answers/${updatedAnswer.id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                answer: updatedAnswer
            })
        })
        .then(response => response.json())
        .then(answer => {
            dispatch(updateAnswer(answer, questionId));
        })
    };
};



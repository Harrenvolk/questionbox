export const fetchQuestion = (id) => {
  return $.ajax({
    type: 'GET',
    url: `/api/questions/${id}`
  });
};

export const fetchAllQuestions = () => {
  return $.ajax({
    type: 'GET',
    url: `/api/questions`
  });
};

export const createQuestion = (question) => {
  return $.ajax({
    type: 'POST',
    url: `/api/questions`,
    data: {question}
  });
};

export const updateQuestion = (question) => {
  return $.ajax({
    type: 'PATCH',
    url: `/api/questions/${question.id}`,
    data: {question}
  });
};


export const deleteQuestion = (id) => {
  return $.ajax({
    type: 'DELETE',
    url: `/api/questions/${id}`
  });
};

///////////////Answers//////////////

export const createAnswer = (answer) => {
  return $.ajax({
    type: 'POST',
    url: `/api/answers`,
    data: {answer}
  });
};

export const fetchAnswer = (id) => {
  return $.ajax({
    type: 'GET',
    url: `/api/answers/${id}`,
  });
};

export const deleteAnswer = (id) => {
  return $.ajax({
    type: 'DELETE',
    url: `/api/answers/${id}`
  });
};

///////////////Comments///////////////

export const addComment = (comment) => {
  return $.ajax({
    type: 'POST',
    url: `/api/comments`,
    data: {comment}
  });
};

export const deleteComment = (id) => {
  return $.ajax({
    type: 'DELETE',
    url: `/api/comments/${id}`
  });
};

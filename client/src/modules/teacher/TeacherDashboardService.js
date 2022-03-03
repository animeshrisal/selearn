import {
  authenticatedGetRequestOption,
  authenticatedRequestGenerator,
  handleResponse,
  URL,
} from "../../helpers";

const getClassrooms = () => {
  return fetch(`${URL}/dashboard/classroom/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    })
};

const getClassroom = (id) => {
  return fetch(`${URL}/dashboard/classroom/${id}/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
};

const getLessons = (classroomId) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/lesson`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    })
}


const getLesson = (classroomId, lessonId) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/lesson/${lessonId}`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
}

const getQuizzes = (classroomId) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/quiz/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((quizzes) => {
      return quizzes;
    });
}

const getQuiz = (classroomId, quizId) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/quiz/${quizId}`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
}

const getQuestions = (classroomId, quizId) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/quiz/${quizId}/question/`, authenticatedGetRequestOption())
  .then(handleResponse)
  .then((quiz) => {
    return quiz;
  });
}

const postQuiz = (classroomId, quiz) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/quiz/`, authenticatedRequestGenerator(quiz, "POST"))
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
}

const postQuestion = (classroomId, quiz_id, question) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/quiz/${quiz_id}/question/`, authenticatedRequestGenerator(question, "POST"))
    .then(handleResponse)
    .then((quiz) => {
      return quiz;
    });
}

const postClassroom = (classroom) => {
  return fetch(
    `${URL}/dashboard/classroom/`,
    authenticatedRequestGenerator(classroom, "POST")
  )
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
}

const postLesson = (classroomId, lesson) => {
  return fetch(
    `${URL}/dashboard/classroom/${classroomId}/lesson`,
    authenticatedRequestGenerator(lesson, "POST")
  )
    .then(handleResponse)
    .then((lesson) => {
      return lesson;
    });
}

const updateLesson = (classroomId, lessonId, lesson) => {
  return fetch(
    `${URL}/dashboard/classroom/${classroomId}/lesson/${lessonId}`,
    authenticatedRequestGenerator(lesson, "PUT")
  )
    .then(handleResponse)
    .then((lesson) => {
      return lesson;
    });
}

const updateClassroom = (classroom, classroomId) => {
  return fetch(
    `${URL}/dashboard/classroom/${classroomId}/`,
    authenticatedRequestGenerator(classroom, "PUT")
  )
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    });
}

export const teacherDashboardService = {
  getClassroom,
  getClassrooms,
  getLesson,
  getLessons,
  getQuiz,
  getQuizzes,
  getQuestions,
  postClassroom,
  postLesson,
  postQuiz,
  postQuestion,
  updateClassroom,
  updateLesson,
};

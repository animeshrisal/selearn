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
    });
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
    });
}

const getLesson = (classroomId, lessonId) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/lesson/${lessonId}`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
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


export const dashboardService = {
  getClassrooms,
  getClassroom,
  postClassroom,
  getLessons,
  getLesson
};

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

const getEnrollmentStatus = (id) => {
  return fetch(`${URL}/dashboard/classroom/${id}/enroll`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((enrollment) => {
      return enrollment;
    })
}

const getLessons = (classroomId) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/lesson`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((classroom) => {
      return classroom;
    })
}

const getUserLessons = (classroomId) => {
  return fetch(`${URL}/dashboard/classroom/${classroomId}/user_lesson`, authenticatedGetRequestOption())
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

const createEnrollment = (classroomId)  => {
  return fetch(
    `${URL}/dashboard/classroom/${classroomId}/enroll`,
    authenticatedRequestGenerator({}, "POST")
  )
    .then(handleResponse)
    .then((enrollment) => {
      return enrollment;
    });
}

const completeLesson = (classroomId, lessonId) => {
  return fetch(
    `${URL}/dashboard/classroom/${classroomId}/lesson/${lessonId}/complete`,
    authenticatedRequestGenerator({}, "POST")
  )
    .then(handleResponse)
    .then((enrollment) => {
      return enrollment;
    });
}

export const dashboardService = {
  createEnrollment,
  completeLesson,
  getClassrooms,
  getClassroom,
  getEnrollmentStatus,
  postClassroom,
  getLessons,
  getLesson,
  getUserLessons
};

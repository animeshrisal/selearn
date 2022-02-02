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
    postClassroom
};

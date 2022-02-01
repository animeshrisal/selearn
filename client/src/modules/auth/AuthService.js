import { handleResponse, URL } from "../../helpers";

export const authenticationService = {
  login,
  refreshToken,
  logout,
  register,
  activateUser,
};

function login({ username, password }) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return fetch(`${URL}/auth/jwt/create/`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.access) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function register({ email, username, password, re_password }) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("re_password", re_password);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return fetch(`${URL}/auth/users/`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.access) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function refreshToken() {
  const requestOptions = {
    method: "POST",
  };

  return fetch(`${URL}/auth/jwt/refresh/`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.access) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function activateUser({uid, token}) {
  const formData = new FormData();
  formData.append("uid", uid);
  formData.append("token", token);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  return fetch(`${URL}/auth/users/activation/`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

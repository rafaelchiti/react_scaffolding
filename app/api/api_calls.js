const EMAIL = 'rafael@mail.com';

// Simulate a proper API response with a timeout just for development
// purpose
export function authenticate ({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === EMAIL && password === 'password') {
        resolve(validAuthBody);
      } else {
        reject(invalidAuthBody);
      }
    }, 700);
  });
}

const validAuthBody = {
  apiResponse: {
    token: 'token',
    user: {
      email: EMAIL,
      name: 'Rafael',
      lastName: 'Chiti'
    }
  }
};

const invalidAuthBody = {
  apiError: {
    errorMessage: 'Email or password incorrect'
  }
};

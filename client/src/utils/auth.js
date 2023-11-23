const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{6,}$/;

export function validatePassword(password) {
  if (passwordPattern.test(password)) {
    return true;
  } else {
    return false;
  }
}
export const postData = async ({ firstName, lastName, email, password }) =>
  await fetch("http://localhost:3001/api/users/process-register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
export const isEmailValid = (email) => {
  // Simple email validation using a regular expression
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
};

export const checkPhoneLength = (phone, borderClass) => {
  if (phone.length !== 0) {
    // Check if the input is not empty
    const inputNumber = phone.length;

    if (inputNumber > 10) {
      // Set the border to green if the input value is greater than 10 and less than 15
      if (inputNumber < 15) {
        return (borderClass = "border-2 border-green-500");
      } else {
        return (borderClass = "border-2 border-red-500");
      }
    } else if (inputNumber < 11) {
      // Set the border to red if the input value is less than 11
      return (borderClass = "border-2 border-red-500");
    }
  }
};

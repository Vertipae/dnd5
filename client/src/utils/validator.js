export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value === 0 ||
  (typeof value === "object" && Object.keys(value).length === 0) || // Checking for empty object
  (typeof value === "string" && value.trim().length === 0) // Checking for empty string

export const formatErrors = (errors) => {
  const returnedErrors = {}
  Object.keys(errors).forEach((key) => {
    returnedErrors[key] = errors[key].msg
  })

  return returnedErrors
}
export const validateRegistration = (userData) => {
  let errors = { username: null, password: null }

  if (isEmpty(userData.username)) errors.username = "Username is required"
  if (userData.password.length < 6)
    errors.password = "Please enter a password with 6 or more characters"

  return errors
}

export default { isEmpty, validateRegistration, formatErrors }

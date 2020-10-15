export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value === 0 ||
  (typeof value === "object" && Object.keys(value).length === 0) || // Checking for empty object
  (typeof value === "string" && value.trim().length === 0) // Checking for empty string

export const validateRegistration = (userData) => {
  const errors = []

  if (isEmpty(userData.username)) errors.push("Username is required")
  if (userData.password.length < 6)
    errors.push("Please enter a password with 6 or more characters")

  return errors
}

export default { isEmpty, validateRegistration }

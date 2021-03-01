const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://vankiloitajalohkuja.herokuapp.com"
    : "http://localhost:5000"

export const BASE_URL_FRONT =
  process.env.NODE_ENV === "production"
    ? "https://vankiloitajalohkuja.herokuapp.com"
    : "http://localhost:3000"

export default BASE_URL

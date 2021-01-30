const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://vankiloitajalohkuja.herokuapp.com"
    : "http://localhost:5000"

export default BASE_URL

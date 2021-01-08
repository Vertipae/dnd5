// Proxy API
// Hyöty: Keskitetään ulkoiset API-pyynnöt ja eriytetään ulkoiset APIt frontin toiminnasta. Eli käy ensin bäkissä ja sitten pyyntö menee ulkoiselle sivulle.
// Helpottaa jatkokehittämistä. Separation of responsibilities.

const axios = require("axios")
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { check, validationResult } = require("express-validator")

const BASE_API_URL = "https://www.dnd5eapi.co/api/"
axios.defaults.headers.common["Content-Type"] = "application/json"
router.get("/classes", async (req, res) => {
  try {
    const response = await axios.get(BASE_API_URL + "classes")
    // console.log(response.data)
    res.send(response.data)
  } catch (err) {
    // console.log(err)
    err.message ? console.error(err.message) : console.error(err)
    res.status(500).send("Server Error")
  }
})

module.exports = router

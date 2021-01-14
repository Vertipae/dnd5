// Proxy API
// Hyöty: Keskitetään ulkoiset API-pyynnöt ja eriytetään ulkoiset APIt frontin toiminnasta. Eli käy ensin bäkissä ja sitten pyyntö menee ulkoiselle sivulle.
// Helpottaa jatkokehittämistä. Separation of responsibilities.

const axios = require("axios")
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const BASE_API_URL = "https://www.dnd5eapi.co/api/"
axios.defaults.headers.common["Content-Type"] = "application/json"
router.get("/:endpoint", auth, async (req, res) => {
  try {
    const response = await axios.get(BASE_API_URL + req.params.endpoint)
    // console.log(response.data)
    res.send(response.data)
  } catch (err) {
    console.log(err.response)
    res.status(err.response.status).send(err.response.statusText)
  }
})

router.get("/classes/:class/:endpoint", auth, async (req, res) => {
  // console.log("IHANMITÄVAA")
  try {
    const response = await axios.get(
      BASE_API_URL + "classes/" + req.params.class + "/" + req.params.endpoint
    )
    // console.log(response.data)
    res.send(response.data)
  } catch (err) {
    console.log(err.response)
    res.status(err.response.status).send(err.response.statusText)
  }
})

router.get("/spells/:endpoint", auth, async (req, res) => {
  try {
    const response = await axios.get(
      BASE_API_URL + "spells/" + req.params.endpoint
    )
    // console.log(response.data)
    res.send(response.data)
  } catch (err) {
    console.log(err.response)
    res.status(err.response.status).send(err.response.statusText)
  }
})

module.exports = router

const axios = require("axios").default
const qs = require("qs")

const getDevices = async ({ SID, host = "http://fritz.box" }) => {
  const { data } = await axios.post(
    `${host}/data.lua`,
    qs.stringify({
      sid: SID,
      page: "netDev",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  return data.data
}

module.exports = {
  getDevices,
}

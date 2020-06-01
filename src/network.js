const axios = require("axios").default
const qs = require("qs")

/**
 * Get a list of devices
 * @param {Object} options
 * @param {string} options.SID
 * @param {string} [options.host]
 * @returns {Promise<Object>} data object containing both online and offline devices
 */
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

const axios = require("axios").default
const qs = require("qs")

/**
 * Get a list of devices
 * @param {Object} options
 * @param {string} options.SID session ID
 * @param {string} [options.host] host (default = "http://fritz.box")
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

/**
 * Wake a device from sleep (Wake On Lan)
 * @param {Object} options
 * @param {string} options.SID session ID
 * @param {string} options.UID unit ID (device ID)
 * @param {string} [options.host] host (default = "http://fritz.box")
 * @returns {Promise<boolean>}
 */
const wake = async ({ SID, UID, host = "http://fritz.box" }) => {
  const { status } = await axios.post(
    `${host}/data.lua`,
    qs.stringify({
      sid: SID,
      dev: UID,
      btn_wake: "",
      oldpage: "/net/edit_device.lua",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      validateStatus: statusCode => [200, 403].includes(statusCode),
    }
  )

  return status < 400 ? true : false
}

module.exports = {
  getDevices,
  wake,
}

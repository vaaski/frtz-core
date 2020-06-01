const axios = require("axios").default
const { parseStringPromise } = require("xml2js")
const { createHash } = require("crypto")
const qs = require("qs")

/**
 * A session object
 * @typedef {Object} Session
 * @property {string} SID
 * @property {string} Challenge
 * @property {string} BlockTime
 * @property {number} [expires]
 * @property {Object} [Rights]
 * @property {string[]} Rights.Name
 * @property {string[]} Rights.Access
 */

/**
 * get a challenge token
 * @param {Object} options
 * @param {string} options.host
 * @returns {Promise<Session>}
 */
const getNewSession = async ({ host }) => {
  const { data } = await axios.get(`${host}/login_sid.lua`)
  const parsed = await parseStringPromise(data, { explicitArray: false })
  return parsed.SessionInfo
}

/**
 * get a challenge token
 * @param {Object} options
 * @param {string} options.password
 * @param {string} option.challenge
 * @returns {string} solved challenge
 */
const getLoginToken = async ({ password, challenge }) => {
  const md5 = createHash("md5")
  md5.update(`${challenge}-${password}`, "ucs2")
  const hash = md5.digest("hex")
  return `${challenge}-${hash}`
}

/**
 * get session with username and loginToken, expires in 20 minutes unless used
 * @param {Object} options
 * @param {string} options.loginToken
 * @param {string} options.host
 * @param {string} options.username
 * @returns {Promise<Session>}
 */
const getSession = async ({ loginToken, host, username }) => {
  const { data } = await axios.get(`${host}/login_sid.lua`, {
    params: { response: loginToken, username },
  })
  const parsed = await parseStringPromise(data, { explicitArray: false })
  return { ...parsed.SessionInfo, expires: Date.now() + 60e3 * 20 }
}

/**
 * this makes a request to the region & language page,
 * which seems to be the fastest in terms of response time (~650ms)
 * @param {Object} options
 * @param {string} options.SID
 * @param {string} [options.host]
 * @returns {Promise<boolean>}
 */
const checkAuth = async ({ SID, host = "http://fritz.box" }) => {
  const { status } = await axios.post(
    `${host}/data.lua`,
    qs.stringify({
      sid: SID,
      page: "lang",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      validateStatus: statusCode => [200, 403].includes(statusCode),
    }
  )

  return status === 200
}

/**
 * Takes password and optionally username and host and returns a logged in session object
 * @param {object} options
 * @param {string} options.password
 * @param {string} [options.username]
 * @param {string} [options.host]
 * @returns {Promise<session>} session object
 */
const login = async ({
  password,
  username = "",
  host = "http://fritz.box",
}) => {
  const newSession = await getNewSession({ host })
  if (newSession.SID !== "0000000000000000") {
    console.log("new session was not zeroed", newSession)
    return newSession
  }
  const loginToken = await getLoginToken({
    password,
    challenge: newSession.Challenge,
  })

  const session = await getSession({ host, loginToken, username })

  if (session.BlockTime > 0)
    throw `Login blocked for ${session.BlockTime} seconds.`
  if (session.SID == "0000000000000000")
    throw "Login failed. Maybe the login credentials are invalid."

  return session
}

module.exports = {
  login,
  checkAuth,
  _internals: {
    getNewSession,
    getLoginToken,
    getSession,
  },
}

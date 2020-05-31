const axios = require("axios").default
const { parseStringPromise } = require("xml2js")
const { createHash } = require("crypto")

const getNewSession = async ({ host }) => {
  const { data } = await axios.get(`${host}/login_sid.lua`)
  const parsed = await parseStringPromise(data, { explicitArray: false })
  return parsed.SessionInfo
}

const getLoginToken = async ({ password, challenge }) => {
  const md5 = createHash("md5")
  md5.update(`${challenge}-${password}`, "ucs2")
  const hash = md5.digest("hex")
  return `${challenge}-${hash}`
}

const getSession = async ({ loginToken, host, username }) => {
  const { data } = await axios.get(`${host}/login_sid.lua`, {
    params: { response: loginToken, username },
  })
  const parsed = await parseStringPromise(data, { explicitArray: false })
  return parsed.SessionInfo
}

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
  _internals: {
    getNewSession,
    getLoginToken,
    getSession,
  },
}

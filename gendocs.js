const jsdoc2md = require("jsdoc-to-markdown")
const pre = `<p align="center">
  <a href="https://github.com/vaaski/frtz-core" target="_blank">
    <img src="https://colo.vaaski.com/static/frtz-core.svg">
  </a>
</p>
<hr>

<p align="center">
  Access your FRITZ!Box configuration from Node.js, used in <a href="https://github.com/vaaski/frtz">vaaski/frtz</a>.
</p>

<p align="center">
  <a href="https://npmjs.org/package/frtz-core">
    <img src="https://img.shields.io/npm/v/frtz-core.svg?style=for-the-badge">
  </a>

  <a href="https://github.com/vaaski/frtz">
    <img src="https://img.shields.io/badge/USED%20IN-FRTZ%20CLI-3E2E50?style=for-the-badge">
  </a>

  <a href="https://npmjs.org/package/frtz-core">
    <img src="https://img.shields.io/npm/dw/frtz-core.svg?style=for-the-badge">
  </a>

  <a href="https://github.com/vaaski/frtz-core/blob/master/package.json">
    <img src="https://img.shields.io/npm/l/frtz-core.svg?style=for-the-badge">
  </a>
</p>

- [Usage](#Usage)
- [Functions](#Functions)
- [Typedefs](#Typedefs)

# Usage

\`\`\`javascript
const { auth, network } = require("frtz")

!(async () => {
  const { SID } = await auth.login({ password: "mypassword" })
  const { passive } = await network.getDevices({ SID })

  const woke = await network.wake({ UID: passive[0], SID })
})()
\`\`\`
`

!(async () => {
  let render = await jsdoc2md.render({ files: "src/*.js" })
  const authNamepaths = await jsdoc2md.getNamepaths({ files: `src/auth.js` })
  const networkNamepaths = await jsdoc2md.getNamepaths({
    files: `src/network.js`,
  })

  authNamepaths.function.forEach(f => {
    render = render.replace(new RegExp(`${f}\\(`, "g"), `frtz.auth.${f}(`)
  })
  networkNamepaths.function.forEach(f => {
    render = render.replace(new RegExp(`${f}\\(`, "g"), `frtz.network.${f}(`)
  })

  render = render.replace("## Functions", "# Functions")
  render = render.replace("## Typedefs", "# Typedefs")

  console.log(pre + render)
})()

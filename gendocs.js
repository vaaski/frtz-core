const jsdoc2md = require("jsdoc-to-markdown")
const pre = `# frtz-core

Access your FRITZ!Box configuration from Node.js, used in [vaaski/frtz](https://github.com/vaaski/frtz).

[![Version](https://img.shields.io/npm/v/frtz-core.svg?style=for-the-badge)](https://npmjs.org/package/frtz-core)
[![Used in](https://img.shields.io/badge/USED%20IN-FRTZ-3E2E50?style=for-the-badge)](https://github.com/vaaski/frtz)
[![Downloads/week](https://img.shields.io/npm/dw/frtz-core.svg?style=for-the-badge)](https://npmjs.org/package/frtz-core)
[![License](https://img.shields.io/npm/l/frtz-core.svg?style=for-the-badge)](https://github.com/vaaski/frtz-core/blob/master/package.json)

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

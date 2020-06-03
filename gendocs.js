const fs = require("fs")
const jsdoc2md = require("jsdoc-to-markdown")

const pre = `# frtz

Access your FRITZ!Box configuration from Node.js, used in [vaaski/frtz](https://github.com/vaaski/frtz).`

jsdoc2md.render({ files: "src/*.js" }).then(console.log)

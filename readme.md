<p align="center">
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

```javascript
const { auth, network } = require("frtz")

!(async () => {
  const { SID } = await auth.login({ password: "mypassword" })
  const { passive } = await network.getDevices({ SID })

  const woke = await network.wake({ UID: passive[0].UID, SID })
})()
```
# Functions

<dl>
<dt><a href="#getNewSession">frtz.auth.getNewSession(options)</a> ⇒ <code><a href="#Session">Promise.&lt;Session&gt;</a></code></dt>
<dd><p>get a new challenge token</p>
</dd>
<dt><a href="#getLoginToken">frtz.auth.getLoginToken(options)</a> ⇒ <code>string</code></dt>
<dd><p>get a login token (challenge + password)</p>
</dd>
<dt><a href="#getSession">frtz.auth.getSession(options)</a> ⇒ <code><a href="#Session">Promise.&lt;Session&gt;</a></code></dt>
<dd><p>get session with username and loginToken, expires in 20 minutes unless used</p>
</dd>
<dt><a href="#checkAuth">frtz.auth.checkAuth(options)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>this makes a request to the region &amp; language page,
which seems to be the fastest in terms of response time (~650ms)</p>
</dd>
<dt><a href="#login">frtz.auth.login(options)</a> ⇒ <code>Promise.&lt;session&gt;</code></dt>
<dd><p>Takes password and optionally username and host and returns a logged in session object</p>
</dd>
<dt><a href="#getDevices">frtz.network.getDevices(options)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Get a list of devices</p>
</dd>
<dt><a href="#wake">frtz.network.wake(options)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Wake a device from sleep (Wake On Lan)</p>
</dd>
</dl>

# Typedefs

<dl>
<dt><a href="#Session">Session</a> : <code>Object</code></dt>
<dd><p>A session object</p>
</dd>
</dl>

<a name="getNewSession"></a>

## frtz.auth.getNewSession(options) ⇒ [<code>Promise.&lt;Session&gt;</code>](#Session)
get a new challenge token

**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.host | <code>string</code> | 

<a name="getLoginToken"></a>

## frtz.auth.getLoginToken(options) ⇒ <code>string</code>
get a login token (challenge + password)

**Kind**: global function  
**Returns**: <code>string</code> - solved challenge  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.password | <code>string</code> | 
| option.challenge | <code>string</code> | 

<a name="getSession"></a>

## frtz.auth.getSession(options) ⇒ [<code>Promise.&lt;Session&gt;</code>](#Session)
get session with username and loginToken, expires in 20 minutes unless used

**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.loginToken | <code>string</code> | 
| options.host | <code>string</code> | 
| options.username | <code>string</code> | 

<a name="checkAuth"></a>

## frtz.auth.checkAuth(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
this makes a request to the region & language page,which seems to be the fastest in terms of response time (~650ms)

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>Object</code> |  | 
| options.SID | <code>string</code> |  | 
| [options.host] | <code>string</code> | <code>&quot;https://fritz.box&quot;</code> | 

<a name="login"></a>

## frtz.auth.login(options) ⇒ <code>Promise.&lt;session&gt;</code>
Takes password and optionally username and host and returns a logged in session object

**Kind**: global function  
**Returns**: <code>Promise.&lt;session&gt;</code> - session object  

| Param | Type | Default |
| --- | --- | --- |
| options | <code>object</code> |  | 
| options.password | <code>string</code> |  | 
| [options.username] | <code>string</code> |  | 
| [options.host] | <code>string</code> | <code>&quot;https://fritz.box&quot;</code> | 

<a name="getDevices"></a>

## frtz.network.getDevices(options) ⇒ <code>Promise.&lt;Object&gt;</code>
Get a list of devices

**Kind**: global function  
**Returns**: <code>Promise.&lt;Object&gt;</code> - data object containing both online and offline devices  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.SID | <code>string</code> |  | session ID |
| [options.host] | <code>string</code> | <code>&quot;https://fritz.box&quot;</code> |  |

<a name="wake"></a>

## frtz.network.wake(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
Wake a device from sleep (Wake On Lan)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.SID | <code>string</code> |  | session ID |
| options.UID | <code>string</code> |  | unit ID (device ID) |
| [options.host] | <code>string</code> | <code>&quot;https://fritz.box&quot;</code> |  |

<a name="Session"></a>

## Session : <code>Object</code>
A session object

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| SID | <code>string</code> | 
| Challenge | <code>string</code> | 
| BlockTime | <code>string</code> | 
| [expires] | <code>number</code> | 
| [Rights] | <code>Object</code> | 
| [Rights.Name] | <code>Array.&lt;string&gt;</code> | 
| [Rights.Access] | <code>Array.&lt;string&gt;</code> | 



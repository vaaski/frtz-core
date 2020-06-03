# frtz

Access your FRITZ!Box configuration from Node.js, used in [vaaski/frtz](https://github.com/vaaski/frtz)

# Modules
## auth 
## Functions

<dl>
<dt><a href="#getNewSession">getNewSession(options)</a> ⇒ <code><a href="#Session">Promise.&lt;Session&gt;</a></code></dt>
<dd><p>get a new challenge token</p>
</dd>
<dt><a href="#getLoginToken">getLoginToken(options)</a> ⇒ <code>string</code></dt>
<dd><p>get a login token (challenge + password)</p>
</dd>
<dt><a href="#getSession">getSession(options)</a> ⇒ <code><a href="#Session">Promise.&lt;Session&gt;</a></code></dt>
<dd><p>get session with username and loginToken, expires in 20 minutes unless used</p>
</dd>
<dt><a href="#checkAuth">checkAuth(options)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>this makes a request to the region &amp; language page,
which seems to be the fastest in terms of response time (~650ms)</p>
</dd>
<dt><a href="#login">login(options)</a> ⇒ <code>Promise.&lt;session&gt;</code></dt>
<dd><p>Takes password and optionally username and host and returns a logged in session object</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Session">Session</a> : <code>Object</code></dt>
<dd><p>A session object</p>
</dd>
</dl>

<a name="getNewSession"></a>

## getNewSession(options) ⇒ [<code>Promise.&lt;Session&gt;</code>](#Session)
get a new challenge token

**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.host | <code>string</code> | 

<a name="getLoginToken"></a>

## getLoginToken(options) ⇒ <code>string</code>
get a login token (challenge + password)

**Kind**: global function  
**Returns**: <code>string</code> - solved challenge  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.password | <code>string</code> | 
| option.challenge | <code>string</code> | 

<a name="getSession"></a>

## getSession(options) ⇒ [<code>Promise.&lt;Session&gt;</code>](#Session)
get session with username and loginToken, expires in 20 minutes unless used

**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.loginToken | <code>string</code> | 
| options.host | <code>string</code> | 
| options.username | <code>string</code> | 

<a name="checkAuth"></a>

## checkAuth(options) ⇒ <code>Promise.&lt;boolean&gt;</code>
this makes a request to the region & language page,which seems to be the fastest in terms of response time (~650ms)

**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| options.SID | <code>string</code> | 
| [options.host] | <code>string</code> | 

<a name="login"></a>

## login(options) ⇒ <code>Promise.&lt;session&gt;</code>
Takes password and optionally username and host and returns a logged in session object

**Kind**: global function  
**Returns**: <code>Promise.&lt;session&gt;</code> - session object  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 
| options.password | <code>string</code> | 
| [options.username] | <code>string</code> | 
| [options.host] | <code>string</code> | 

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


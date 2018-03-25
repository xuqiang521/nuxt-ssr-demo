export default function ({userAgent, isServer, req}) {
  if (isServer && !req) return
  userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
}
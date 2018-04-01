export default function ({userAgent, req}) {
  // console.log('process.server', process.server)
  if (process.server && !req) return
  userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
}

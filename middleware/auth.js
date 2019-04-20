export default function ({ userAgent, req }) {
  if (process.server && !req) return
  userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
}

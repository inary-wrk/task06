const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/bff"
    ],
    target: "https://localhost:4001",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const serve = http.createServer(app)

const PORT = config.PORT || 3003 
app.listen(PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
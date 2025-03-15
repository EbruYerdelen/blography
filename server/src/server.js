require("dotenv").config()
const app = require("./app")
const connectToDB = require("./config/db")

const PORT = process.env.PORT || 3001;
connectToDB();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `)
}) 
const express = require("express")
const redis = require("redis")
const fs = require("fs")

// Set up Express
const app = express()
app.use(express.json())

// Set up Redis client
const client = redis.createClient()
client.connect()
client.on("error", (err) => console.error({
  message: "Error connecting to Redis",
  redisError: err
}))

// Parse CSV and load into Redis
const setupRedis = async () => {
  const rows = fs.readFileSync("./city_populations.csv", "utf8").split("\n")

  rows.forEach(row => {
    const [city, state, population] = row.split(",")
    client.set(`${state.toLowerCase()}-${city.toLowerCase()}`, Number(population.trim('\r')))
  })

  console.log("Data loaded into Redis")

}
setupRedis()

// Get state details from redis
app.get("/api/population/state/:state/city/:city", async (req, res) => {
  const { state, city } = req.params
  const key = `${state.toLowerCase()}-${city.toLowerCase()}`
  const population = await client.get(key)

  if (!population) {
    return res.status(404).send({
      message: "City/State combo not found"
    })
  } else {
    res.status(200).send(population)
  }
})

// put details into redis
app.put("/api/population/state/:state/city/:city", async (req, res) => {
  const { state, city } = req.params
  const population = parseInt(req.body.population)

  if (!state || !city || !population) {
    return res.status(400).send({
      message: "Missing required parameters"
    })
  } else {

    const key = `${state.toLowerCase()}-${city.toLowerCase()}`

    await client.set(key, population)
    res.sendStatus(200)
  }
})

app.listen(5555, () => {
  console.log("Server running on port 5555")
})

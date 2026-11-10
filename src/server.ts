import express from "express"

import { describe } from "./ai/client.js"
import { summarize } from "./ai/summarize.js"
import { tags } from "./ai/tags.js"

const app = express()
app.use(express.json())

app.post("/products/describe", async (req, res) => {
  const description = await describe(req.body)
  res.json({ description, tags: await tags(description) })
})

app.post("/orders/confirm", async (req, res) => {
  res.json({ line: await summarize(req.body) })
})

app.listen(Number(process.env.PORT ?? 3000))

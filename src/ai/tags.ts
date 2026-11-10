import { anthropic } from "./client.js"

export async function tags(description: string): Promise<string[]> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 60,
    messages: [{ role: "user", content: `Five short search tags, comma separated, for: ${description}` }],
  })
  const block = message.content[0]
  return block && block.type === "text" ? block.text.split(",").map((tag) => tag.trim()) : []
}

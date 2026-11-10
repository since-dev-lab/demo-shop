import Anthropic from "@anthropic-ai/sdk"

export const anthropic = new Anthropic()

/** The model every product description is written with. */
export const DESCRIPTION_MODEL = "claude-sonnet-4-5-20250929"

export async function describe(product: { name: string; facts: string[] }): Promise<string> {
  const message = await anthropic.messages.create({
    model: DESCRIPTION_MODEL,
    max_tokens: 300,
    messages: [{ role: "user", content: `Write two plain sentences about ${product.name}. Facts: ${product.facts.join("; ")}` }],
  })
  const block = message.content[0]
  return block && block.type === "text" ? block.text : ""
}

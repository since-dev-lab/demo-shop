import OpenAI from "openai"

const openai = new OpenAI()

/** One line for the order confirmation email. */
export async function summarize(order: { items: string[]; total: number }): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [{ role: "user", content: `One friendly line confirming an order of ${order.items.join(", ")} for $${order.total}.` }],
  })
  return completion.choices[0]?.message.content ?? ""
}

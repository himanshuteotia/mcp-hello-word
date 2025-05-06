import { z } from "zod";

export const greetingSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const greetToolInfo = {
  name: "greetings",
  description: "Returns a greeting message",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name to greet",
      },
    },
    required: ["name"],
  },
};

export function greet(args: unknown) {
  const name = greetingSchema.parse(args).name;
  return {
    content: [
      {
        type: "text",
        text: `Hello, ${name}! Welcome to ModelContext!`,
      },
    ],
  };
}

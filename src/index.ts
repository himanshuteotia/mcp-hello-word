import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { greet, greetToolInfo } from "./tools/greetings.js";

const server = new Server(
  {
    name: "mcp-hello-world",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [greetToolInfo],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  if (name === "greetings") {
    return greet(args);
  }
  throw new Error(`Tool ${name} not found`);
});

async function start() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Server started");
  console.log("Listening for requests...");
}

start().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});

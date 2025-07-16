import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHttpServerTransport } from "@modelcontextprotocol/sdk/server/http.js";
import { z } from "zod";

const server = new McpServer({
  name: "dataverse-contacts",
  version: "1.0.0"
});

server.registerTool(
  "readContacts",
  {
    title: "Read Contacts",
    description: "Reads custom_contacts",
    inputSchema: z.object({ filter: z.string().optional() })
  },
  async ({ filter }) => {
    return { content: [{ fullname: "Test Contact", id: "123" }] };
  }
);

const transport = new StreamableHttpServerTransport({
  port: 4000,
  path: "/mcp"
});
await server.connect(transport);
console.log("✅ MCP server running on http://localhost:4000/mcp");
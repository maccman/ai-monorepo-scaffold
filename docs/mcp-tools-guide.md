# MCP Tools: Context7 and Perplexity

Model Context Protocol (MCP) tools provide real-time access to documentation and research capabilities in Cursor IDE.

## Prerequisites

- Node.js 18.0.0+
- Cursor IDE with MCP support
- API keys for both tools

## Context7: Documentation Access

Context7 provides up-to-date, version-specific documentation and code examples for 1000+ libraries.

### Installation

**Via Smithery (Recommended):**

```bash
npx -y @smithery/cli@latest install @upstash/context7-mcp --client cursor --key <YOUR_SMITHERY_KEY>
```

Get your Smithery key from [smithery.ai](https://smithery.ai).

**Manual Configuration** (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Get your API key from [context7.com/dashboard](https://context7.com/dashboard).

### Usage

Context7 provides two tools:

- `mcp_context7_resolve-library-id` - Find library IDs
- `mcp_context7_get-library-docs` - Fetch documentation

**Example prompts:**

- "How do I use React hooks? use context7"
- "Create Next.js middleware with authentication. use context7"

## Perplexity: Research and Search

Perplexity provides advanced research and reasoning capabilities.

### Installation

**Via Smithery:**

```bash
npx -y @smithery/cli@latest install mcp-server-perplexity-ask --client cursor --key <YOUR_SMITHERY_KEY>
```

**Manual Configuration:**

```json
{
  "mcpServers": {
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "mcp-server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Get your API key from [perplexity.ai](https://perplexity.ai).

### Tools

- `mcp_perplexity-ask_perplexity_search` - Web search with ranked results
- `mcp_perplexity-ask_perplexity_research` - Deep research with citations
- `mcp_perplexity-ask_perplexity_reason` - Complex reasoning tasks

## Complete Configuration

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "ctx7sk-your-key-here"
      }
    },
    "perplexity-ask": {
      "command": "npx",
      "args": ["-y", "mcp-server-perplexity-ask"],
      "env": {
        "PERPLEXITY_API_KEY": "pplx-your-key-here"
      }
    }
  }
}
```

## Usage Guidelines

| Question Type        | Tool       | Example                                    |
| -------------------- | ---------- | ------------------------------------------ |
| Library docs         | Context7   | "How to use React Query hooks?"            |
| API reference        | Context7   | "Express.js middleware examples"           |
| General research     | Perplexity | "Latest web development trends"            |
| Comparative analysis | Perplexity | "React vs Vue.js in 2024"                  |
| Complex reasoning    | Perplexity | "Architecture decisions for microservices" |

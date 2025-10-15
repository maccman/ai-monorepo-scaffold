# MCP Tools Guide: Context7 and Perplexity Ask

This guide provides comprehensive instructions for installing and configuring Model Context Protocol (MCP) tools with Cursor IDE. MCP tools enhance your development workflow by providing real-time access to up-to-date documentation, code examples, and research capabilities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Context7 MCP Tool](#context7-mcp-tool)
- [Perplexity Ask MCP Tool](#perplexity-ask-mcp-tool)
- [Configuration Examples](#configuration-examples)
- [Usage Guidelines](#usage-guidelines)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing MCP tools, ensure you have:

- **Node.js**: Version 18.0.0 or higher
- **Cursor IDE**: Latest version with MCP support
- **API Keys**: Required for both tools (see individual sections below)

## Context7 MCP Tool

### Overview

Context7 is an MCP server that provides up-to-date, version-specific documentation and code examples directly into your prompts. It enhances language model capabilities by ensuring they use the latest information from official documentation sources.

**Key Features:**

- Real-time documentation fetching
- Version-specific code examples
- Support for 1000+ popular libraries
- TypeScript interface discovery
- NPM package information

### Installation

#### Method 1: Via Smithery (Recommended)

Smithery is a package manager specifically designed for MCP servers:

```bash
npx -y @smithery/cli@latest install @upstash/context7-mcp --client cursor --key <YOUR_SMITHERY_KEY>
```

Replace `<YOUR_SMITHERY_KEY>` with your Smithery key from [smithery.ai](https://smithery.ai).

#### Method 2: Manual Configuration

Add the following configuration to your Cursor MCP settings:

**Global Configuration** (`~/.cursor/mcp.json`):

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

**Alternative stdio Configuration**:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Getting Your Context7 API Key

1. Visit [context7.com/dashboard](https://context7.com/dashboard)
2. Create an account or sign in
3. Generate an API key from your dashboard
4. Replace `your_api_key_here` in the configuration

### Usage

Context7 provides two main tools:

1. **`mcp_context7_resolve-library-id`**: Resolves package names to Context7-compatible library IDs
2. **`mcp_context7_get-library-docs`**: Fetches documentation for specific libraries

**Example Workflow:**

```
1. Use resolve-library-id to find the library ID for "react"
2. Use get-library-docs to fetch React documentation
3. Ask questions about React with up-to-date context
```

**Prompt Examples:**

- `How do I use React hooks? use context7`
- `Create a Next.js middleware with authentication. use context7`
- `Show me TypeScript interface examples for Express.js. use context7`

## Perplexity Ask MCP Tool

### Overview

Perplexity Ask provides advanced research and reasoning capabilities through the Perplexity API. It offers three main tools for different types of queries:

**Available Tools:**

- `mcp_perplexity-ask_perplexity_search`: Web search with ranked results
- `mcp_perplexity-ask_perplexity_research`: Deep research with citations
- `mcp_perplexity-ask_perplexity_reason`: Advanced reasoning tasks

### Installation

#### Method 1: Via Smithery

```bash
npx -y @smithery/cli@latest install mcp-server-perplexity-ask --client cursor --key <YOUR_SMITHERY_KEY>
```

#### Method 2: Manual Configuration

Add to your Cursor MCP configuration:

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

### Getting Your Perplexity API Key

1. Visit [perplexity.ai](https://perplexity.ai)
2. Sign up for an account
3. Navigate to API settings
4. Generate an API key
5. Replace `your_api_key_here` in the configuration

### Usage

**Search Tool**: Use for general web searches with ranked results

```
Research the latest trends in React development
```

**Research Tool**: Use for comprehensive research with citations

```
Provide a detailed analysis of the current state of AI in web development
```

**Reason Tool**: Use for complex reasoning tasks

```
Analyze the pros and cons of different state management solutions for large React applications
```

## Configuration Examples

### Complete Configuration

Here's a complete example of both tools configured together:

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

### Project-Specific Configuration

You can also configure MCP servers per project by creating `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "ctx7sk-project-specific-key"
      }
    }
  }
}
```

## Usage Guidelines

### Best Practices

1. **Use Context7 for Documentation**: Always use Context7 when asking about specific libraries, frameworks, or APIs
2. **Use Perplexity for Research**: Use Perplexity for general research, trends, and comparative analysis
3. **Combine Both**: For comprehensive answers, combine both tools - use Context7 for technical details and Perplexity for broader context

### Prompt Patterns

**For Documentation Questions:**

```
How do I implement authentication in Next.js? use context7
```

**For Research Questions:**

```
What are the current best practices for React performance optimization?
```

**For Combined Questions:**

```
Research the latest React authentication patterns and show me implementation examples. use context7
```

### Tool Selection Guide

| Question Type         | Recommended Tool | Example                                    |
| --------------------- | ---------------- | ------------------------------------------ |
| Library documentation | Context7         | "How to use React Query hooks?"            |
| API reference         | Context7         | "Express.js middleware examples"           |
| General research      | Perplexity       | "Latest web development trends"            |
| Comparative analysis  | Perplexity       | "React vs Vue.js in 2024"                  |
| Complex reasoning     | Perplexity       | "Architecture decisions for microservices" |

## Troubleshooting

### Common Issues

**Context7 Not Working:**

- Verify your API key is correct
- Check that the URL is accessible: `https://mcp.context7.com/mcp`
- Ensure Node.js version 18+ is installed

**Perplexity Ask Not Responding:**

- Verify your Perplexity API key
- Check your API quota and billing status
- Ensure the npx command can access the package

**Configuration Not Loading:**

- Restart Cursor after configuration changes
- Check JSON syntax in your mcp.json file
- Verify file permissions on the configuration file

### Debug Steps

1. **Check MCP Server Status**: Look for MCP server status in Cursor's status bar
2. **Review Logs**: Check Cursor's developer console for error messages
3. **Test Configuration**: Use a minimal configuration to isolate issues
4. **Verify Dependencies**: Ensure Node.js and npm/npx are working correctly

### Getting Help

- **Context7**: [GitHub Repository](https://github.com/upstash/context7)
- **Perplexity**: [Perplexity AI Documentation](https://docs.perplexity.ai)
- **MCP Protocol**: [Model Context Protocol Specification](https://modelcontextprotocol.io)

## Security Considerations

- **API Key Management**: Never commit API keys to version control
- **Environment Variables**: Use environment variables for sensitive data
- **Rate Limits**: Be aware of API rate limits and usage quotas
- **Data Privacy**: Understand what data is sent to external services

## Conclusion

These MCP tools significantly enhance your development workflow by providing real-time access to documentation and research capabilities. By following this guide, you'll have both Context7 and Perplexity Ask configured and ready to use in Cursor IDE.

Remember to:

- Keep your API keys secure
- Use the appropriate tool for each type of question
- Combine both tools for comprehensive answers
- Stay updated with the latest versions and features

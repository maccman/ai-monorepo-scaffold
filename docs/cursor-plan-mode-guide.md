# Cursor Plan Mode

Plan Mode transforms complex coding tasks by creating detailed plans before writing code. Instead of jumping into implementation, Cursor researches your codebase, asks clarifying questions, and creates an editable roadmap.

## Why Plan Mode

Traditional AI assistants dive straight into code, leading to:
- Misaligned implementations
- Missing critical context
- Rework from misunderstandings
- Difficulty with multi-step tasks

Plan Mode solves this by:
- **Frontloading context** - Researches codebase thoroughly first
- **Ensuring alignment** - Clarifies requirements before coding
- **Providing transparency** - You see and approve the plan
- **Enabling longer runs** - Agents work on complex tasks systematically
- **Improving quality** - Significantly better code generation

## How to Use

### 1. Activate Plan Mode

**Manual:** Press `Shift + Tab` in agent input

**Automatic:** Cursor suggests it for complex tasks

### 2. Planning Process

**Stage 1: Research**

Cursor automatically:
- Searches relevant files
- Reviews documentation
- Analyzes patterns and architecture
- Identifies dependencies

**Stage 2: Clarifying Questions**

Cursor asks targeted questions:
- Implementation preferences
- Design decisions
- Data storage requirements
- UI/UX choices

**Tip:** Answer with detail. Quality answers = quality plans.

**Stage 3: Plan Generation**

Creates comprehensive Markdown plan with:
- File structure (created/modified files)
- Code references (specific locations)
- To-do list (step-by-step breakdown)
- Dependencies (task order)
- Architecture decisions

### 3. Review and Edit

The plan is fully editable:
- Click into Markdown to make changes
- Add/remove to-do items
- Modify implementation details
- Adjust scope or approach

### 4. Execute

Click "Build" to start:
- Entire plan loads into context
- AI assigned full to-do list
- Progress tracked: pending → in progress → complete

### 5. Save Plan (Optional)

Save as Markdown for:
- Documentation and reference
- Team collaboration
- Architectural decision records
- PR descriptions

## Example

**Task:** "Build a dashboard on agents page where I can see and comment on teammates' background agents."

### Research Phase
Cursor reads: auth code, UI components, database schema, routing

### Clarifying Questions
- Should this be a new page or integrated? → New tab and route
- How to group agents? → By status
- Comment UI style? → Inline comments
- Where to store comments? → Database

### Generated Plan

```markdown
## Frontend Data Model
- Create types for background agents
- Create types for comments with user info

## New Route
- Add /agents/dashboard route
- Create dashboard component

## UI Components
- Kanban board grouped by status
- Agent cards with inline comments
- Comment input component

## Backend
- Create comments table migration
- Add comment CRUD operations
- Add authorization checks

## To-Do List
1. ✅ Create database migration
2. ✅ Add TypeScript types
3. ✅ Create route
4. ✅ Build Kanban UI
5. 🔄 Implement comments (IN PROGRESS)
6. ⏳ Add authorization (PENDING)
```

## When to Use

### Use Plan Mode

**Complex multi-file features:**
- New pages with backend integration
- Refactoring touching many components
- Features requiring database migrations
- Cross-cutting concerns (auth, logging)

**Existing architecture:**
- Need to understand patterns first
- Ensure consistency with code style
- Integrate with established models

**Team collaboration:**
- Review approach before implementation
- Document architectural decisions
- Plan features for other team members

**Unclear requirements:**
- Know what you want, not how to implement
- Multiple valid approaches exist
- Need help breaking down vague goals

### Skip Plan Mode

- One-line fixes or trivial updates
- Single function/component additions
- Quick CSS tweaks
- Extremely well-defined tasks
- Time-sensitive hotfixes

## Best Practices

### 1. Write Clear Prompts

**Good:**
```
"Build user dashboard displaying project stats in cards, with filters 
for date range and status. Use our design system and fetch from 
/api/stats endpoint."
```

**Bad:**
```
"Make a dashboard"
```

### 2. Provide Context

```
"Add feature similar to export functionality in 
components/ExportManager.tsx"
```

### 3. Answer Thoroughly

**Bad:** "Yes"

**Good:** "Yes, use modal dialog with our existing Modal component from @/components/ui/modal and trigger from settings menu"

### 4. Review Plans

- Check referenced files are correct
- Verify approach matches architecture
- Ensure edge cases covered
- Add missing steps

### 5. Edit Plans

Don't hesitate to modify:
- Add implementation notes
- Remove unnecessary steps
- Adjust task order
- Include testing considerations

### 6. Save Important Plans

For significant features:
- Save as Markdown in repo
- Include in PR description
- Use as documentation basis
- Reference in code comments

## Integration with Cursor Features

### Plan Mode + Agent Mode
- Plan Mode is enhanced Agent Mode
- Use for initial planning, standard Agent for follow-ups
- Plans referenceable in later conversations

### Plan Mode + To-Do Lists
- Plans auto-generate structured to-dos
- Real-time updates as agent works
- Track progress across implementations
- Integrate with Slack if configured

### Plan Mode + Codebase Indexing
- Leverages Cursor's indexing
- Better indexing = better plans
- Configure `.cursorignore` properly
- Large codebases benefit most

### Plan Mode + Rules & Memories
- Respects `.cursorrules` file
- Incorporates previous memories
- Reflects coding standards
- Maintains consistency

## Troubleshooting

**Plan Mode not available:**
- Update to Cursor v1.7+
- Ensure you're in Agent mode
- Try `Shift + Tab`

**No clarifying questions:**
- Prompt too specific or too vague
- Try including ambiguity requiring decisions
- State "I need help deciding approach"

**Plans too generic:**
- Provide more codebase context
- Reference specific files/patterns
- Check codebase indexing
- Add detailed `.cursorrules`

**Plans miss important files:**
- Check `.cursorignore`
- Explicitly reference files in prompt
- Use `@filename` to force inclusion
- Ensure files indexed

**Agent deviates from plan:**
- AI may have found better approach
- Review changes for validity
- Make plan more prescriptive
- Use specific language in to-dos

## Advanced Tips

### 1. Iterative Planning

For large features:
1. Start with high-level plan
2. Break into phases
3. Create detailed plans per phase
4. Use saved plans for consistency

### 2. Template Plans

Create reusables:
- Save common patterns as Markdown
- Reference in prompts: "Follow pattern in docs/feature-template.md"
- Build plan library for team

### 3. Cross-Reference Plans

For related features:
- Reference previous plans in prompts
- Ensure consistency in approach
- Build on established patterns

### 4. Combine with Manual Planning

Enhance your planning:
- Write rough notes
- Let Plan Mode fill details
- Edit to match vision
- Best of human and AI

### 5. Educational Use

Learn from plans:
- See how AI structures implementations
- Understand component dependencies
- Learn best practices for your stack
- Identify reusable patterns

## Plan Mode vs Traditional Agent

| Aspect            | Traditional Agent        | Plan Mode                     |
| ----------------- | ------------------------ | ----------------------------- |
| **Approach**      | Direct implementation    | Research → Plan → Implement   |
| **Context**       | Minimal, on-the-fly      | Extensive, upfront            |
| **Transparency**  | Black box                | Full visibility               |
| **Complex Tasks** | May struggle             | Designed for complexity       |
| **Correction**    | Hard to redirect         | Easy to edit before building  |
| **Documentation** | Minimal                  | Built-in (the plan)           |
| **Best For**      | Simple, isolated changes | Multi-file, complex features  |

## Conclusion

Plan Mode prioritizes thoughtful planning over immediate implementation, enabling complex tasks with greater confidence and better outcomes.

Key to success:
- Provide clear context
- Answer questions thoroughly
- Review plans critically
- Don't hesitate to edit
- Active collaboration with AI

As projects grow, the ability to generate, review, and execute detailed plans becomes invaluable. Plan Mode provides the structure needed to maintain quality while leveraging AI to accelerate development.

## Resources

- **Official:** [Cursor Plan Mode Announcement](https://cursor.com/blog/plan-mode)
- **Video:** [Introducing Plan Mode (YouTube)](https://www.youtube.com/watch?v=WInPBmCK3l4)
- **Features:** [cursor.com/features](https://cursor.com/features)
- **Community:** Cursor Discord and forums

---

_Updated: October 2025_

# Spokenly: Voice-Driven Coding with AI Transcription

A comprehensive guide to using Spokenly for "vibe coding" - narrating your coding thoughts and ideas directly into Cursor's AI chat for enhanced productivity and natural programming workflows.

## What is Spokenly?

Spokenly is a powerful Mac dictation application that transforms speech into text using advanced AI models. Built on OpenAI's Whisper technology with support for GPT-4o models, it provides real-time transcription across any Mac application, making it perfect for voice-driven coding workflows.

### Key Features for Coding

- **Real-time transcription**: See your words appear as you speak
- **Universal compatibility**: Works with any text input field, including IDEs and chat interfaces
- **AI-powered accuracy**: Uses GPT-4o mini transcribe for superior accuracy
- **Customizable shortcuts**: Set your preferred activation key
- **100+ language support**: Automatic language detection
- **Privacy options**: Local models available for sensitive work

## Installation & Setup

### 1. Download and Install

1. Visit [spokenly.app](https://spokenly.app) or download from the Mac App Store
2. Install the application (only 2.9 MB)
3. Grant necessary permissions when prompted:
   - Microphone access
   - Accessibility features

### 2. Initial Configuration

1. **Set Activation Shortcut**:
   - Default: Right Command key (⌘)
   - Recommended for coding: `F15` or `Right Option (⌥)`
   - Choose a key that won't conflict with your IDE shortcuts

2. **Configure Dictation Model**:
   - Go to Spokenly settings
   - Select "Online GPT-4o mini transcribe" for best accuracy
   - Alternative: Use local Whisper models for privacy

3. **API Key Setup** (for cloud models):
   - Get OpenAI API key from [platform.openai.com](https://platform.openai.com)
   - Enter in Spokenly settings
   - Or use Spokenly Pro ($7.99/month) for included cloud access

## Vibe Coding Workflow

### The Core Concept

"Vibe coding" with Spokenly involves narrating your coding thoughts, ideas, and requirements directly into Cursor's AI chat. Instead of typing complex prompts, you speak naturally about what you want to build, debug, or understand.

### Step-by-Step Process

1. **Position Your Cursor**:
   - Click in Cursor's chat input field
   - Ensure focus is on the text area

2. **Activate Dictation**:
   - Press your configured shortcut key (e.g., Right Option)
   - Spokenly's transcription window appears
   - Visual indicator shows recording status

3. **Narrate Your Thoughts**:
   - Speak naturally about your coding goals
   - Describe problems, requirements, or ideas
   - Include context about your codebase

4. **Complete Transcription**:
   - Press the shortcut key again to stop
   - Text automatically inserts at cursor position
   - Review and edit if needed

5. **Submit to AI**:
   - Send the transcribed message to Cursor's AI
   - Get code suggestions, explanations, or solutions

## Best Practices for Coding Context

### Effective Prompting Techniques

**Problem Description**:

```
"I'm working on a React component that needs to handle user authentication. The current implementation has a bug where the login state doesn't persist after page refresh. Can you help me fix this?"
```

**Feature Requests**:

```
"I want to add a dark mode toggle to my application. The app uses Tailwind CSS and has a theme context already set up. How should I implement this?"
```

**Code Review**:

```
"Can you review this TypeScript function? I'm concerned about type safety and performance. Here's the code: [paste code]"
```

**Learning & Understanding**:

```
"I'm trying to understand how React's useEffect hook works with dependencies. Can you explain the difference between an empty dependency array and including specific values?"
```

### Voice Command Tips

1. **Speak Clearly**: Enunciate technical terms and variable names
2. **Use Natural Language**: Don't try to speak code syntax - describe intent
3. **Include Context**: Mention frameworks, libraries, and project details
4. **Pause for Punctuation**: Spokenly handles punctuation automatically with GPT-4o models
5. **Break Down Complex Ideas**: Split large requests into smaller, focused questions

## Advanced Configuration

### Model Selection

**GPT-4o mini transcribe** (Recommended):

- Best accuracy for technical content
- Automatic punctuation
- Good with technical terminology
- Requires internet connection

**Local Whisper Models** (Privacy-focused):

- Works offline
- No API costs
- Slightly lower accuracy for technical terms
- Good for sensitive projects

### Customization Options

1. **Word Replacements**:
   - Add custom technical terms
   - Configure variable name pronunciations
   - Set up framework-specific vocabulary

2. **Language Settings**:
   - Enable automatic language detection
   - Set primary language for coding context
   - Configure multilingual support

3. **Audio Settings**:
   - Adjust microphone sensitivity
   - Configure noise reduction
   - Set up audio input preferences

## Integration with Cursor

### Optimizing for AI Chat

1. **Context Preservation**:
   - Spokenly maintains conversation context
   - Previous messages inform current transcription
   - AI understands coding terminology better

2. **Code Snippets**:
   - Speak naturally about code blocks
   - Use descriptive language for syntax
   - Let AI interpret your intent

3. **Debugging Workflow**:
   - Describe error messages verbally
   - Explain expected vs. actual behavior
   - Request step-by-step debugging

### Example Workflows

**Feature Development**:

1. Dictate: "I need to create a user profile page with avatar upload"
2. AI responds with component structure
3. Dictate: "Add form validation for email and phone number"
4. AI provides validation logic

**Bug Fixing**:

1. Dictate: "My API call is returning 500 errors"
2. AI asks for more details
3. Dictate: "The error happens when I try to save user preferences"
4. AI suggests debugging steps

**Code Refactoring**:

1. Dictate: "This function is too long and hard to read"
2. AI analyzes the code
3. Dictate: "Break it into smaller, more focused functions"
4. AI provides refactored version

## Troubleshooting

### Common Issues

**Transcription Accuracy**:

- Speak clearly and at moderate pace
- Use technical terms consistently
- Consider local models for domain-specific vocabulary

**Shortcut Conflicts**:

- Change activation key in Spokenly settings
- Avoid keys used by your IDE
- Test in different applications

**API Key Issues**:

- Verify OpenAI API key is valid
- Check internet connection for cloud models
- Consider Spokenly Pro for simplified setup

**Audio Problems**:

- Check microphone permissions
- Test with other applications
- Adjust audio input levels

### Performance Optimization

1. **Network Considerations**:
   - GPT-4o models require stable internet
   - Local models work offline
   - Consider latency for real-time coding

2. **Resource Usage**:
   - Spokenly is lightweight (2.9 MB)
   - Minimal impact on system performance
   - Efficient memory usage

## Privacy & Security

### Data Handling

**Cloud Models (GPT-4o)**:

- Audio processed and immediately deleted
- No permanent storage of voice data
- Transcriptions may be logged for improvement

**Local Models (Whisper)**:

- Complete privacy - no data leaves your Mac
- Offline processing
- No internet connection required

### Best Practices

1. **Sensitive Code**:
   - Use local models for proprietary code
   - Avoid dictating API keys or passwords
   - Consider project sensitivity when choosing models

2. **Team Environments**:
   - Be mindful of background noise
   - Use headphones in shared spaces
   - Consider privacy implications

## Cost Considerations

### Pricing Options

**Free Tier**:

- Local Whisper models
- Unlimited usage
- Offline functionality

**Bring Your Own Keys**:

- Use your OpenAI API key
- Pay per usage
- More control over costs

**Spokenly Pro** ($7.99/month):

- Included cloud model access
- No API key management
- Priority support

### Usage Optimization

1. **Efficient Dictation**:
   - Plan your thoughts before speaking
   - Use concise, clear language
   - Avoid unnecessary repetition

2. **Model Selection**:
   - Use local models for simple tasks
   - Reserve GPT-4o for complex coding problems
   - Monitor API usage if using own keys

## Comparison with Alternatives

### Spokenly vs. Native Mac Dictation

**Advantages**:

- Superior accuracy with AI models
- Real-time transcription
- Better technical terminology recognition
- Customizable and configurable

**Considerations**:

- Requires installation
- May have associated costs
- More complex setup

### Spokenly vs. Other Voice Coding Tools

**Unique Benefits**:

- Universal app compatibility
- AI-powered transcription
- Flexible model options
- Privacy-focused local processing

## Getting Started Checklist

- [ ] Download and install Spokenly
- [ ] Grant microphone and accessibility permissions
- [ ] Set preferred activation shortcut
- [ ] Configure dictation model (GPT-4o mini transcribe recommended)
- [ ] Set up OpenAI API key (if using cloud models)
- [ ] Test transcription in Cursor's chat
- [ ] Practice with simple coding prompts
- [ ] Customize word replacements for technical terms
- [ ] Integrate into daily coding workflow

## Conclusion

Spokenly transforms the coding experience by enabling natural voice interaction with AI coding assistants. By narrating your thoughts, problems, and ideas directly into Cursor's chat, you can:

- **Increase productivity**: Speak faster than you type
- **Improve clarity**: Natural language often conveys intent better than typed prompts
- **Reduce fatigue**: Less typing means less strain
- **Enhance creativity**: Voice can help with brainstorming and problem-solving

The combination of Spokenly's advanced transcription and Cursor's AI capabilities creates a powerful workflow for modern developers. Whether you're debugging complex issues, planning new features, or learning new technologies, voice-driven coding can significantly enhance your development experience.

Start with simple prompts and gradually build confidence in using voice for more complex coding scenarios. The key is to speak naturally and let the AI handle the technical interpretation of your intent.

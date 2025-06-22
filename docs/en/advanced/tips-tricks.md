# Advanced Tips & Tricks

Once you've mastered the fundamentals of Vibe Coding, these advanced techniques will elevate your productivity to the next level. These are the secrets that separate good developers from great ones.

## Creating Custom Code Snippets

### VS Code Snippets:
```json
{
  "React Functional Component with TypeScript": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({ $3 }) => {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "};",
      "",
      "export default ${1:ComponentName};"
    ],
    "description": "Create a React functional component with TypeScript"
  }
}
```

### IntelliJ Live Templates:
```java
// Create custom templates for common patterns
// Use variables and expressions
// Share templates across teams
```

## Mastering Multi-Cursor Editing

### Advanced Multi-Cursor Techniques:
```
Alt+Click - Add cursor at click position
Ctrl+Alt+Down - Add cursor below current line
Ctrl+Shift+L - Select all occurrences of current selection
Ctrl+D - Select next occurrence (incremental selection)
```

### Practical Multi-Cursor Examples:
```typescript
// Transform array of strings to object properties
// Rename multiple variables simultaneously
// Add semicolons to multiple lines
// Format multiple import statements
```

## Using the Command Palette for Everything

### Essential Command Palette Actions:
```
Ctrl+Shift+P - Open Command Palette
>reload - Reload window
>format - Format document
>sort - Sort lines
>transform - Transform text (uppercase, lowercase, etc.)
```

### Custom Commands and Workflows:
```json
// Configure custom commands
// Create keyboard shortcuts for complex operations
// Automate repetitive tasks
```

---

**Next:** Learn about the future of development in [Conclusion: Cultivating Your Vibe](./conclusion.md).

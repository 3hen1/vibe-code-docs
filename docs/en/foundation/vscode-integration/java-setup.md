# Java Project Development Setup in VS Code

This guide provides a concise overview of setting up a Java development environment in Visual Studio Code. For a complete walkthrough, please refer to the official documentation on [Getting Started with Java in VS Code](https://code.visualstudio.com/docs/java/java-tutorial).

## Quick Setup

The fastest way to get started with Java in VS Code.

### 1. Install the Extension Pack for Java

If you already have VS Code installed, you can add Java support by installing the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack). This pack bundles the core extensions for Java development, including:

*   Language Support for Java™ by Red Hat
*   Debugger for Java
*   Test Runner for Java
*   Maven for Java
*   Project Manager for Java

### 2. Install a JDK

You need a Java Development Kit (JDK) version 1.8 or newer. If you don't have one, you can download it from sources like [Amazon Corretto](https://aws.amazon.com/corretto), [Azul Zulu](https://www.azul.com/downloads/?package=jdk), or [Eclipse Adoptium's Temurin](https://adoptium.net/).

More than 90% of our projects use JDK8 and Spring Boot 2.x, and the rest use JDK11. In order to upgrade Spring Boot 3.x, JDK must be 17 or above, and JDK21 is also a very good version, bringing features such as virtual threads. Therefore, it is recommended to install JDK8, JDK11, JDK17, and JDK21 locally, and use JDK8 by default

If you want to download a new JDK, you can click the download link, or trigger the command Java: Install New JDK in Command Palette (⇧⌘P). It will open a new view guiding you to download JDKs.

![download-jdk](https://code.visualstudio.com/assets/docs/java/java-project/download-jdk.png)

### 3. Config Java Runtime 

If you want to visualize the version of Java your current project is using in VSCode, you can:

Open the Command Palette (Cmd+Shift+P) and search for "Java: Configure Java Runtime" to view the Java runtime environment information for the current project

You can make sure that this project uses JDK21 by doing the following configuration in `.vscode/settings.json`

```json
{
    "java.configuration.runtimes": [
        {
            "name": "JavaSE-1.8",
            "path": "/Users/yourname/.sdkman/candidates/java/8.0.332-zulu"
        },
        {
            "name": "JavaSE-11",
            "path": "/Users/yourname/.sdkman/candidates/java/11.0.12-zulu"
        },
        {
            "name": "JavaSE-17",
            "path": "/Users/yourname/.sdkman/candidates/java/17.0.3.fx-zulu"
        },
        {
            "name": "JavaSE-21",
            "path": "/Users/yourname/.sdkman/candidates/java/21.0.1-graal"
        }
    ],
    "java.compile.nullAnalysis.mode": "automatic",
    "java.configuration.detectJdksAtStart": false,
    "java.jdt.ls.java.home": "/Users/yourname/.sdkman/candidates/java/21.0.1-graal"
}
```

### 4. Config Maven

Use the following command to confirm that the repository configuration for maven is correct

```shell
./mvnw help:effective-settings

or

mvn help:effective-settings

```


## Development Workflow

Once your environment is set up, you can:

*   **Create Projects**: Use the `Java: Create Java Project` command from the Command Palette (⇧⌘P).
*   **Edit Code**: Leverage features like IntelliSense, code snippets, and refactoring.
*   **Run and Debug**: Press F5 to run and debug. You can set breakpoints, inspect variables, and use features like Hot Code Replace.
*   **Test**: Run and debug tests with the Test Runner for Java, which supports JUnit and TestNG.

For more in-depth information on these topics, please consult the [official documentation](https://code.visualstudio.com/docs/java/java-tutorial).

## Enhanced Java Editing in VS Code

Visual Studio Code offers a rich set of features to enhance your Java editing experience. Below is a summary of key functionalities. For a comprehensive guide, refer to the [official documentation on editing Java](https://code.visualstudio.com/docs/java/java-editing).

### Code Navigation and Search

Efficiently navigate your codebase with these features:

*   **Go to Definition (F12)**: Jump directly to the source code of a symbol.
*   **Peek Definition (⌥F12)**: View a symbol's definition in an inline window without leaving your current context.
*   **Symbol Search**:
    *   **Workspace Search (⌘T)**: Find any symbol within your project.
    *   **File Search (⌘P, then @)**: Locate symbols within the current file.

Here is a demonstration of searching for symbols in your workspace:

<video src="https://code.visualstudio.com/assets/docs/java/java-editing/search-in-workspace.mp4" controls title="Search in Workspace"></video>

### Call and Type Hierarchy

Visualize relationships in your code:

*   **Call Hierarchy**: View all calls to or from a function.
*   **Type Hierarchy**: See the inheritance relationships between Java objects.

Here is a demonstration of the Call Hierarchy feature:

<video src="https://code.visualstudio.com/assets/docs/java/java-editing/type-hierarchy.mp4" controls title="Call Hierarchy"></video>

### IntelliSense and Code Completion

Benefit from smart code completions with IntelliSense, powered by the same tools as Eclipse and enhanced with AI through IntelliCode. This feature provides context-aware suggestions based on common practices from thousands of open-source projects.

### Code Snippets

Accelerate your coding with a wide range of built-in and customizable code snippets. For example, typing `sysout` creates `System.out.println()`, and `main` generates the main method structure.

### Refactoring and Source Actions

Improve your code's structure and quality with various refactoring options and quick fixes, such as:

*   Generating getters and setters.
*   Organizing imports.
*   Extracting code to methods or variables.

# Using VS Code as the Main Editor for Vibe Coding

This section provides a comprehensive guide to setting up and using Visual Studio Code as your primary development environment for Vibe Coding projects.

<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;
  list-style: none;
  margin: 0;
}

.card-item {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.25s, background-color 0.25s;
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

.card-item:hover {
  border-color: var(--vp-c-brand);
}

.card-image {
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
  background-color: var(--vp-c-bg);
}

.card-image img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.card-content {
  padding: 16px;
  flex-grow: 1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
}

.card-text {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}
</style>

<div class="card-grid">
  <a href="./why-vscode" class="card-item">
    <div class="card-image">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" alt="VS Code Logo">
    </div>
    <div class="card-content">
      <h3 class="card-title">1. Why Choose VS Code (Insiders)</h3>
      <p class="card-text">VS Code is a powerful, industry-standard editor with a vast ecosystem, cross-language support, and excellent performance. The Insiders version gives you early access to the latest features.</p>
    </div>
  </a>
  <a href="./installation-and-plugins" class="card-item">
    <div class="card-image">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 32 32" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><path fill="#ffba58" d="M27.5 5.5h-9.3l-2.1 4.2H4.4v16.8h25.2v-21Zm0 4.2h-8.2l1.1-2.1h7.1Z"/><path fill="#e76a00" d="M20 12.5V14h-4a2.006 2.006 0 0 0-2 2v4h-1.5a2.5 2.5 0 0 0 0 5H14v4a2.006 2.006 0 0 0 2 2h3.8v-1.5a2.7 2.7 0 0 1 5.4 0V31H29a2.006 2.006 0 0 0 2-2v-3.8h-1.5a2.7 2.7 0 0 1 0-5.4H31V16a2.006 2.006 0 0 0-2-2h-4v-1.5a2.5 2.5 0 0 0-5 0Z"/></svg>
    </div>
    <div class="card-content">
      <h3 class="card-title">2. VS Code Installation and Core Plugins</h3>
      <p class="card-text">This section guides you through the installation of VS Code and recommends core plugins like GitHub Copilot and GitLens to boost your development productivity.</p>
    </div>
  </a>
  <a href="./frontend-web-setup" class="card-item">
    <div class="card-image">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="Frontend Web">
    </div>
    <div class="card-content">
      <h3 class="card-title">3. Frontend Web Project Development Setup</h3>
      <p class="card-text">Learn how to configure VS Code for frontend development, including support for HTML, CSS, JavaScript, and popular frameworks like React, Vue, and Angular.</p>
    </div>
  </a>
  <a href="./java-setup" class="card-item">
    <div class="card-image">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original-wordmark.svg" alt="Java Logo">
    </div>
    <div class="card-content">
      <h3 class="card-title">4. Java Project Development Setup</h3>
      <p class="card-text">Set up your Java development environment in VS Code with the Extension Pack for Java, configure the JDK, and manage Maven/Gradle projects.</p>
    </div>
  </a>
  <a href="./go-setup" class="card-item">
    <div class="card-image">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original-wordmark.svg" alt="Go Logo">
    </div>
    <div class="card-content">
      <h3 class="card-title">5. Go Project Development Setup</h3>
      <p class="card-text">Guides you through setting up the Go development environment in VS Code, including installing the official Go extension and configuring your Go environment.</p>
    </div>
  </a>
  <a href="./python-setup" class="card-item">
    <div class="card-image">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original-wordmark.svg" alt="Python Logo">
    </div>
    <div class="card-content">
      <h3 class="card-title">6. Python Project Development Setup</h3>
      <p class="card-text">Configure VS Code for Python development, including selecting an interpreter, managing virtual environments, and using features like debugging and testing.</p>
    </div>
  </a>
  <a href="./mcp-setup" class="card-item">
    <div class="card-image">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 32 32" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><path fill="#00EC97" d="m17.425 3.92l-3.76 5.58c-.257.385.244.835.604.52l3.28-3.214c.095-.083.236-.026.236.115v10.062c0 .135-.18.192-.256.096L6.754 3.681a1.85 1.85 0 0 0-1.459-.68C4.138 3 3 3.584 3 4.922V19.07a1.922 1.922 0 0 0 3.555 1.003l3.754-5.58c.257-.385-.238-.835-.598-.52l-3.26 3.279c-.096.083-.237.026-.237-.117V7.101c0-.14.18-.192.257-.096L17.226 20.32c.36.444.9.681 1.46.681C19.848 21 21 20.421 21 19.078V4.93a1.93 1.93 0 0 0-3.575-1.003z"/></svg>
    </div>
    <div class="card-content">
      <h3 class="card-title">7. Vibe Coding MCP Setup</h3>
      <p class="card-text">An introduction to setting up the Vibe Coding Model-Context-Protocol (MCP) in VS Code for an enhanced development experience.</p>
    </div>
  </a>
</div>

---
layout: page
title: VS Code Integration Presentation
---

<ClientOnly>
  <RevealPresentation />
</ClientOnly>

<script setup>
import { defineComponent, onMounted, ref } from 'vue'

const RevealPresentation = defineComponent({
  name: 'RevealPresentation',
  setup() {
    const isReady = ref(false)
    
    onMounted(async () => {
      console.log('RevealPresentation mounted');
      
      // 动态导入Reveal.js
      try {
        const [revealCss, themeCss, RevealModule] = await Promise.all([
          import('reveal.js/dist/reveal.css'),
          import('reveal.js/dist/theme/white.css'),
          import('reveal.js/dist/reveal.esm.js')
        ]);
        
        console.log('Reveal.js assets loaded');
        
        setTimeout(() => {
          initializeReveal(RevealModule.default);
        }, 100);
        
      } catch (error) {
        console.error('Error loading Reveal.js:', error);
      }
    });
    
    function initializeReveal(Reveal) {
      const revealElement = document.querySelector('.reveal-container .reveal');
      console.log('Initializing Reveal with element:', revealElement);
      
      if (!revealElement) {
        console.error('Reveal element not found');
        return;
      }
      
      try {
        const deck = new Reveal(revealElement, {
          hash: true,
          controls: true,
          progress: true,
          center: true,
          transition: 'slide'
        });
        
        deck.initialize({
          width: 1200,
          height: 700,
          margin: 0.1,
          minScale: 0.2,
          maxScale: 2.0
        }).then(() => {
          console.log('Reveal.js initialized successfully');
          console.log('Total slides:', deck.getTotalSlides());
          isReady.value = true;
        }).catch((error) => {
          console.error('Error initializing Reveal.js:', error);
        });
      } catch (error) {
        console.error('Error creating Reveal instance:', error);
      }
    }
    
    return () => {
      return h('div', { 
        class: 'reveal-container',
        style: { 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1000,
          backgroundColor: '#fff'
        }
      }, [
        h('div', { class: 'reveal' }, [
          h('div', { class: 'slides' }, [
            // Title slide
            h('section', [
              h('h1', 'VS Code Integration'),
              h('h2', 'Using VS Code as the Main Editor for Vibe Coding'),
              h('p', { style: 'font-size: 1.2em; margin-top: 2em;' }, 'Comprehensive Development Environment Setup')
            ]),
            
            // Why VS Code - Overview
            h('section', [
              h('h2', 'Why Choose VS Code (Insiders)?'),
              h('div', { style: 'text-align: left; font-size: 0.9em;' }, [
                h('h3', '🚀 Key Advantages'),
                h('ul', [
                  h('li', 'Powerful ecosystem with large active community'),
                  h('li', 'Industry standard - foundation for modern AI editors'),
                  h('li', 'Cross-language support for all development needs'),
                  h('li', 'Excellent performance and stability'),
                  h('li', 'Early access to latest features with Insiders version')
                ])
              ])
            ]),
            
            // Why VS Code - Cross-language Support
            h('section', [
              h('h2', 'Cross-Language Support'),
              h('div', { style: 'text-align: left; font-size: 0.9em;' }, [
                h('h3', '💻 Development Areas'),
                h('ul', [
                  h('li', '🌐 Frontend Development (Web)'),
                  h('li', '⚙️ Backend Development (Java, Go, Python, Node.js)'),
                  h('li', '🗄️ Database Development'),
                  h('li', '☁️ Cloud Native and DevOps'),
                  h('li', '🤖 AI-assisted development with modern editors')
                ])
              ])
            ]),
            
            // Installation and Core Plugins
            h('section', [
              h('h2', 'Installation & Core Plugins'),
              h('div', { style: 'text-align: left; font-size: 0.85em;' }, [
                h('h3', '📥 Download & Installation'),
                h('ul', [
                  h('li', 'Visit official VS Code website or get Insiders version'),
                  h('li', 'Available for Windows, macOS, and Linux')
                ]),
                h('h3', '🔧 Essential Core Plugins'),
                h('ul', [
                  h('li', '🤖 GitHub Copilot - AI programming assistant'),
                  h('li', '📊 GitLens - Enhanced Git capabilities'),
                  h('li', '📝 EditorConfig - Consistent coding styles'),
                  h('li', '✨ Prettier - Code formatter')
                ])
              ])
            ]),
            
            // Frontend Web Setup - Overview
            h('section', [
              h('h2', 'Frontend Web Development'),
              h('div', { style: 'text-align: left; font-size: 0.9em;' }, [
                h('h3', '🌐 HTML/CSS/JavaScript'),
                h('ul', [
                  h('li', 'Built-in IntelliSense and Emmet support'),
                  h('li', 'Live Server for real-time preview'),
                  h('li', 'ESLint and Stylelint for code quality')
                ]),
                h('h3', '⚛️ Framework Support'),
                h('ul', [
                  h('li', 'React, Vue, Angular extension packs'),
                  h('li', 'Debug configuration with launch.json'),
                  h('li', 'Component IntelliSense and snippets')
                ])
              ])
            ]),
            
            // Frontend Web Setup - Build Tools
            h('section', [
              h('h2', 'Frontend Build Tools'),
              h('div', { style: 'text-align: left; font-size: 0.9em;' }, [
                h('h3', '🛠️ Modern Build Systems'),
                h('ul', [
                  h('li', '📦 Webpack integration with terminal'),
                  h('li', '⚡ Vite development server support'),
                  h('li', '🔧 Build task automation'),
                  h('li', '📊 Bundle analysis and optimization')
                ]),
                h('div', { style: 'margin-top: 2em; padding: 1em; background: #f0f0f0; border-radius: 8px;' }, [
                  h('strong', '💡 Pro Tip: '),
                  h('span', 'Use integrated terminal for seamless build process management')
                ])
              ])
            ]),
            
            // Go Development Setup
            h('section', [
              h('h2', 'Go Development Setup'),
              h('div', { style: 'text-align: left; font-size: 0.9em;' }, [
                h('h3', '🔧 Installation & Configuration'),
                h('ul', [
                  h('li', 'Install official Go extension from Google team'),
                  h('li', 'Configure GOPATH and GOROOT environment variables'),
                  h('li', 'Install Go toolchain (linter, debugger, formatter)')
                ]),
                h('h3', '🚀 Core Features'),
                h('ul', [
                  h('li', '💡 Code completion and IntelliSense'),
                  h('li', '🔍 Code navigation and symbol search'),
                  h('li', '🐛 Debugging with Delve debugger'),
                  h('li', '📦 Go Modules integration')
                ])
              ])
            ]),
            
            // Java Development Setup
            h('section', [
              h('h2', 'Java Development Setup'),
              h('div', { style: 'text-align: left; font-size: 0.85em;' }, [
                h('h3', '📦 Extension Pack for Java'),
                h('ul', [
                  h('li', 'Language Support for Java by Red Hat'),
                  h('li', 'Debugger, Test Runner, Maven/Gradle support'),
                  h('li', 'Project Manager and Visual Studio IntelliCode')
                ]),
                h('h3', '⚙️ Configuration & Features'),
                h('ul', [
                  h('li', '☕ Configure JDK with java.home or JAVA_HOME'),
                  h('li', '🏗️ Create and manage Maven/Gradle projects'),
                  h('li', '🐛 Debug configuration with launch.json'),
                  h('li', '🧪 Run JUnit/TestNG tests with integrated runner')
                ])
              ])
            ]),
            
            // Python Development Setup
            h('section', [
              h('h2', 'Python Development Setup'),
              h('div', { style: 'text-align: left; font-size: 0.9em;' }, [
                h('h3', '🐍 Python Extension & Environment'),
                h('ul', [
                  h('li', 'Official Microsoft Python extension'),
                  h('li', 'Virtual environment management (venv, conda)'),
                  h('li', 'Python interpreter selection and switching')
                ]),
                h('h3', '🔧 Development Features'),
                h('ul', [
                  h('li', '📝 Code analysis with Pylint and Flake8'),
                  h('li', '🐛 Debugging with debugpy integration'),
                  h('li', '📊 Native Jupyter Notebook support'),
                  h('li', '🧪 PyTest and Unittest configuration')
                ])
              ])
            ]),
            
            // MCP Setup
            h('section', [
              h('h2', 'Model Context Protocol (MCP) Setup'),
              h('div', { style: 'text-align: left; font-size: 0.9em;' }, [
                h('h3', '🤖 MCP Integration'),
                h('ul', [
                  h('li', 'Advanced AI-assisted development protocol'),
                  h('li', 'Enhanced context understanding for better code generation'),
                  h('li', 'Seamless integration with VS Code workflow')
                ]),
                h('h3', '⚙️ Configuration Steps'),
                h('ul', [
                  h('li', '📦 Install MCP-related tools and plugins'),
                  h('li', '⚙️ Configure settings.json for optimal performance'),
                  h('li', '🔄 Set up development workflow examples'),
                  h('li', '🚀 Leverage MCP for enhanced productivity')
                ])
              ])
            ]),
            
            // Summary slide
            h('section', [
              h('h2', 'Complete Development Environment'),
              h('div', { style: 'text-align: left; font-size: 0.9em;' }, [
                h('h3', '🎯 What We\'ve Covered'),
                h('ul', [
                  h('li', '✅ VS Code installation and core plugins'),
                  h('li', '✅ Frontend web development setup'),
                  h('li', '✅ Backend development (Go, Java, Python)'),
                  h('li', '✅ Advanced MCP integration'),
                  h('li', '✅ Complete development workflow')
                ]),
                h('div', { style: 'margin-top: 2em; text-align: center; font-size: 1.2em; color: #007acc;' }, [
                  h('strong', '🚀 Ready to start your Vibe Coding journey!')
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
});

// 导入h函数
import { h } from 'vue'
</script>

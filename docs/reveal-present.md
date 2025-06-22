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
            h('section', [
              h('h1', 'VS Code Integration'),
              h('p', 'Using VS Code as the Main Editor for Vibe Coding')
            ]),
            h('section', [
              h('h2', 'Why VS Code?'),
              h('p', 'VS Code is a powerful and extensible editor')
            ]),
            h('section', [
              h('h2', 'Installation'),
              h('p', 'Installing VS Code and essential plugins')
            ]),
            h('section', [
              h('h2', 'Frontend Setup'),
              h('p', 'Frontend and web development configuration')
            ]),
            h('section', [
              h('h2', 'Go Setup'),
              h('p', 'Go development environment')
            ]),
            h('section', [
              h('h2', 'Java Setup'),
              h('p', 'Java development environment')
            ]),
            h('section', [
              h('h2', 'Python Setup'),
              h('p', 'Python development environment')
            ]),
            h('section', [
              h('h2', 'MCP Setup'),
              h('p', 'Model Context Protocol configuration')
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

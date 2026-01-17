// Gerenciador de navegação suave
export class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleNavClick(e));
    });
  }

  handleNavClick(e) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const target = document.querySelector(href);
    
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Atualizar URL sem recarregar
      window.history.pushState(null, null, href);
    }
  }
}

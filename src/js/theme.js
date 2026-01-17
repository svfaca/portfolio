// Gerenciador de modo escuro/claro
export class ThemeManager {
  constructor() {
    this.isDarkMode = false;
    this.themeToggle = document.getElementById('theme-toggle');
    this.appWrapper = document.getElementById('app-wrapper');
    this.sunIcon = document.getElementById('sun-icon');
    this.moonIcon = document.getElementById('moon-icon');
    
    this.init();
  }

  init() {
    if (!this.themeToggle) return;
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }
    
    // Ouvir cliques
    this.themeToggle.addEventListener('click', () => this.toggle());
  }

  toggle() {
    if (this.isDarkMode) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode() {
    this.isDarkMode = true;
    this.appWrapper.classList.add('dark-mode');
    this.sunIcon.classList.remove('hidden');
    this.moonIcon.classList.add('hidden');
    localStorage.setItem('theme-mode', 'dark');
  }

  disableDarkMode() {
    this.isDarkMode = false;
    this.appWrapper.classList.remove('dark-mode');
    this.sunIcon.classList.add('hidden');
    this.moonIcon.classList.remove('hidden');
    localStorage.setItem('theme-mode', 'light');
  }
}

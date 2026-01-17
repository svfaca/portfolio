// Arquivo principal de inicialização
import { ThemeManager } from './theme.js';
import { NavigationManager } from './navigation.js';
import { ConfigManager } from './config-manager.js';
import { CertificationsManager } from './certifications.js';

class Portfolio {
  constructor() {
    this.themeManager = new ThemeManager();
    this.navigationManager = new NavigationManager();
    this.configManager = new ConfigManager();
    this.certificationsManager = new CertificationsManager();
    
    this.init();
  }

  init() {
    this.configManager.applyConfig();
    this.initializeSDK();
  }

  initializeSDK() {
    // Integração com Element SDK (se disponível)
    if (window.elementSdk) {
      const config = this.configManager.getConfig();
      
      window.elementSdk.init({
        defaultConfig: config,
        onConfigChange: (newConfig) => this.configManager.updateConfig(newConfig),
        mapToCapabilities: (cfg) => this.mapToCapabilities(cfg),
        mapToEditPanelValues: (cfg) => this.mapToEditPanelValues(cfg)
      });
    }
  }

  mapToCapabilities(config) {
    return {
      recolorables: [
        {
          get: () => config.primary_color || '#10b981',
          set: (value) => {
            config.primary_color = value;
            if (window.elementSdk) {
              window.elementSdk.setConfig({ primary_color: value });
            }
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || 'Space Grotesk',
        set: (value) => {
          config.font_family = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ font_family: value });
          }
        }
      },
      fontSizeable: {
        get: () => config.font_size || 16,
        set: (value) => {
          config.font_size = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ font_size: value });
          }
        }
      }
    };
  }

  mapToEditPanelValues(config) {
    return new Map([
      ['nome', config.nome || 'Sávio Emmanuel'],
      ['titulo', config.titulo || 'Desenvolvedor Full Stack Júnior'],
      ['sobre_mim', config.sobre_mim || 'Python • FastAPI • APIs'],
      ['email', config.email || 'savioemmanuelsc@gmail.com'],
      ['telefone', config.telefone || '(21) 99784-3300'],
      ['github', config.github || 'svfaca'],
      ['linkedin', config.linkedin || 'savio-emmanuel']
    ]);
  }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
  });
} else {
  window.portfolio = new Portfolio();
}

export default Portfolio;

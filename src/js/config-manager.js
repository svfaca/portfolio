// Gerenciador de configurações dinâmicas
import { defaultConfig } from '../config/config.js';

export class ConfigManager {
  constructor(initialConfig = {}) {
    this.config = { ...defaultConfig, ...initialConfig };
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.applyConfig();
  }

  applyConfig() {
    const { nome, titulo, sobre_mim, email, telefone, github, linkedin } = this.config;
    
    // Atualizar elementos de texto
    const heroNome = document.getElementById('hero-nome');
    const heroTitulo = document.getElementById('hero-titulo');
    const heroSobre = document.getElementById('hero-sobre');
    const footerNome = document.getElementById('footer-nome');
    
    if (heroNome) heroNome.textContent = nome;
    if (heroTitulo) heroTitulo.textContent = titulo;
    if (heroSobre) heroSobre.textContent = sobre_mim;
    if (footerNome) footerNome.textContent = nome;
    
    // Atualizar contato
    this.updateContactLinks({ email, telefone, github, linkedin });
  }

  updateContactLinks({ email, telefone, github, linkedin }) {
    const emailLink = document.getElementById('email-link');
    const emailText = document.getElementById('email-text');
    if (emailLink && emailText) {
      emailText.textContent = email;
      emailLink.href = `mailto:${email}`;
    }
    
    const telefoneLink = document.getElementById('telefone-link');
    const telefoneText = document.getElementById('telefone-text');
    if (telefoneLink && telefoneText) {
      telefoneText.textContent = telefone;
      const phoneNumbers = telefone.replace(/\D/g, '');
      telefoneLink.href = `tel:+55${phoneNumbers}`;
    }
    
    const githubLink = document.getElementById('github-link');
    const githubText = document.getElementById('github-text');
    if (githubLink && githubText) {
      githubText.textContent = `@${github}`;
      githubLink.href = `https://github.com/${github}`;
    }
    
    const linkedinLink = document.getElementById('linkedin-link');
    const linkedinText = document.getElementById('linkedin-text');
    if (linkedinLink && linkedinText) {
      linkedinText.textContent = `/in/${linkedin}`;
      linkedinLink.href = `https://linkedin.com/in/${linkedin}`;
    }
  }

  getConfig() {
    return { ...this.config };
  }
}

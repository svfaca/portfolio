// Gerenciador de Certificações
import { certifications, organizationLogos } from '../config/certifications.js';

export class CertificationsManager {
  constructor() {
    this.certifications = certifications;
    this.expandedCategories = {
      tecnologia: false,
      ia: false,
      idiomas: false,
      ferramentas: false,
      softSkills: false,
      outros: false
    };
    this.itemsPerPage = 3;
    this.init();
  }

  init() {
    this.renderCertifications();
  }

  renderCertifications() {
    const categories = [
      { id: 'tecnologia', selector: '#tecnologia-certs', label: 'Tecnologia & Computação' },
      { id: 'ia', selector: '#ia-certs', label: 'Inteligência Artificial' },
      { id: 'idiomas', selector: '#idiomas-certs', label: 'Idiomas' },
      { id: 'ferramentas', selector: '#ferramentas-certs', label: 'Ferramentas & Conformidade' },
      { id: 'softSkills', selector: '#softskills-certs', label: 'Soft Skills' },
      { id: 'outros', selector: '#outros-certs', label: 'Outros' }
    ];

    categories.forEach(category => {
      const container = document.querySelector(category.selector);
      if (container && this.certifications[category.id]) {
        const certs = this.certifications[category.id];
        this.renderCategoryCards(container, certs, category.id);
      }
    });
  }

  renderCategoryCards(container, certs, categoryId) {
    const isExpanded = this.expandedCategories[categoryId];
    const visibleCerts = isExpanded ? certs : certs.slice(0, this.itemsPerPage);
    const hasMore = certs.length > this.itemsPerPage;

    let html = visibleCerts.map(cert => this.createCertCard(cert)).join('');

    if (hasMore) {
      html += this.createViewMoreButton(categoryId, isExpanded, certs.length);
    }

    container.innerHTML = html;

    // Adicionar event listeners aos botões de "Ver mais"
    const toggleBtn = container.parentElement?.querySelector(`[data-toggle-category="${categoryId}"]`);
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCategory(categoryId);
      });
    }
  }

  createViewMoreButton(categoryId, isExpanded, totalCount) {
    const hiddenCount = totalCount - this.itemsPerPage;
    const buttonText = isExpanded ? 'Ver menos' : `Ver mais (${hiddenCount})`;

    return `
      <div class="col-span-full flex justify-center mt-4">
        <button 
          data-toggle-category="${categoryId}" 
          class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-full font-medium hover:shadow-lg hover:shadow-emerald-400/50 transition-all inline-flex items-center gap-2"
        >
          ${buttonText}
          <svg class="w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    `;
  }

  toggleCategory(categoryId) {
    this.expandedCategories[categoryId] = !this.expandedCategories[categoryId];
    
    const categories = [
      { id: 'tecnologia', selector: '#tecnologia-certs' },
      { id: 'ia', selector: '#ia-certs' },
      { id: 'idiomas', selector: '#idiomas-certs' },
      { id: 'ferramentas', selector: '#ferramentas-certs' },
      { id: 'softSkills', selector: '#softskills-certs' },
      { id: 'outros', selector: '#outros-certs' }
    ];

    const category = categories.find(c => c.id === categoryId);
    if (category) {
      const container = document.querySelector(category.selector);
      if (container && this.certifications[categoryId]) {
        const certs = this.certifications[categoryId];
        this.renderCategoryCards(container, certs, categoryId);
      }
    }
  }

  createCertCard(cert) {
    const isLink = cert.tipo === 'link';
    const isPDF = cert.tipo === 'pdf';
    
    let href = '#';
    if (isLink) {
      href = cert.url;
    } else if (isPDF) {
      href = `assets/images/certificacoes/${cert.arquivo}`;
    }

    const icon = this.getIconByCert(cert.nome);
    const logoUrl = organizationLogos[cert.instituicao];
    
    // Se tiver logo, usar como background
    const hasLogo = logoUrl ? true : false;
    const backgroundStyle = hasLogo ? `background-image: url('${logoUrl}'); background-size: cover; background-position: center;` : '';
    const overlayClass = hasLogo ? 'bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent' : '';
    
    return `
      <a href="${href}" ${(isLink || isPDF) ? 'target="_blank" rel="noopener noreferrer"' : ''} class="glass-card rounded-xl overflow-hidden card-hover group block h-full hover:border-emerald-400/50 relative">
        <div class="absolute inset-0" style="${backgroundStyle}"></div>
        <div class="absolute inset-0 ${overlayClass}"></div>
        
        <div class="relative z-10 flex flex-col h-full p-6">
          ${!hasLogo ? `
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mb-3">
              ${icon}
            </div>
          ` : ''}
          
          <div class="flex-1 flex flex-col justify-end">
            <h3 class="text-base font-bold ${hasLogo ? 'text-white' : 'text-slate-800'} mb-2 group-hover:${hasLogo ? 'text-emerald-300' : 'text-emerald-600'} transition-colors line-clamp-2">${cert.nome}</h3>
            <p class="text-${hasLogo ? 'gray' : 'slate'}-${hasLogo ? '300' : '600'} text-xs mb-1">${cert.instituicao}</p>
            <p class="text-${hasLogo ? 'gray' : 'slate'}-${hasLogo ? '400' : '500'} text-xs font-mono mb-3">${cert.data}</p>
            
            <div class="w-full pt-2 border-t ${hasLogo ? 'border-slate-400/30' : 'border-slate-200'}">
              <span class="text-${hasLogo ? 'emerald' : 'emerald'}-${hasLogo ? '300' : '600'} text-xs font-semibold inline-flex items-center gap-1">
                ${isPDF ? '📄 Ver Certificado' : 'Link'}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  getIconByCert(nome) {
    const nameLower = nome.toLowerCase();

    if (nameLower.includes('bacharelado')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z" /></svg>';
    }
    if (nameLower.includes('ciência de dados') || nameLower.includes('power bi') || nameLower.includes('análise')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>';
    }
    if (nameLower.includes('web') || nameLower.includes('low-code') || nameLower.includes('desenvolvimento')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>';
    }
    if (nameLower.includes('robótica') || nameLower.includes('microcontrolador') || nameLower.includes('drone')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>';
    }
    if (nameLower.includes('segurança') || nameLower.includes('cibernética')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>';
    }
    if (nameLower.includes('ia') || nameLower.includes('inteligência artificial') || nameLower.includes('ia generativa')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>';
    }
    if (nameLower.includes('inglês') || nameLower.includes('idioma')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>';
    }
    if (nameLower.includes('excel')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>';
    }
    if (nameLower.includes('lgpd') || nameLower.includes('proteção de dados')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>';
    }
    if (nameLower.includes('soft skills') || nameLower.includes('habilidades')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>';
    }
    if (nameLower.includes('primeiros socorros') || nameLower.includes('samu')) {
      return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    }

    // Default icon
    return '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>';
  }
}

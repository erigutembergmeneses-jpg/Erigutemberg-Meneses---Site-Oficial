/**
 * Site Profissional - Dr. Erigutemberg Meneses
 * Funcionalidades: Filtro de obras, menu mobile, scroll suave, interações
 */

// ============================================
// BASE DE DADOS DAS OBRAS
// ============================================
const obrasData = [
  {
    id: 1,
    titulo: "Direito e Mercado: Fundamentos para uma Advocacia Econômica",
    tipo: "livro",
    ano: "2022",
    editora: "Editora Jurídica Brasileira",
    descricao: "Análise interdisciplinar entre direito antitruste e economia comportamental. Best-seller acadêmico com mais de 5 mil exemplares vendidos."
  },
  {
    id: 2,
    titulo: "A Construção da Riqueza Ética",
    tipo: "livro",
    ano: "2020",
    editora: "Editora Planeta",
    descricao: "Ensaio sobre finanças pessoais, investimentos com propósito e responsabilidade social empresarial."
  },
  {
    id: 3,
    titulo: "Crise e Oportunidade: Perspectivas Pós-Pandemia",
    tipo: "artigo",
    ano: "2021",
    veiculo: "Revista de Economia Contemporânea (USP)",
    descricao: "Artigo acadêmico sobre políticas fiscais, recuperação econômica e novos paradigmas de desenvolvimento."
  },
  {
    id: 4,
    titulo: "O Silêncio das Leis: Romance Jurídico",
    tipo: "livro",
    ano: "2018",
    editora: "Editora Record",
    descricao: "Ficção envolvente sobre bastidores do sistema judiciário, dilemas morais e a busca pela justiça."
  },
  {
    id: 5,
    titulo: "Direito Tributário e Eficiência Econômica",
    tipo: "artigo",
    ano: "2023",
    veiculo: "Revista dos Tribunais",
    descricao: "Estudo aprofundado sobre simplificação fiscal, neutralidade tributária e impacto no desenvolvimento."
  },
  {
    id: 6,
    titulo: "Economia Comportamental nos Contratos",
    tipo: "artigo",
    ano: "2022",
    veiculo: "Cadernos de Direito Privado (FGV)",
    descricao: "Abordagem inovadora sobre vícios de consentimento, nudges e teoria dos contratos."
  },
  {
    id: 7,
    titulo: "Pensamento Sistêmico: Ensaios de um Economista Atípico",
    tipo: "livro",
    ano: "2024",
    editora: "Editora Intrínseca",
    descricao: "Coletânea de crônicas econômicas, críticas sociais e reflexões sobre sustentabilidade."
  },
  {
    id: 8,
    titulo: "Reforma do Estado e Sustentabilidade",
    tipo: "artigo",
    ano: "2020",
    veiculo: "Jornal O Estado / Caderno Opinião",
    descricao: "Análise sobre governança pública, políticas verdes e eficiência administrativa."
  },
  {
    id: 9,
    titulo: "Direito e Desenvolvimento: Uma Abordagem Multidisciplinar",
    tipo: "livro",
    ano: "2021",
    editora: "Editora Saraiva",
    descricao: "Coletânea organizada com ensaios de juristas e economistas sobre institutos de fomento."
  }
];

// ============================================
// RENDERIZAÇÃO DAS OBRAS (FILTRO)
// ============================================
function renderObras(filterType = "all") {
  const container = document.getElementById("obrasContainer");
  if (!container) return;

  let filtered = [...obrasData];
  if (filterType !== "all") {
    filtered = obrasData.filter(item => item.tipo === filterType);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; background: white; border-radius: 24px;">
        <i class="fas fa-book-open" style="font-size: 2.5rem; color: var(--accent-gold, #d4af7a); margin-bottom: 1rem; display: inline-block;"></i>
        <p style="color: var(--text-muted);">Nenhuma obra encontrada nesta categoria.</p>
      </div>
    `;
    return;
  }

  let html = '<div style="display: flex; flex-direction: column; gap: 1.2rem;">';
  filtered.forEach(obra => {
    const tipoLabel = obra.tipo === "livro" ? "📖 Livro" : "📄 Artigo / Ensaio";
    
    let metaInfo = "";
    if (obra.tipo === "livro") {
      metaInfo = `
        <span><i class="fas fa-building"></i> ${obra.editora}</span>
        <span><i class="far fa-calendar-alt"></i> ${obra.ano}</span>
      `;
    } else {
      metaInfo = `
        <span><i class="fas fa-newspaper"></i> ${obra.veiculo}</span>
        <span><i class="far fa-calendar-alt"></i> ${obra.ano}</span>
      `;
    }

    html += `
      <div class="obra-item" data-id="${obra.id}">
        <h3>
          ${obra.titulo}
          <span class="obra-tag">${tipoLabel}</span>
        </h3>
        <div class="obra-meta">${metaInfo}</div>
        <p class="obra-desc">${obra.descricao}</p>
        <button class="btn-detalhe" data-titulo="${obra.titulo.replace(/['"]/g, '&quot;')}">
          <i class="fas fa-arrow-right"></i> Saiba mais
        </button>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;

  // Reatribuir eventos aos botões "Saiba mais"
  document.querySelectorAll('.btn-detalhe').forEach(btn => {
    btn.removeEventListener('click', handleDetalheClick);
    btn.addEventListener('click', handleDetalheClick);
  });
}

function handleDetalheClick(e) {
  const btn = e.currentTarget;
  const titulo = btn.getAttribute('data-titulo') || "esta obra";
  alert(`📚 Mais informações sobre: ${titulo}\n\nEntre em contato para adquirir o exemplar, acessar o texto completo ou solicitar palestra sobre o tema.\n\n📧 contato@erigutembergmenezes.com.br`);
}

// ============================================
// FILTROS DE OBRAS (INTERATIVIDADE)
// ============================================
function initFilters() {
  const btns = document.querySelectorAll(".filter-btn");
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener("click", function () {
      const filterVal = this.getAttribute("data-filter");
      btns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      renderObras(filterVal);
    });
  });
}

// ============================================
// MENU MOBILE (TOGGLE)
// ============================================
function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    const icon = menuBtn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  });

  // Fechar menu ao clicar em qualquer link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  });
}

// ============================================
// SCROLL SUAVE PARA LINKS INTERNOS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 80; // altura do navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
}

// ============================================
// HEADER SCROLL EFFECT (OPCIONAL)
// ============================================
function initScrollHeader() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
    } else {
      navbar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
    }
  });
}

// ============================================
// ANIMAÇÃO DE ENTRADA (OBSERVER - OPCIONAL)
// ============================================
function initScrollAnimation() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".card, .obra-item, .sobre-text, .contato-flex").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Render inicial (todas as obras)
  renderObras("all");
  
  // Inicializar módulos
  initFilters();
  initMobileMenu();
  initSmoothScroll();
  initScrollHeader();
  initScrollAnimation();

  // Pequena correção: garantir que o container de obras existe
  console.log("Site Dr. Erigutemberg Meneses - Carregado com sucesso!");
});

// Export para possíveis testes (opcional)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { renderObras, obrasData };
}

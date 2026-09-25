/**
 * PRDF (Patra Research & Development Foundation)
 * Interactive Client Demo Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initNavSpy();
  initFocusAreasModal();
  initProgrammesModal();
  initGetInvolvedModal();
});

/* ==========================================================================
   Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Mobile Drawer Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openMenu() {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   Scroll Reveal Animations via IntersectionObserver
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    elements.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   Active Navigation Spy
   ========================================================================== */
function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if (!sections.length || !navLinks.length) return;

  const handleScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ==========================================================================
   Focus Areas Data & Modal
   ========================================================================== */
const focusAreaData = {
  '01': {
    title: 'Sustainable Agriculture & Horticulture',
    theme: 'Crop Diversification, Soil Regeneration & Organic Cultivation',
    image: 'assets/images/anner-agriculture.jpg',
    description: 'Promoting climate-smart farming, soil revitalization, integrated nutrient and pest management, high-value horticulture clusters, and farmer producer organization (FPO) capacity building across rural Odisha.',
    keyPoints: [
      'Dissemination of drought-resilient and organic agronomic techniques',
      'Establishment of decentralized community horticulture nurseries',
      'Farmer field schools connecting traditional practices with scientific agronomy',
      'Post-harvest value addition and structured market linkages'
    ]
  },
  '02': {
    title: 'Women Empowerment',
    theme: 'Self-Help Groups, Micro-Enterprises & Leadership',
    image: 'assets/images/women-empowerment2.jpg',
    description: 'Enabling rural women to become independent producers, entrepreneurs, and community leaders through federated Self-Help Groups (SHGs), financial literacy, and collective bargaining.',
    keyPoints: [
      'Comprehensive enterprise incubation for women-led village collectives',
      'Access to institutional microfinance and credit linkage systems',
      'Capacity building in bookkeeping, digital transactions, and governance',
      'Nutrition and health advocacy within grassroots women federations'
    ]
  },
  '03': {
    title: 'Livelihood & Enterprise Development',
    theme: 'Rural Income Generation, Non-Timber Forest Produce & Artisans',
    image: 'assets/images/about-us-image-1-gold.jpg',
    description: 'Fostering diversified income streams for marginal households through non-timber forest produce (NTFP), agro-processing units, handicrafts, and rural enterprise clusters.',
    keyPoints: [
      'Value addition and quality standardization for forest and farm produce',
      'Producer collective formation and localized processing facilities',
      'Direct fair-trade market access reducing intermediary exploitation',
      'Household economic resilience through multi-tier income portfolios'
    ]
  },
  '04': {
    title: 'Health & Nutrition',
    theme: 'Preventive Healthcare, Maternal Nutrition & Water Sanitation',
    image: 'assets/images/anner-health.jpg',
    description: 'Strengthening grassroots healthcare awareness, nutritional security for mothers and children, clean water access, and community-level preventive hygiene interventions.',
    keyPoints: [
      'Nutri-gardens in rural homesteads to combat micronutrient deficiencies',
      'Maternal, infant, and adolescent health awareness campaigns',
      'Safe drinking water purification and community sanitation drives',
      'Integration with local frontline health workers (ASHA/Anganwadi)'
    ]
  },
  '05': {
    title: 'Research & Innovation',
    theme: 'Evidence-Based Studies, Action Pilots & Technology Transfer',
    image: 'assets/images/agriculture-1.jpg',
    description: 'Bridging laboratory research and rural field reality. Conducting action research, trial pilots of low-cost agricultural machinery, and participatory rural technology demonstrations.',
    keyPoints: [
      'Applied field trials for indigenous crop varieties and soil amendments',
      'Documentation of traditional ecological knowledge and bio-resources',
      'Collaborative research with agricultural universities and research councils',
      'Open-access knowledge dissemination toolkits for extension workers'
    ]
  },
  '06': {
    title: 'Environment & Climate Action',
    theme: 'Agroforestry, Water Stewardship & Ecological Restoration',
    image: 'assets/images/anner-environment.jpg',
    description: 'Protecting rural ecosystems against climate shocks through indigenous tree plantation, community water harvesting, carbon-smart agriculture, and biodiversity preservation.',
    keyPoints: [
      'Community-managed watershed restoration and pond rejuvenation',
      'Agroforestry systems integrating native timber and fruit species',
      'Promotion of clean renewable energy for farm irrigation and processing',
      'Biodiversity register documentation with indigenous village councils'
    ]
  },
  '07': {
    title: 'Skill Development',
    theme: 'Vocational Training, Youth Agribusiness & Digital Literacy',
    image: 'assets/images/anner-skill.jpg',
    description: 'Equipping rural youth with certified vocational capabilities, farm-machinery maintenance skills, digital literacy, and agribusiness management to stem distress migration.',
    keyPoints: [
      'Hands-on vocational training centers in rural growth corridors',
      'Agribusiness management courses for progressive young farmers',
      'Digital literacy programs enabling access to agricultural advisories',
      'Apprenticeships and direct placement linkages in regional enterprises'
    ]
  },
  '08': {
    title: 'Education',
    theme: 'Rural Foundational Learning, Digital Classrooms & STEM',
    image: 'assets/images/1.jpg',
    description: 'Strengthening foundational literacy, digital learning access, and educational equity for children in remote and tribal habitations across Odisha.',
    keyPoints: [
      'Community learning centers supporting after-school educational enrichment',
      'Digital learning tools and STEM curiosity workshops for rural students',
      'Scholarship guidance and career counseling for first-generation learners',
      'Parent and village education committee sensitization'
    ]
  }
};

function initFocusAreasModal() {
  const modal = document.getElementById('detailsModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTheme = document.getElementById('modalTheme');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalList = document.getElementById('modalList');
  const closeBtn = document.getElementById('modalCloseBtn');
  const cards = document.querySelectorAll('.focus-card');

  if (!modal || !cards.length) return;

  function openFocusModal(id) {
    const data = focusAreaData[id];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalTheme.textContent = data.theme;
    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalDesc.textContent = data.description;

    modalList.innerHTML = '';
    data.keyPoints.forEach(pt => {
      const li = document.createElement('li');
      li.textContent = pt;
      modalList.appendChild(li);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-focus-id');
      openFocusModal(id);
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Programmes Data & Modal
   ========================================================================== */
const programmesData = {
  '01': {
    title: 'Women Agri-Entrepreneur Development Program',
    theme: 'Women Empowerment & Agribusiness',
    image: 'assets/images/women-empowerment2.jpg',
    description: 'Designed to transform women smallholders into independent agri-entrepreneurs through collective nursery management, organic vegetable cultivation, and micro-processing clusters.',
    scope: 'Mobilizes women SHGs across participating blocks with training in business management, value addition, and direct supply contracts.'
  },
  '02': {
    title: 'Sustainable Livelihood Development',
    theme: 'Rural Economy & Household Security',
    image: 'assets/images/about-us-image-1-gold.jpg',
    description: 'An integrated multi-tier livelihood intervention targeting marginal tribal and rural families to establish stable, year-round income streams.',
    scope: 'Combines agro-horticulture, backyard poultry, goat rearing, and micro-enterprise incubation customized to local ecological zones.'
  },
  '03': {
    title: 'Integrated Horticulture Development',
    theme: 'High-Value Farming & Orchard Systems',
    image: 'assets/images/anner-agriculture.jpg',
    description: 'Promoting fruit orchards, vegetable clustering, and drip-irrigation management to maximize returns on small family landholdings.',
    scope: 'Provides elite planting material, soil health testing, micro-irrigation training, and collective post-harvest grading centers.'
  },
  '04': {
    title: 'Medicinal Plant Promotion',
    theme: 'Bio-Resource Conservation & Value Chains',
    image: 'assets/images/anner-environment.jpg',
    description: 'Cultivation, sustainable harvesting, and ethical marketing of indigenous medicinal plants in forest fringe and tribal areas.',
    scope: 'Protects natural flora from over-extraction while securing buy-back agreements with pharmaceutical and herbal processing partners.'
  },
  '05': {
    title: 'Millet Value Addition',
    theme: 'Nutritional Security & Climate Resilience',
    image: 'assets/images/agriculture-2.jpg',
    description: 'Revitalizing traditional climate-resilient millets through localized processing, packaging, and branding by rural collectives.',
    scope: 'Installs village-level de-hullers and flour mills, empowering local producers to capture retail margins rather than selling raw grain.'
  },
  '06': {
    title: 'Forest Produce Processing',
    theme: 'Non-Timber Forest Products (NTFP)',
    image: 'assets/images/env-3.jpg',
    description: 'Supporting tribal forest gatherers with scientific harvesting protocols, primary processing, and collective trade linkage for forest goods.',
    scope: 'Eliminates distress selling of honey, sal leaves, tamarind, and lac by establishing community storage and value-addition hubs.'
  },
  '07': {
    title: 'Climate Smart Agriculture',
    theme: 'Soil Rejuvenation & Climate Adaptation',
    image: 'assets/images/agriculture-1.jpg',
    description: 'Equipping farmers with weather-indexed advisories, zero-tillage methods, bio-fertilizers, and water-efficient cultivation.',
    scope: 'Conducts on-farm demonstration plots showing the productivity and resilience gains of regenerative farming practices.'
  },
  '08': {
    title: 'Rural Innovation Labs',
    theme: 'Applied Technology & Grassroots Solutions',
    image: 'assets/images/agricilture3.jpg',
    description: 'Open spaces where rural innovators, youth, and technical experts collaborate on simple, affordable farm tools and processing devices.',
    scope: 'Focuses on testing low-cost weeding equipment, solar dryers, bio-pesticide concoctors, and micro-irrigation automations.'
  },
  '09': {
    title: 'Youth Entrepreneurship',
    theme: 'Agribusiness Enterprise & Rural Retention',
    image: 'assets/images/anner-skill.jpg',
    description: 'Incubating rural youth in viable agribusiness models including custom hiring centers for farm machinery, bio-input production, and agri-logistics.',
    scope: 'Offers structured mentorship, business plan preparation, seed-capital assistance, and digital marketing onboarding.'
  },
  '10': {
    title: 'Skill Development Centers',
    theme: 'Certified Vocational & Technical Training',
    image: 'assets/images/skill2.jpg',
    description: 'Decentralized rural training institutes offering certified skill programs tailored to regional economic opportunities.',
    scope: 'Courses include electrical and pump maintenance, agro-machinery repair, modern plumbing, food safety handling, and computer literacy.'
  }
};

function initProgrammesModal() {
  const rows = document.querySelectorAll('.programme-row');
  const modal = document.getElementById('detailsModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTheme = document.getElementById('modalTheme');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalList = document.getElementById('modalList');

  if (!modal || !rows.length) return;

  rows.forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-prog-id');
      const data = programmesData[id];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalTheme.textContent = data.theme;
      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalDesc.textContent = data.description;

      modalList.innerHTML = `
        <li><strong>Program Focus:</strong> ${data.theme}</li>
        <li><strong>Strategic Scope:</strong> ${data.scope}</li>
        <li><strong>Implementation:</strong> Community-Led Participatory Model</li>
        <li><strong>Status:</strong> Ongoing Grassroots Engagement</li>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ==========================================================================
   "Get Involved" Partnership Modal & Form Handling
   ========================================================================== */
function initGetInvolvedModal() {
  const modal = document.getElementById('getInvolvedModal');
  const closeBtn = document.getElementById('involvedCloseBtn');
  const openButtons = document.querySelectorAll('.btn-open-involved');
  const form = document.getElementById('involvedForm');
  const toast = document.getElementById('toastNotice');

  if (!modal) return;

  const openModal = (roleDefault = '') => {
    if (roleDefault && form) {
      const select = form.querySelector('#inquiryType');
      if (select) select.value = roleDefault;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.getAttribute('data-role') || '';
      openModal(role);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#userName').value.trim();
      const org = form.querySelector('#userOrg').value.trim();

      // Show toast
      showToast(`Thank you, ${name || 'Friend'}! Your inquiry for PRDF has been received. Our team will connect with you.`);

      form.reset();
      closeModal();
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

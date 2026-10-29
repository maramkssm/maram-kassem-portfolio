/**
 * Maram Kassem — Luxury Editorial AI Portfolio
 * TypeScript native DOM interactions, modal controllers, and navigation logic
 */

import './index.css';

interface ProjectDetail {
  id: string;
  number: string;
  kicker: string;
  title: string;
  image: string;
  description: string;
  context: string;
  methodology: string[];
  technologies: string[];
  keyOutcomes: string;
}

const projectsData: Record<string, ProjectDetail> = {
  ecobuild: {
    id: 'ecobuild',
    number: '01',
    kicker: 'Computer Vision & Sustainability',
    title: 'EcoBuild AI',
    image: '/src/assets/images/project_ecobuild_ai_1793297889218.jpg',
    description: 'An AI-assisted construction-waste valorization project using computer vision to identify construction materials and support reuse and recycling decisions.',
    context: 'Academic applied artificial intelligence project focused on circular economy challenges in modern urban construction environments.',
    methodology: [
      'Visual dataset collection and annotation of construction demolition debris (rebar, timber, concrete, gypsum).',
      'YOLO convolutional object detection pipeline adapted for multi-class identification in varied lighting conditions.',
      'Classification decision matrix routing reusable structural materials to recovery pipelines versus aggregate recycling.',
      'Automated visual volume estimation to calculate salvageable weight fractions and diversion metrics.'
    ],
    technologies: ['Python', 'Computer Vision', 'YOLO', 'Data Analysis', 'OpenCV'],
    keyOutcomes: 'Provides automated material categorization from standard site photography, helping reduce landfill contributions through timely salvage identification.'
  },
  ml: {
    id: 'ml',
    number: '02',
    kicker: 'Model Training & Statistical Modeling',
    title: 'Machine Learning & Data Analysis',
    image: '/src/assets/images/project_ml_analytics_1793297890040.jpg',
    description: 'An academic machine learning workflow involving data exploration, preprocessing, model training, and evaluation.',
    context: 'Comprehensive end-to-end predictive modeling laboratory investigating supervised classification algorithms, feature importance, and diagnostic performance metrics.',
    methodology: [
      'Exploratory data analysis (EDA) with distribution diagnostics, missing-value imputation, and variance filtering.',
      'Feature engineering: normalization, categorical one-hot encoding, and correlation matrix pruning.',
      'Model training with cross-validation across tree-based ensembles, support vector machines, and linear estimators.',
      'Evaluation via precision-recall curves, confusion matrices, and ROC-AUC analysis.'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Matplotlib'],
    keyOutcomes: 'Demonstrated rigorous experimental methodology, reproducible workflows, and statistical validation of model generalization.'
  },
  web: {
    id: 'web',
    number: '03',
    kicker: 'Interactive Client Interfaces',
    title: 'Web Development',
    image: '/src/assets/images/project_web_dev_1793297889936.jpg',
    description: 'Web development projects focused on building responsive interfaces and practical digital applications.',
    context: 'Design-driven modern web projects combining semantic structure, clean user interaction patterns, and responsive layouts.',
    methodology: [
      'Component-driven architecture prioritizing semantic HTML and accessible ARIA attributes.',
      'Responsive design systems built using CSS custom properties, fluid typographic clamps, and CSS Grid.',
      'Client-side state management, async data fetching, and native browser API integrations.',
      'Cross-browser performance optimization and strict adherence to zero-dependency principles.'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular'],
    keyOutcomes: 'Delivered intuitive, performant interfaces with fluid mobile layouts, accessible focus management, and elegant micro-interactions.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Mobile drawer controls
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section indicator in navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // Modal Dialog Controller
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-button');
  const modalNumber = document.getElementById('modal-project-number');
  const modalKicker = document.getElementById('modal-project-kicker');
  const modalTitle = document.getElementById('modal-project-title');
  const modalImage = document.getElementById('modal-project-image') as HTMLImageElement | null;
  const modalDesc = document.getElementById('modal-project-desc');
  const modalContext = document.getElementById('modal-project-context');
  const modalMethodology = document.getElementById('modal-project-methodology');
  const modalOutcomes = document.getElementById('modal-project-outcomes');
  const modalTags = document.getElementById('modal-project-tags');

  function openProjectModal(projectId: string) {
    const data = projectsData[projectId];
    if (!data || !modalBackdrop) return;

    if (modalNumber) modalNumber.textContent = `${data.number} · CASE STUDY`;
    if (modalKicker) modalKicker.textContent = data.kicker;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalImage) {
      modalImage.src = data.image;
      modalImage.alt = `${data.title} preview illustration`;
    }
    if (modalDesc) modalDesc.textContent = data.description;
    if (modalContext) modalContext.textContent = data.context;

    if (modalMethodology) {
      modalMethodology.innerHTML = '';
      data.methodology.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        li.style.marginBottom = '0.4rem';
        modalMethodology.appendChild(li);
      });
    }

    if (modalOutcomes) modalOutcomes.textContent = data.keyOutcomes;

    if (modalTags) {
      modalTags.innerHTML = '';
      data.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'modal-tag';
        tag.textContent = tech;
        modalTags.appendChild(tag);
      });
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind project cards
  const projectCards = document.querySelectorAll<HTMLElement>('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked directly on an external anchor
      const target = e.target as HTMLElement;
      if (target.closest('a[target="_blank"]')) return;

      const projectId = card.dataset.project;
      if (projectId) {
        openProjectModal(projectId);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.dataset.project;
        if (projectId) {
          openProjectModal(projectId);
        }
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // Copy email affordance
  const copyEmailBtn = document.getElementById('copy-email-button');
  const toast = document.getElementById('editorial-toast');

  if (copyEmailBtn && toast) {
    copyEmailBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'kassem.maram@outlook.com';
      try {
        await navigator.clipboard.writeText(email);
        toast.textContent = 'Email address copied to clipboard';
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3200);
      } catch (err) {
        // Fallback for browsers with restricted clipboard
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

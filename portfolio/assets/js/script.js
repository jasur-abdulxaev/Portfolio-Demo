/*------------------------------------------------------------------
[Master Script]

Project:    Mukammal Shaxsiy Portfolio (vCard style)
Version:    1.0.0
Author:     Anvar Rahimov
Last change: 20-July-2026
-------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {

  /*=========================================
  1. PRELOADER
  =========================================*/
  const preloader = document.getElementById('preloader');
  
  if (preloader) {
    window.addEventListener('load', () => {
      // Bir oz kechikish orqali animatsiya ko'rinishini silliq qilamiz
      setTimeout(() => {
        preloader.classList.add('fade-out');
        preloader.setAttribute('aria-hidden', 'true');
      }, 600);
    });

    // Agar yuklanish hodisasi allaqachon sodir bo'lgan bo'lsa (masalan, keshdan)
    if (document.readyState === 'complete') {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        preloader.setAttribute('aria-hidden', 'true');
      }, 600);
    }
  }

  /*=========================================
  1.5. DYNAMIC BACKGROUND
  =========================================*/
  const dynamicBg = document.getElementById('dynamic-bg');
  
  const updateDynamicBackground = () => {
    if (!dynamicBg) return;
    
    const hour = new Date().getHours();
    let bgUrl = '';
    
    // Kun qismiga qarab fon rasmini aniqlaymiz:
    // ertalab (5:00 - 11:59), kunduzi (12:00 - 17:59), kechqurun (18:00 - 20:59), kechasi (21:00 - 4:59)
    if (hour >= 5 && hour < 12) {
      // Ertalab (Sunrise / Soft light)
      bgUrl = 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1920&auto=format&fit=crop';
      console.log('Dynamic Background: Ertalabki rejim faollashtirildi.');
    } else if (hour >= 12 && hour < 18) {
      // Kunduzi (Bright / Sunny day)
      bgUrl = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop';
      console.log('Dynamic Background: Kunduzgi rejim faollashtirildi.');
    } else if (hour >= 18 && hour < 21) {
      // Kechqurun (Sunset / Warm sunset colors)
      bgUrl = 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1920&auto=format&fit=crop';
      console.log('Dynamic Background: Kechqurungi rejim faollashtirildi.');
    } else {
      // Kechasi (Starry Night / Dark theme)
      bgUrl = 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1920&auto=format&fit=crop';
      console.log('Dynamic Background: Tungi rejim faollashtirildi.');
    }
    
    dynamicBg.style.backgroundImage = `url('${bgUrl}')`;
  };

  // Fon rasmini dastlabki yuklash
  updateDynamicBackground();
  
  // Har 5 daqiqada vaqtni tekshirib yangilab turish
  setInterval(updateDynamicBackground, 5 * 60 * 1000);


  /*=========================================
  2. SIDEBAR TOGGLE (MOBIL & PLANSHET)
  =========================================*/
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');

  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      const isExpanded = sidebar.classList.contains('active');
      sidebarBtn.setAttribute('aria-expanded', isExpanded);
      
      // Tugma matnini almashtirish
      const btnText = sidebarBtn.querySelector('span');
      if (btnText) {
        btnText.textContent = isExpanded ? 'Kontaktlarni yashirish' : 'Kontaktlarni ko\'rsatish';
      }
    });
  }


  /*=========================================
  3. SPA TAB NAVIGATION
  =========================================*/
  const navButtons = document.querySelectorAll('[data-nav-btn]');
  const sections = document.querySelectorAll('[data-page]');

  // Tab almashtirish funksiyasi
  const navigateToSection = (sectionId) => {
    // 1. Navbar tugmalarining aktiv holatini yangilash
    navButtons.forEach(btn => {
      if (btn.getAttribute('data-nav-btn') === sectionId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 2. Bo'limlarni yashirish va faqat aktiv bo'limni ko'rsatish
    sections.forEach(section => {
      if (section.getAttribute('data-page') === sectionId) {
        section.classList.add('active');
        // Sahifani yuqoriga aylantirish (mobil moslashuv uchun qulay)
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Agar rezyume sahifasi bo'lsa, progress-barlarni animatsiya qilamiz
        if (sectionId === 'resume') {
          animateSkillsProgress();
        }
      } else {
        section.classList.remove('active');
      }
    });
  };

  // Har bir navigatsiya tugmasiga bosish hodisasini qo'shish
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.getAttribute('data-nav-btn');
      navigateToSection(targetSection);
    });
  });


  /*=========================================
  4. RESUME - SKILLS PROGRESS ANIMATION
  =========================================*/
  const skillsSection = document.querySelector('.skills');
  let hasAnimatedSkills = false;

  const animateSkillsProgress = () => {
    // Agar oldin animatsiya bajarilgan bo'lsa, qayta bajarmaslik ham mumkin
    // Lekin foydalanuvchiga ta'sirliroq ko'rinishi uchun har safar kirganda ishlatamiz.
    const progressBars = document.querySelectorAll('.skills__progress-bar');
    const percentLabels = document.querySelectorAll('.skills__percent');

    progressBars.forEach((bar, idx) => {
      const targetPercent = percentLabels[idx].getAttribute('data-target-value');
      bar.style.width = '0%'; // Dastlab 0% qilamiz
      
      // Kichik kechikish bilan foizni to'ldiramiz
      setTimeout(() => {
        bar.style.width = `${targetPercent}%`;
        
        // Matndagi foizni noldan boshlab sanab oshiramiz
        let startVal = 0;
        const duration = 1500; // 1.5 soniya
        const stepTime = Math.abs(Math.floor(duration / targetPercent));
        
        const timer = setInterval(() => {
          startVal++;
          percentLabels[idx].textContent = `${startVal}%`;
          if (startVal >= targetPercent) {
            clearInterval(timer);
          }
        }, stepTime);

      }, 100);
    });
    hasAnimatedSkills = true;
  };


  /*=========================================
  5. PORTFOLIO FILTER SYSTEM
  =========================================*/
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const selectBtn = document.querySelector('[data-select-btn]');
  const selectBox = document.querySelector('[data-select-box]');
  const selectOptions = document.querySelectorAll('[data-select-option]');
  const selectValue = document.querySelector('[data-select-value]');
  const projectItems = document.querySelectorAll('[data-portfolio-grid] [data-category]');

  // Filtrlash funksiyasi
  const filterProjects = (selectedValue) => {
    projectItems.forEach(item => {
      const projectCat = item.getAttribute('data-category');
      
      if (selectedValue === 'all' || selectedValue === projectCat) {
        item.style.display = 'block';
        item.style.animation = 'filterAnim 0.3s ease-out forwards';
      } else {
        item.style.display = 'none';
      }
    });
  };

  // Desktop/Planshet filtri (Tugmalar orqali)
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Aktiv klassni o'zgartirish
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter-btn');
      filterProjects(filterVal);

      // Mobil dropdown qiymatini ham sinxronlash
      if (selectValue) {
        const optionTxt = Array.from(selectOptions).find(opt => opt.getAttribute('data-select-option') === filterVal);
        if (optionTxt) selectValue.textContent = optionTxt.textContent;
      }
    });
  });

  // Mobil filtri (Dropdown tanlash tizimi)
  if (selectBtn && selectBox) {
    selectBtn.addEventListener('click', () => {
      selectBox.classList.toggle('active');
    });

    selectOptions.forEach(option => {
      option.addEventListener('click', () => {
        const filterVal = option.getAttribute('data-select-option');
        const optionText = option.textContent;

        selectValue.textContent = optionText;
        selectBox.classList.remove('active');
        
        filterProjects(filterVal);

        // Desktop tugmalarini ham sinxronlash
        filterBtns.forEach(b => {
          if (b.getAttribute('data-filter-btn') === filterVal) {
            b.classList.add('active');
          } else {
            b.classList.remove('remove');
          }
        });
      });
    });

    // Dropdown tashqarisiga bosilganda yopish
    document.addEventListener('click', (e) => {
      if (!selectBox.contains(e.target)) {
        selectBox.classList.remove('active');
      }
    });
  }


  /*=========================================
  6. TESTIMONIALS MODAL POPUP
  =========================================*/
  const testimonials = document.querySelectorAll('.testimonials__item');
  const modal = document.getElementById('testimonial-modal');
  const modalOverlay = document.querySelector('[data-modal-overlay]');
  const modalCloseBtn = document.querySelector('[data-modal-close]');
  
  const modalInitials = document.getElementById('modal-user-initials');
  const modalName = document.getElementById('modal-user-name');
  const modalCompany = document.getElementById('modal-user-company');
  const modalText = document.getElementById('modal-user-text');

  if (modal && testimonials.length > 0) {
    const openModal = (idx) => {
      const testimonial = testimonials[idx];
      const name = testimonial.querySelector('.testimonials__item-name').textContent;
      const company = testimonial.querySelector('.testimonials__item-company').textContent;
      const text = testimonial.querySelector('.testimonials__item-text').textContent;
      const initials = testimonial.querySelector('.testimonials__avatar-placeholder').textContent;

      // Modal ma'lumotlarini to'ldirish
      modalInitials.textContent = initials;
      modalName.textContent = name;
      modalCompany.textContent = company;
      modalText.textContent = text;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Orqa fonni qotirish
    };

    const closeModal = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    testimonials.forEach((item, idx) => {
      item.addEventListener('click', () => openModal(idx));
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    
    // ESC tugmasi bosilganda yopish
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }


  /*=========================================
  7. SCROLL REVEAL ANIMATIONS
  =========================================*/
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Element ko'rsatilgandan keyin uni kuzatishni to'xtatamiz
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null, // viewport
      threshold: 0.15, // 15% ko'ringanda faollashadi
      rootMargin: '0px 0px -50px 0px' // pastki qismdan 50px oldin
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Agar brauzer IntersectionObserver'ni qo'llab-quvvatlamasa, hamma elementni darhol ko'rsatish
    revealElements.forEach(element => {
      element.classList.add('revealed');
    });
  }


  /*=========================================
  8. CONTACT FORM VALIDATION & SUBMIT
  =========================================*/
  const contactForm = document.querySelector('[data-contact-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const submitBtn = document.querySelector('[data-form-btn]');

  if (contactForm && formInputs.length > 0 && submitBtn) {
    
    // Forma maydonlarini tekshirish funksiyasi
    const checkFormValidity = () => {
      let isFormValid = true;

      formInputs.forEach(input => {
        // Agar input bo'sh bo'lsa yoki email bo'lib, formati mos kelmasa
        if (!input.checkValidity()) {
          isFormValid = false;
        }
      });

      // Tugma holatini o'zgartirish
      if (isFormValid) {
        submitBtn.removeAttribute('disabled');
      } else {
        submitBtn.setAttribute('disabled', 'true');
      }
    };

    // Har bir inputga yozish hodisasini tinglash
    formInputs.forEach(input => {
      input.addEventListener('input', checkFormValidity);
    });

    // Formani yuborish (Mailto)
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById('form-name').value.trim();
      const emailVal = document.getElementById('form-email').value.trim();
      const messageVal = document.getElementById('form-message').value.trim();

      const subject = encodeURIComponent(`Portfolio orqali xabar: ${nameVal}`);
      const body = encodeURIComponent(
        `Ism: ${nameVal}\n` +
        `Email: ${emailVal}\n\n` +
        `Xabar:\n${messageVal}`
      );

      // Mailto havolasini ochish
      const mailtoUrl = `mailto:anvar.rahimov@example.com?subject=${subject}&body=${body}`;
      
      // Xabarni yuborgandan keyin formani tozalash va tugmani o'chirish
      window.location.href = mailtoUrl;
      
      contactForm.reset();
      submitBtn.setAttribute('disabled', 'true');
      
      alert('Xabar yuborish uchun pochta dasturingiz ochilmoqda. Rahmat!');
    });
  }


  /*=========================================
  9. BACK TO TOP BUTTON
  =========================================*/
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});

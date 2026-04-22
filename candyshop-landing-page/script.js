// script.js - JavaScript para tornar o site interativo e dinâmico

document.addEventListener('DOMContentLoaded', function() {
    // Menu Hambúrguer
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    
    // Inicializar menu retraído em desktop
    if (window.innerWidth > 768) {
        sidebar.classList.add('retraido');
        content.classList.add('sidebar-retraido');
    }
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('menu-aberto');
            document.body.classList.toggle('menu-open');
        } else {
            sidebar.classList.toggle('retraido');
            content.classList.toggle('sidebar-retraido');
        }
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('#sidebar a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                sidebar.classList.remove('menu-aberto');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Fechar menu ao clicar fora dele (em dispositivos móveis)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('menu-aberto')) {
                menuToggle.classList.remove('active');
                sidebar.classList.remove('menu-aberto');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Smooth scrolling para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Destacar link ativo ao rolar
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('ativo');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('ativo');
            }
        });
    });

    // Toggle para "Leia mais" na seção de boas-vindas
    const leiaMaisBtn = document.querySelector('.sessao-bemvindo-btn');
    const descricao = document.querySelector('.sessao-descricao');
    if (leiaMaisBtn && descricao) {
        leiaMaisBtn.addEventListener('click', function(e) {
            e.preventDefault();
            descricao.classList.toggle('expandido');
            this.textContent = descricao.classList.contains('expandido') ? 'Leia menos' : 'Leia mais';
        });
    }

    // Modal para galeria de imagens
    const galleryImages = document.querySelectorAll('.banner-galeria');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img class="modal-img" src="" alt="Imagem ampliada">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.modal-img');
    const closeBtn = modal.querySelector('.close');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const bgImage = window.getComputedStyle(this).backgroundImage;
            const imageUrl = bgImage.slice(5, -2); // Remove url("...")
            modalImg.src = imageUrl;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Validação e envio do formulário de contato
    const form = document.getElementById('form-contato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();

            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            // Simulação de envio
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Animações de entrada para seções
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animado');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Efeito de hover nas imagens da galeria
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
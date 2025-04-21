document.addEventListener("DOMContentLoaded", function() {
    // 初始化Lucide图标
    lucide.createIcons();
    
    // 阻止页面缩放
    window.addEventListener("wheel", (e) => {
        const isPinching = e.ctrlKey;
        if (isPinching) e.preventDefault();
    }, { passive: false });
    
    // 移动端菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // 切换图标
            const icon = this.querySelector('i');
            if (icon.getAttribute('data-lucide') === 'menu') {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }
    
    // 导航链接点击后关闭移动菜单
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
    
    // 互动区域模态框
    const interactiveZoneBtn = document.getElementById('interactive-zone-btn');
    const interactiveModal = document.getElementById('interactive-modal');
    const closeInteractiveModal = document.getElementById('close-interactive-modal');
    
    if (interactiveZoneBtn && interactiveModal && closeInteractiveModal) {
        interactiveZoneBtn.addEventListener('click', function() {
            interactiveModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        closeInteractiveModal.addEventListener('click', function() {
            interactiveModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
        
        // 点击模态框外部关闭
        interactiveModal.addEventListener('click', function(e) {
            if (e.target === this) {
                interactiveModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // 受众群体模态框
    const targetAudienceBtn = document.getElementById('target-audience-btn');
    const audienceModal = document.getElementById('audience-modal');
    const closeAudienceModal = document.getElementById('close-audience-modal');
    
    if (targetAudienceBtn && audienceModal && closeAudienceModal) {
        targetAudienceBtn.addEventListener('click', function() {
            audienceModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        closeAudienceModal.addEventListener('click', function() {
            audienceModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
        
        // 点击模态框外部关闭
        audienceModal.addEventListener('click', function(e) {
            if (e.target === this) {
                audienceModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // 增强的滚动动画效果
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                // 根据元素的data-animation属性应用不同的动画
                const animation = element.dataset.animation || 'slide-up';
                element.classList.add(`animate-${animation}`);
            }
        });
    };
    
    // 初始检查并添加滚动事件监听
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // 伦理困境模拟互动
    const ethicsButtons = document.querySelectorAll('.bg-gray-50 .flex.space-x-3 button');
    ethicsButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 重置所有按钮
            ethicsButtons.forEach(btn => {
                btn.classList.remove('bg-gray-800', 'text-white');
                btn.classList.add('bg-white', 'text-gray-800');
            });
            
            // 高亮选中按钮
            this.classList.remove('bg-white', 'text-gray-800');
            this.classList.add('bg-gray-800', 'text-white');
            
            // 这里可以添加更多逻辑，比如显示对应的分析内容
        });
    });
    
    // 添加ESC键关闭所有模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (interactiveModal && !interactiveModal.classList.contains('hidden')) {
                interactiveModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
            if (audienceModal && !audienceModal.classList.contains('hidden')) {
                audienceModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // 添加视差效果
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length > 0) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            parallaxElements.forEach(element => {
                const depth = element.dataset.depth || 0.1;
                const moveX = (x - 0.5) * depth * 50;
                const moveY = (y - 0.5) * depth * 50;
                
                element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
        });
    }
    
    // 添加打字机效果
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeSpeed = parseInt(element.dataset.speed) || 50;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // 当元素进入视口时开始打字效果
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
    
    // 添加数字计数器效果
    const counterElements = document.querySelectorAll('.counter');
    
    counterElements.forEach(element => {
        const target = parseInt(element.dataset.target) || 0;
        const duration = parseInt(element.dataset.duration) || 2000;
        const step = target / (duration / 16); // 假设60fps
        
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        current += step;
                        element.textContent = Math.floor(current);
                        
                        if (current >= target) {
                            element.textContent = target;
                            clearInterval(timer);
                        }
                    }, 16);
                    
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
    
    // 初始化粒子背景
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#3b82f6" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#3b82f6",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
    
    // 添加悬停效果到所有卡片
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('animate-pulse');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('animate-pulse');
        });
    });
    
    // 添加滚动进度指示器
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        width: 0%;
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    });
});

// 添加3D倾斜效果
function addTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// 页面加载完成后初始化倾斜效果
window.addEventListener('load', addTiltEffect);

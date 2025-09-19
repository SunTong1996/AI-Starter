// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    smoothScroll();
    
    // 导航高亮显示当前章节
    highlightNavigation();
    
    // 添加卡片动画
    animateCards();
    
    // 添加章节进入动画
    animateSections();
    
    // 添加导航栏滚动效果
    navScrollEffect();
    
    // 添加保存记录功能
    addSaveRecordFunctionality();
});

// 平滑滚动功能
function smoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // 减去导航栏高度
                behavior: 'smooth'
            });
        });
    });
}

// 导航高亮显示当前章节
function highlightNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            // 移除所有链接的active类
            link.classList.remove('active');
            
            // 为当前章节的链接添加active类
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 添加卡片动画
function animateCards() {
    const cards = document.querySelectorAll('.content-card');
    
    // 初始隐藏所有卡片
    cards.forEach(card => {
        card.classList.add('card-animation');
    });
    
    // 滚动时显示卡片
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 使用setTimeout实现交错动画效果
                setTimeout(() => {
                    entry.target.classList.add('card-visible');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// 添加返回顶部按钮
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '↑';
    backToTopButton.id = 'back-to-top';
    
    // 设置样式
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '2rem';
    backToTopButton.style.right = '2rem';
    backToTopButton.style.width = '60px';
    backToTopButton.style.height = '60px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.backgroundColor = '#4a6fa5';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.fontSize = '1.8rem';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.transition = 'all 0.3s ease';
    backToTopButton.style.zIndex = '999';
    backToTopButton.style.boxShadow = '0 4px 15px rgba(74, 111, 165, 0.3)';
    backToTopButton.style.transform = 'translateY(20px) scale(0.8)';
    backToTopButton.style.display = 'flex';
    backToTopButton.style.alignItems = 'center';
    backToTopButton.style.justifyContent = 'center';
    backToTopButton.style.fontWeight = 'bold';
    backToTopButton.style.userSelect = 'none';
    backToTopButton.style.outline = 'none';
    
    document.body.appendChild(backToTopButton);
    
    // 滚动时显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0) scale(1)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(20px) scale(0.8)';
        }
    });
    
    // 鼠标悬停效果
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#6b8cce';
        this.style.transform = 'translateY(0) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(74, 111, 165, 0.4)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#4a6fa5';
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(74, 111, 165, 0.3)';
    });
    
    // 点击返回顶部
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 添加保存记录功能
function addSaveRecordFunctionality() {
    const saveButton = document.getElementById('save-record');
    const cpuInput = document.getElementById('cpu-info');
    const memoryInput = document.getElementById('memory-info');
    const storageInput = document.getElementById('storage-info');
    const gpuInput = document.getElementById('gpu-info');
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // 获取用户输入的配置信息
            const computerConfig = {
                cpu: cpuInput.value.trim(),
                memory: memoryInput.value.trim(),
                storage: storageInput.value.trim(),
                gpu: gpuInput.value.trim(),
                timestamp: new Date().toLocaleString('zh-CN')
            };
            
            // 检查是否至少填写了一项
            if (!computerConfig.cpu && !computerConfig.memory && !computerConfig.storage && !computerConfig.gpu) {
                alert('请至少填写一项配置信息！');
                return;
            }
            
            // 保存到本地存储
            try {
                let savedConfigs = JSON.parse(localStorage.getItem('computerConfigs')) || [];
                savedConfigs.push(computerConfig);
                localStorage.setItem('computerConfigs', JSON.stringify(savedConfigs));
                
                // 显示保存成功的消息
                showSaveSuccessMessage();
                
                // 清空输入框（可选）
                // cpuInput.value = '';
                // memoryInput.value = '';
                // storageInput.value = '';
                // gpuInput.value = '';
            } catch (error) {
                console.error('保存配置信息失败:', error);
                alert('保存配置信息失败，请稍后再试。');
            }
        });
    }
}

// 显示保存成功的消息
function showSaveSuccessMessage() {
    // 检查是否已存在消息元素
    let messageElement = document.getElementById('save-success-message');
    
    if (!messageElement) {
        // 创建消息元素
        messageElement = document.createElement('div');
        messageElement.id = 'save-success-message';
        messageElement.style.position = 'fixed';
        messageElement.style.top = '2rem';
        messageElement.style.right = '2rem';
        messageElement.style.padding = '1rem 2rem';
        messageElement.style.backgroundColor = '#4caf50';
        messageElement.style.color = 'white';
        messageElement.style.borderRadius = '4px';
        messageElement.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        messageElement.style.zIndex = '1001';
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.3s ease';
        messageElement.textContent = '配置信息保存成功！';
        
        document.body.appendChild(messageElement);
    }
    
    // 显示消息
    messageElement.style.opacity = '1';
    
    // 3秒后自动隐藏
    setTimeout(() => {
        messageElement.style.opacity = '0';
    }, 3000);
}

// 添加章节进入动画
function animateSections() {
    const sections = document.querySelectorAll('section');
    
    // 初始化所有章节为进入状态
    sections.forEach(section => {
        section.classList.add('section-enter');
    });
    
    // 创建IntersectionObserver来监测章节是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 章节进入视口时添加可见类
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // 观察所有章节
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 添加导航栏滚动效果
function navScrollEffect() {
    const nav = document.querySelector('nav');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        // 当滚动距离超过50px时，添加scrolled类
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// 页面加载完成后执行
window.addEventListener('load', function() {
    // 添加返回顶部按钮
    addBackToTopButton();
    
    // 页面加载动画
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
                navbar.classList.add('py-2');
                navbar.classList.remove('py-4');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.remove('py-2');
                navbar.classList.add('py-4');
            }
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 关闭移动端菜单
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // 平滑滚动到目标元素
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.add('opacity-0', 'invisible');
                backToTopButton.classList.remove('opacity-100', 'visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 页面加载动画
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    
    function checkFadeIn() {
        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // 元素进入视口
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始化元素的动画状态
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 初始检查
    checkFadeIn();
    
    // 滚动时检查
    window.addEventListener('scroll', checkFadeIn);
    
    // 设备卡片悬停效果
    const deviceCards = document.querySelectorAll('.device-card');
    
    deviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 设备对比工具功能
    const comparisonSelects = document.querySelectorAll('.comparison-select select');
    const compareButton = document.querySelector('.comparison-action button');
    const comparisonTableCells = document.querySelectorAll('.comparison-table td');
    
    if (compareButton && comparisonTableCells.length > 0) {
        compareButton.addEventListener('click', function() {
            // 获取选择的设备
            const selectedDevices = Array.from(comparisonSelects).map(select => select.value);
            
            // 模拟填充表格数据
            if (selectedDevices[0] && selectedDevices[1] && selectedDevices[2]) {
                // 这里可以根据实际需求从API或数据集中获取设备的详细规格参数
                // 以下为模拟数据
                const mockData = {
                    'device1': {
                        '处理器': '第12代AI加速处理器',
                        '内存容量': '16GB LPDDR5',
                        '存储容量': '1TB SSD',
                        'AI计算能力': '20 TOPS',
                        '功耗': '45W',
                        '价格': '¥9,999'
                    },
                    'device2': {
                        '处理器': '八核AI处理器',
                        '内存容量': '8GB LPDDR5',
                        '存储容量': '256GB UFS 3.1',
                        'AI计算能力': '10 TOPS',
                        '功耗': '15W',
                        '价格': '¥5,999'
                    },
                    'device3': {
                        '处理器': '专业AI加速芯片',
                        '内存容量': '32GB GDDR6X',
                        '存储容量': 'N/A',
                        'AI计算能力': '300 TOPS',
                        '功耗': '350W',
                        '价格': '¥19,999'
                    }
                };
                
                // 填充表格数据
                let rowIndex = 0;
                comparisonTableCells.forEach((cell, index) => {
                    // 跳过第一列（规格参数列）
                    if ((index + 1) % 4 !== 1) {
                        const deviceIndex = Math.floor((index) % 3);
                        const deviceKey = selectedDevices[deviceIndex];
                        const specKeys = Object.keys(mockData[selectedDevices[0]]);
                        
                        if (deviceKey && mockData[deviceKey] && specKeys[rowIndex]) {
                            cell.textContent = mockData[deviceKey][specKeys[rowIndex]];
                        }
                        
                        // 更新行索引
                        if ((index + 1) % 4 === 0) {
                            rowIndex++;
                        }
                    }
                });
                
                // 显示对比结果
                document.querySelector('.comparison-result').classList.remove('hidden');
            } else {
                alert('请选择至少三款设备进行对比');
            }
        });
    }
    
    // 设备筛选功能
    const filterChips = document.querySelectorAll('.filter-chip');
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // 移除其他active状态
            filterChips.forEach(c => c.classList.remove('active'));
            // 添加当前active状态
            this.classList.add('active');
            
            // 这里可以添加实际的筛选逻辑
            console.log('筛选设备：', this.textContent.trim());
        });
    });
    
    // 搜索功能
    const searchInput = document.getElementById('device-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('搜索设备：', searchTerm);
            
            // 这里可以添加实际的搜索逻辑
            // 例如：过滤显示匹配的设备卡片
        });
    }
    
    // 设备详情按钮点击事件
    const detailButtons = document.querySelectorAll('.device-card button');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取设备名称
            const deviceName = this.closest('.device-card').querySelector('h3').textContent;
            console.log('查看设备详情：', deviceName);
            
            // 这里可以添加跳转到设备详情页的逻辑
            // 例如：window.location.href = `/device-info/detail.html?name=${encodeURIComponent(deviceName)}`;
        });
    });
    
    // 订阅表单提交事件
    const subscribeForm = document.querySelector('footer form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                console.log('订阅邮箱：', email);
                alert('订阅成功！感谢您对AI设备信息中心的关注。');
                emailInput.value = '';
            } else {
                alert('请输入有效的邮箱地址');
            }
        });
    }
});
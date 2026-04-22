// js/main.js - 页面核心交互（新增移动端适配）
const MainPage = {
    // 初始化主页面
    init: () => {
        // 检测设备类型
        MainPage.detectDevice();
        
        // 初始化加载进度
        Utils.loadingProgress('loadingProgress');
        
        // 初始化图片上传
        MainPage.initImageUpload();
        
        // 初始化3D效果（移动端弱化）
        MainPage.init3dEffect();
        
        // 初始化祝福生成
        MainPage.initBlessingGenerator();
        
        // 初始化AI祝福生成
        MainPage.initAiBlessing();
        
        // 初始化盲盒功能
        MainPage.initBlindBox();
        
        // 绑定惊喜页跳转
        document.getElementById('goToSurprisePage').addEventListener('click', SurprisePage.goToSurprise);
        document.getElementById('backToMainPage').addEventListener('click', SurprisePage.backToMain);
        
        // 部署指引切换
        document.getElementById('deployGuideToggle').addEventListener('click', () => {
            document.getElementById('deployGuide').classList.toggle('hidden');
        });

        // 鼠标/触摸光影效果
        MainPage.initPointerGlow();
    },

    // 检测设备类型
    detectDevice: () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isTablet = /iPad|Android Tablet/i.test(navigator.userAgent);
        const isDesktop = !isMobile && !isTablet;
        
        // 给body添加设备类
        document.body.classList.add(isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop');
        
        // 全局变量存储设备类型
        window.deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
        
        // 移动端调整爱心雨频率
        if (isMobile) {
            window.heartRainInterval = 2000; // 移动端爱心雨间隔2秒
        } else if (isTablet) {
            window.heartRainInterval = 1500; // 平板1.5秒
        } else {
            window.heartRainInterval = 1000; // PC 1秒
        }
    },

    // 鼠标/触摸光影（适配移动端触摸）
    initPointerGlow: () => {
        const glowEffect = document.getElementById('glowEffect');
        
        // PC端鼠标移动
        document.addEventListener('mousemove', (e) => {
            if (window.deviceType === 'desktop') {
                glowEffect.style.left = `${e.clientX}px`;
                glowEffect.style.top = `${e.clientY}px`;
                glowEffect.style.width = '200px';
                glowEffect.style.height = '200px';
                glowEffect.style.opacity = '0.5';
                glowEffect.style.background = `radial-gradient(circle, rgba(${Utils.getRandomThemeColor().replace('#', '')}, 0.1) 0%, transparent 70%)`;
            }
        });
        
        // 移动端触摸
        document.addEventListener('touchmove', (e) => {
            if (window.deviceType === 'mobile' || window.deviceType === 'tablet') {
                const touch = e.touches[0];
                glowEffect.style.left = `${touch.clientX}px`;
                glowEffect.style.top = `${touch.clientY}px`;
                glowEffect.style.width = '150px'; // 移动端光影缩小
                glowEffect.style.height = '150px';
                glowEffect.style.opacity = '0.7';
                glowEffect.style.background = `radial-gradient(circle, rgba(${Utils.getRandomThemeColor().replace('#', '')}, 0.2) 0%, transparent 70%)`;
            }
        });
        
        // 离开时隐藏
        document.addEventListener('mouseleave', () => {
            glowEffect.style.opacity = '0';
        });
        document.addEventListener('touchend', () => {
            setTimeout(() => {
                glowEffect.style.opacity = '0';
            }, 500);
        });
    },

    // 图片上传（适配移动端拖拽/长按）
    initImageUpload: () => {
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const previewContainer = document.getElementById('imagePreviewContainer');

        dropZone.addEventListener('click', () => fileInput.click());
        
        // PC端拖拽
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-primary');
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-primary');
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary');
            MainPage.handleFiles(e.dataTransfer.files);
        });
        
        // 移动端长按
        dropZone.addEventListener('touchstart', (e) => {
            e.preventDefault();
            // 长按触发选择文件
            setTimeout(() => {
                fileInput.click();
            }, 500);
        });
        
        fileInput.addEventListener('change', () => {
            MainPage.handleFiles(fileInput.files);
        });

        // 加载本地存储的图片
        MainPage.loadSavedImages();

        // 删除图片（适配移动端点击）
        previewContainer.addEventListener('click', (e) => {
            if (e.target.closest('.delete-image')) {
                e.target.closest('.relative').remove();
                MainPage.saveImagesToStorage();
            }
        });
    },

    // 处理上传文件
    handleFiles: (files) => {
        const previewContainer = document.getElementById('imagePreviewContainer');
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgCard = document.createElement('div');
                    imgCard.className = 'relative hover-scale blessing-card';
                    imgCard.innerHTML = `
                        <img src="${e.target.result}" class="w-full h-48 md:h-64 object-cover rounded-xl">
                        <button class="absolute top-2 right-2 bg-white rounded-full p-2 delete-image">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    `;
                    previewContainer.appendChild(imgCard);
                    MainPage.saveImagesToStorage();
                };
                reader.readAsDataURL(file);
            }
        });
    },

    // 保存图片到本地存储
    saveImagesToStorage: () => {
        const images = [];
        document.querySelectorAll('#imagePreviewContainer img').forEach(img => {
            images.push(img.src);
        });
        Utils.setStorage('mayday_images', images);
    },

    // 加载保存的图片
    loadSavedImages: () => {
        const images = Utils.getStorage('mayday_images');
        if (!images) return;
        const previewContainer = document.getElementById('imagePreviewContainer');
        images.forEach(src => {
            const imgCard = document.createElement('div');
            imgCard.className = 'relative hover-scale blessing-card';
            imgCard.innerHTML = `
                <img src="${src}" class="w-full h-48 md:h-64 object-cover rounded-xl">
                <button class="absolute top-2 right-2 bg-white rounded-full p-2 delete-image">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            `;
            previewContainer.appendChild(imgCard);
        });
    },

    // 3D效果（移动端弱化）
    init3dEffect: () => {
        const container = document.getElementById('threeDContainer');
        const card = container.querySelector('.card-3d');
        card.classList.add('card-3d-hover');

        // 只有PC端启用3D交互
        if (window.deviceType === 'desktop') {
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height/2)/8;
                const rotateY = (rect.width/2 - x)/8;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            container.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0) rotateY(0)';
            });
        }
    },

    // 手动祝福生成
    initBlessingGenerator: () => {
        const generateBtn = document.getElementById('generateCard');
        const blessingText = document.getElementById('blessingText');
        const preview = document.getElementById('cardPreview');

        generateBtn.addEventListener('click', () => {
            const text = blessingText.value || Config.page.defaultBlessing;
            preview.innerHTML = `
                <div class="bg-gradient-to-br from-light to-gray-100 rounded-xl p-6 md:p-8 shadow-lg text-center blessing-card">
                    <h3 class="text-xl md:text-2xl font-medium mb-4 text-primary surprise-item">五一专属祝福</h3>
                    <p class="text-gray-700 mb-6 typing-effect-enhanced">${text}</p>
                    <div class="w-24 h-1 bg-primary mx-auto"></div>
                </div>
            `;
        });

        // 保存卡片
        document.getElementById('saveCard').addEventListener('click', () => {
            if (!preview.innerHTML) return;
            // 截图保存逻辑（简化版）
            alert('祝福卡片已生成！点击确定保存图片～');
            // 可扩展html2canvas实现真实截图
        });
    },

    // AI祝福生成
    initAiBlessing: () => {
        const generateBtn = document.getElementById('generateAiBlessing');
        const resultContainer = document.getElementById('aiBlessingResult');
        const loader = generateBtn.querySelector('.loader');

        generateBtn.addEventListener('click', async () => {
            // 禁用按钮+显示加载
            generateBtn.disabled = true;
            loader.classList.remove('hidden');
            resultContainer.innerHTML = '<p class="text-gray-600 text-center">❤️ AI正在给余baby写超甜祝福...</p>';

            // 获取参数
            const style = document.getElementById('blessingStyle').value;
            const target = document.getElementById('blessingTarget').value;
            const length = document.getElementById('blessingLength').value;

            // 调用AI接口
            const result = await ApiService.generateLaborBlessing(style, target, length);
            
            // 恢复按钮状态
            generateBtn.disabled = false;
            loader.classList.add('hidden');

            if (result.success) {
                // 成功：显示结果+复制按钮
                resultContainer.innerHTML = `
                    <div class="prose max-w-none surprise-item">
                        <h4 class="text-love font-medium mb-2">✨ 给余baby的专属五一祝福</h4>
                        <p class="text-gray-800 leading-relaxed text-base md:text-lg">${result.content}</p>
                        <button class="mt-4 text-love hover:text-[#FF477E] flex items-center gap-1 copy-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            复制甜甜的祝福
                        </button>
                    </div>
                `;

                // 绑定复制功能
                document.querySelector('.copy-btn').addEventListener('click', async () => {
                    await Utils.copyToClipboard(result.content);
                    alert('❤️ 超甜的祝福已复制～快去发给余baby吧！');
                });
            } else {
                // 失败：显示默认祝福
                resultContainer.innerHTML = `
                    <p class="text-love text-center">
                        ${result.message}<br>
                        👇 给余baby的默认甜宠祝福：<br>
                        <span class="mt-2 block">${Config.page.defaultBlessing}</span>
                    </p>
                `;
            }
        });
    },

    // 盲盒功能
    initBlindBox: () => {
        const openBtn = document.getElementById('openBlindBox');
        const resultBox = document.getElementById('blindBoxResult');
        
        // 专属余baby的搞怪祝福
        const blindBoxMessages = [
            '🥳 余baby五一不用劳动，只用躺平被我宠～',
            '🍓 劳动节快乐！奶茶我包了，珍珠加倍！',
            '💤 假期可以睡懒觉，我负责做早餐～',
            '🛍️ 逛街累了我当人肉沙发，超软的那种！',
            '📸 拍照永远找最好角度，绝不拍丑我的宝～',
            '🍜 五一干饭不打烊，我喂你吃好吃的～',
            '😘 劳动最光荣，但宠你更光荣！',
            '💖 别人劳动赚钱，我劳动宠你～'
        ];

        openBtn.addEventListener('click', () => {
            const randomMsg = blindBoxMessages[Math.floor(Math.random() * blindBoxMessages.length)];
            resultBox.innerHTML = `
                <div class="text-center p-4 bg-gradient-to-br from-loveLight to-white rounded-lg animate-pulse surprise-item">
                    ${randomMsg}
                </div>
            `;
            // 生成小爱心
            Utils.createHeartEffect(resultBox);
        });
    }
};

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    MainPage.init();
    SurprisePage.init();
});

// 窗口大小变化时重新适配
window.addEventListener('resize', () => {
    MainPage.detectDevice();
});

// js/utils.js - 通用工具函数
const Utils = {
    // 加载进度条动画
    loadingProgress: (progressId) => {
        const progressBar = document.getElementById(progressId);
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 1;
                progressBar.style.width = `${width}%`;
            }
        }, Config.page.loadingSpeed);
    },

    // 获取本地存储
    getStorage: (key) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.error('获取存储失败:', e);
            return null;
        }
    },

    // 设置本地存储
    setStorage: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('设置存储失败:', e);
            return false;
        }
    },

    // 复制文本到剪贴板
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (e) {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    },

    // 生成随机主题色
    getRandomThemeColor: () => {
        return Config.page.heartColors[Math.floor(Math.random() * Config.page.heartColors.length)];
    },

    // 创建爱心特效
    createHeartEffect: (container) => {
        // 如果静音则不生成
        if (document.getElementById('muteToggle').checked) return;
        
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        
        // 随机位置/大小/动画
        const containerRect = container.getBoundingClientRect();
        const left = Math.random() * containerRect.width;
        const size = Math.random() * 10 + 10;
        
        heart.style.cssText = `
            left: ${left}px;
            bottom: -20px;
            font-size: ${size}px;
            color: ${Utils.getRandomThemeColor()};
            pointer-events: none;
            z-index: 9999;
        `;
        
        // 添加到容器
        container.appendChild(heart);
        
        // 移除元素
        setTimeout(() => {
            heart.remove();
        }, 5000);
    },

    // 防抖函数
    debounce: (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // 节流函数
    throttle: (func, limit) => {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= limit) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    },

    // 生成随机祝福
    getRandomBlessing: () => {
        return Config.page.hotBlessings[Math.floor(Math.random() * Config.page.hotBlessings.length)];
    },

    // 保存图片到本地
    saveImage: (element, filename) => {
        html2canvas(element).then(canvas => {
            const link = document.createElement('a');
            link.download = filename || `劳动节贺卡_${new Date().getTime()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    },

    // 获取上传的第一张图片
    getFirstUploadedImage: () => {
        const images = Utils.getStorage(Config.storage.images);
        return images && images.length > 0 ? images[0] : null;
    }
};

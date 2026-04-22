// js/surprise.js - 惊喜页专属特效（适配移动端）
const SurprisePage = {
    // 初始化惊喜页
    init: () => {
        const surprisePage = document.getElementById('surprisePage');
        const loveBtn = document.getElementById('loveBtn');
        const glowLoveEffect = document.getElementById('glowLoveEffect');

        // 爱心雨特效（适配设备频率）
        SurprisePage.startHeartRain(surprisePage);

        // PC端鼠标跟随
        document.addEventListener('mousemove', (e) => {
            if (!surprisePage.classList.contains('hidden') && window.deviceType === 'desktop') {
                glowLoveEffect.style.left = `${e.clientX}px`;
                glowLoveEffect.style.top = `${e.clientY}px`;
                glowLoveEffect.style.opacity = '0.7';
                glowLoveEffect.style.width = '200px';
                glowLoveEffect.style.height = '200px';
            }
        });
        
        // 移动端触摸跟随
        document.addEventListener('touchmove', (e) => {
            if (!surprisePage.classList.contains('hidden') && (window.deviceType === 'mobile' || window.deviceType === 'tablet')) {
                const touch = e.touches[0];
                glowLoveEffect.style.left = `${touch.clientX}px`;
                glowLoveEffect.style.top = `${touch.clientY}px`;
                glowLoveEffect.style.opacity = '0.7';
                glowLoveEffect.style.width = '150px';
                glowLoveEffect.style.height = '150px';
            }
        });

        // 爱心按钮点击特效
        loveBtn.addEventListener('click', () => {
            const loveResult = document.getElementById('loveResult');
            loveResult.classList.remove('hidden');
            loveBtn.disabled = true;
            loveBtn.innerHTML = '❤️ 爱意已发送 💘';
            
            // 爆发爱心特效（移动端数量减少）
            const heartCount = window.deviceType === 'mobile' ? 10 : 20;
            for (let i = 0; i < heartCount; i++) {
                Utils.createHeartEffect(surprisePage);
            }

            // 3秒后恢复
            setTimeout(() => {
                loveResult.classList.add('hidden');
                loveBtn.disabled = false;
                loveBtn.innerHTML = '❤️ 点击领取我的爱';
            }, 3000);
        });
    },

    // 爱心雨特效（适配设备频率）
    startHeartRain: (container) => {
        setInterval(() => {
            if (!container.classList.contains('hidden')) {
                Utils.createHeartEffect(container);
            }
        }, window.heartRainInterval || 1000);
    },

    // 惊喜页跳转
    goToSurprise: () => {
        document.getElementById('mainPage').classList.add('hidden');
        document.getElementById('surprisePage').classList.remove('hidden');
        window.scrollTo(0, 0);
        // 播放欢迎音效（可选，需添加音频文件）
        // const audio = new Audio('assets/love.mp3');
        // audio.play().catch(() => {});
    },

    // 返回主页面
    backToMain: () => {
        document.getElementById('surprisePage').classList.add('hidden');
        document.getElementById('mainPage').classList.remove('hidden');
        window.scrollTo(0, 0);
    }
};

// js/api.js - API请求封装（内置模拟数据，无需真实接口）
const ApiService = {
    /**
     * 生成劳动节专属祝福
     * @param {string} style 祝福风格（搞怪/温馨/甜蜜/霸道/文艺）
     * @param {string} target 祝福对象（如"余baby"）
     * @param {number} length 祝福长度限制
     * @returns {Promise<Object>} 包含success和content的结果对象
     */
    generateLaborBlessing: async (style, target, length) => {
        try {
            // 模拟API请求延迟（更贴近真实接口体验）
            await new Promise(resolve => setTimeout(resolve, 1200));

            // 不同风格的专属祝福模板（针对余baby定制）
            const blessingTemplates = {
                '搞怪': [
                    `余baby！五一劳动节快乐～别人劳动赚钱，我劳动宠你😜！今天不用干活，只用躺平被我喂饭，奶茶珍珠加倍，零食管够，主打一个宠上天～`,
                    `劳动节到啦！我的宝不用搬砖，只用搬空我的心💘！逛街累了我当人肉沙发，拍照丑了我自罚三杯，总之今天你最大，说啥都对～`,
                    `😝 余baby五一劳动公约：禁止干活、禁止疲惫、禁止不开心！违反者罚亲我一百下，没得商量～`
                ],
                '温馨': [
                    `亲爱的${target || '余baby'}，五一劳动节快乐❤️！愿你在这个假期里卸下所有疲惫，好好放松，我会一直陪在你身边，做你最坚实的依靠，永远爱你～`,
                    `劳动节快乐呀我的宝贝😘！感谢你一直以来的付出，这个假期就让我来照顾你，带你吃好吃的，玩好玩的，把所有的美好都给你～`,
                    `✨ 五一安康，我的余baby～愿假期的风都带着温柔，愿你每天都有甜甜的好心情，我会把所有的偏爱都给你～`
                ],
                '甜蜜': [
                    `💖 我的${target || '余baby'}，五一快乐！劳动最光荣，但宠你更光荣～这个假期，你的手只用来牵我，你的嘴只用来亲亲，所有的辛苦都交给我，只要你开心就好～`,
                    `❤️ 劳动节专属甜言：你是我一辈子都想"劳动"守护的宝贝～五一不用干活，只用被我甜晕，我的爱永远为你续航，电量满格🔋～`,
                    `🍬 余baby，五一甜度超标警告！我的爱比奶茶甜，比蛋糕软，这个假期，你负责可爱，我负责宠你～`
                ],
                '霸道': [
                    `😤 余baby！五一劳动节给我好好休息！不准干活，不准累着，不准不开心！你的假期由我承包，想吃啥吃啥，想去哪去哪，反正有我宠着～`,
                    `听好了${target || '余baby'}！劳动节就是要劳动宠你！今天我的时间全归你，你的要求全满足，敢不开心我就亲到你开心为止😘～`,
                    `👑 我的余baby，五一必须听我的！放下所有琐事，乖乖被我宠，不然我就把你藏起来，只准我一个人看～`
                ],
                '文艺': [
                    `✨ 亲爱的${target || '余baby'}，五一劳动节安康。愿这个假期，春风拂面，温柔相伴，卸下风尘，轻拥美好。我对你的爱意，如细水长流，岁岁年年～`,
                    `🌿 劳动节，致我最爱的你：世间万般美好，不及你眉眼一笑。愿你在劳作之余，亦能感受生活的温柔，而我，愿做你永远的港湾～`,
                    `💫 余baby，五一恰逢春日，愿你不负时光，不负自己。我会用满心欢喜，陪你走过每一个朝夕～`
                ]
            };

            // 随机选择对应风格的文案，并按长度截断
            const styleTemplates = blessingTemplates[style] || blessingTemplates['温馨'];
            const randomBlessing = styleTemplates[Math.floor(Math.random() * styleTemplates.length)];
            const finalBlessing = randomBlessing.substring(0, parseInt(length) || 100);

            // 返回成功结果
            return {
                success: true,
                content: finalBlessing
            };
        } catch (error) {
            // 捕获异常，返回默认文案
            console.error('生成祝福失败:', error);
            return {
                success: false,
                message: 'AI祝福生成失败，使用默认文案～',
                content: Config.page.defaultBlessing || "亲爱的余baby，五一劳动节快乐！愿你永远开心，永远被爱包围，我会一直宠着你～"
            };
        }
    },

    /**
     * 通用API请求函数（可扩展为真实接口）
     * @param {string} url 接口地址
     * @param {Object} options 请求配置（method, body等）
     * @returns {Promise<Object>} 接口返回结果
     */
    request: async (url, options = {}) => {
        try {
            // 合并默认配置
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...Config.api?.headers
                },
                timeout: Config.page?.apiTimeout || 10000,
                ...options
            };

            // 发送请求（真实项目替换为实际接口地址）
            const response = await fetch(url || Config.api?.blessingApi, requestOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP错误，状态码：${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API请求失败:', error);
            return { 
                success: false, 
                message: `请求失败：${error.message}`,
                content: Config.page.defaultBlessing
            };
        }
    }
};

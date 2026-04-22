// js/config.js - 全局配置常量
const Config = {
    // 页面配置
    page: {
        // 默认祝福文案
        defaultBlessing: "五一劳动节快乐！愿你劳逸结合，收获满满，生活美满，幸福安康！",
        // 热门五一祝福语
        hotBlessings: [
            "劳动创造幸福，奋斗成就梦想！五一劳动节快乐！",
            "愿你在这个劳动节，卸下疲惫，拥抱美好，享受属于自己的时光～",
            "致敬每一位努力生活的人，五一快乐，劳动最光荣！",
            "五一假期，愿你吃得好，玩得好，休息好，一切都好！",
            "辛勤付出结硕果，幸福生活乐无边。五一劳动节快乐！"
        ],
        // 爱心特效颜色
        heartColors: ['#FF6B8B', '#FF477E', '#FF8FA3', '#FFC2D1'],
        // 加载进度条速度
        loadingSpeed: 50,
        // AI接口超时时间
        apiTimeout: 10000,
        // 默认贺卡背景图
        defaultCardBg: "https://picsum.photos/id/1039/800/600" // 节日氛围图片
    },
    
    // API配置
    api: {
        // AI问答模拟接口（实际项目可替换为真实接口）
        aiApi: "https://api.example.com/ai-qa",
        // 接口请求头
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    },
    
    // 存储键名
    storage: {
        images: 'labor_day_images',
        blessings: 'labor_day_blessings',
        settings: 'labor_day_settings'
    }
};

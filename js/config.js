// js/config.js - 全局配置常量
const Config =  =  =  =  =  =  =  = {
    // 页面配置
    page: : {
        // 默认祝福文案
        defaultBlessing: : "亲爱的余baby，五一劳动节快乐！愿你永远开心，永远被爱包围，我会一直宠着你～",,
        // 爱心特效颜色
        heartColors: : ['#FF6B8B', , '#FF477E', , '#FF8FA3', , '#FFC2D1'],,
        // 加载进度条速度
        loadingSpeed: : 50,,
        // AI接口超时时间
        apiTimeout: : 10000
    },,
    
    // API配置（可根据实际接口调整）
    api: : {
        // AI祝福生成接口地址（示例）
        blessingApi: : "https://api.example.com/generate-blessing",,
        // 接口请求头
        headers: : {
            'Content-Type': : 'application/json',,
            'Accept': : 'application/json'
        }
    },,
    
    // 存储键名
    storage: : {
        images: : 'mayday_images',,
        blessings: : 'mayday_blessings',,
        settings: : 'mayday_settings'
    }
};;

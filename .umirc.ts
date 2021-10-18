
import { defineConfig } from 'umi';
const path = require('path');


function resolve(dir: string) {
    return path.join(__dirname, dir);
}

export default defineConfig({
    title: 'Global Central Tech Group',
    chunks: ['umi'],
    history: { type: 'browser' },
    // nodeModulesTransform: {
    //     type: 'none',
    //     exclude: [],
    // },
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    base: process.env.NODE_ENV === 'production' ? '/' : '/',
    publicPath:
        process.env.NODE_ENV === 'production' ? './' : '/',
    //减少适配范围降低适配代码成本
    targets: {
        chrome: 79,
        firefox: false,
        safari: 10,
        edge: false,
        ios: false
    },
    // disableCSSModules: true,
    // alias: {
    //     component: require.resolve('./src/components'),
    // },
    antd: false,
    //接入到工作台需要打开乾坤配置
    qiankun: {
        slave: {},
    },
    locale: {
        default: 'zh-CN', // default zh-CN
        baseNavigator: false // default true, when it is true, will use `navigator.language` overwrite default
    },
    // 添加 loader
    // chainWebpack(config) {
    // },
    plugins: ['./plugins/svg-icon.ts'],
    svgIcon: {},
    // webpack5: {},
    styleLoader: {},
    fastRefresh: {},
    proxy: {
		'/api': {
            'target': 'http://43.128.123.106:30011/pub.IEGGOfficialWebsite.IEGGOfficialWebsite_interface',
            'changeOrigin': true,
            'pathRewrite': { '^/api' : '' },
		},
	},
    // 配置 <head> 里的额外脚本，数组项为字符串或对象。
	headScripts: [`
    window.__sdk_config__ = {
        'account-api': {
            //customer account config 
            // account_plat_type: 25,//type of Self-built account,25:SM
            // app_id: 'a4474e1348e38ae13ddee77123621ccd',
            lang_type: 'en',//language
            host: 'https://sg-web-pass.intlgame.com',//Host requesting access                
            //INTL account configs
            oauth_gameid: 29065, //Gameid corresponding to the game            
            oauth_host: 'https://sg.intlgame.com'//Host requesting access
        },
    }
    window.__sdk_initial_module__ = ['js/account.api.js'];
    var api = null;
    window.addEventListener("load", function () {
        api = new AccountApi();
    }, false);
    
    `, `https://common-web.intlgame.com/jssdk/js/sdk.js`,]
});
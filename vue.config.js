const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
            .set('api', resolve('src/api'))
            .set('config', resolve('src/config'))
            .set('common', resolve('src/components/common'))
            .set('static', resolve('src/static'));
    }
};

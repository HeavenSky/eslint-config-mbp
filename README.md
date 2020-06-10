# eslint-config-mbp
eslint配置的最佳实践

## 参考来源
* ali: https://npmjs.com/package/eslint-config-ali

## 参数选项
```js
/**
 * eslint配置生成函数
 * @author HeavenSky
 * @date 2020-06-09
 * @param {"tab"|2|4} opt.tab 缩进类型
 * @param {"single"|"double"} opt.quote 引号类型
 * @param {boolean} opt.react 是否启用react支持
 * @param {boolean} opt.babel 是否启用babel支持
 * @param {boolean} opt.es5 是否启用es5支持
 * @returns {object} eslint配置
 */
```

## 函数用法
```js
const base = require("./base");
module.exports = base({
	tab: "tab", quote: "double", react: true, babel: true,
});
```

## eslint配置
```json
// FOR es5
{ "extends": "eslint-config-mbp/es5" }
// FOR es6+react+vue+ts
{ "extends": "eslint-config-mbp/es6" }
```

## 查看eslint最终配置
```
$ npx eslint --print-config *.js > config.json
$ npx eslint --print-config *.ts > config.json
$ npx eslint --print-config *.vue > config.json
```
`config.json`即是该文件的对应配置
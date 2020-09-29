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
 * @param {"double"|"single"} opt.quote 引号类型
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
`$ npm i eslint-config-mbp`
```json
// FOR es6+react+vue+ts
{ "extends": "mbp" }
// FOR es5
{ "extends": "mbp/es5" }
// ***BELOW*** 2 space and single quote
// FOR es6+react+vue+ts
{ "extends": "mbp/space" }
// FOR es5
{ "extends": "mbp/space/es5" }
```

## 查看eslint最终配置
```
$ npx eslint --print-config *.js > config.json
$ npx eslint --print-config *.ts > config.json
$ npx eslint --print-config *.vue > config.json
```
`config.json`即是该文件的对应配置

## 其他说明
- 子依赖包内包含的命令不会自动安装,移除eslint依赖,常见使用组合
	- eslint + eslint-config-mbp
- eslint规则属性值简介
	- "off" -- 0 -- 不启用这个规则
	- "warn" -- 1 -- 出现问题会有警告
	- "error" -- 2 -- 出现问题会报错

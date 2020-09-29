/**
 * eslint配置生成函数
 * @author HeavenSky
 * @date 2020-05-20
 * @param {"tab"|2|4} opt.tab 缩进类型
 * @param {"double"|"single"} opt.quote 引号类型
 * @param {boolean} opt.react 是否启用react支持
 * @param {boolean} opt.babel 是否启用babel支持
 * @param {boolean} opt.es5 是否启用es5支持
 * @returns {object} eslint配置
 * SEARCH_tab|babel|quote|indent
 * ES5_es6=false_sourceType=script
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 * https://github.com/vuejs/eslint-plugin-vue/tree/master/lib/rules
 * https://github.com/eslint/eslint/tree/master/lib/rules
 */
module.exports = opt => {
	const { quote: qt, react, babel, es5 } = opt || {};
	const tab = opt && opt.tab > 1 ? opt.tab : "tab";
	const quote = qt !== "single" ? "double" : "single";
	const indent = ["error", tab, { SwitchCase: 1 }];
	const quotes = ["error", quote, { avoidEscape: true }];
	const rules = {
		quotes, semi: ["error", "always"], camelcase: ["error", { properties: "never" }],
		"no-unused-expressions": ["error", { allowTernary: true, allowShortCircuit: true, allowTaggedTemplates: true }],
		"object-curly-spacing": ["error", "always", { arraysInObjects: true, objectsInObjects: true }],
		"valid-typeof": ["error", { requireStringLiterals: true }],
		"new-cap": ["error", { capIsNew: false }],
		"no-invalid-this": "error",
	};
	const overrides = [{
		files: ["*.vue"],
		plugins: ["vue"],
		extends: ["plugin:vue/recommended"],
		rules: {
			"vue/html-indent": ["error", tab],
			"vue/html-quotes": ["error", quote],
			"vue/script-indent": ["error", tab],
			"vue/component-name-in-template-casing": ["error", "kebab-case", { ignores: ["/^(el|van)-/"], registeredComponentsOnly: true }],
		},
	}, {
		files: ["*.ts", "*.tsx"],
		plugins: ["@typescript-eslint"],
		extends: ["plugin:@typescript-eslint/recommended"],
		rules: {
			indent: "off",
			quotes: "off",
			"no-extra-parens": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-extra-parens": "error",
			"@typescript-eslint/indent": indent,
			"@typescript-eslint/quotes": quotes,
		},
	}];
	const plugins = []; const exts = ["eslint:recommended"];
	babel && Object.keys(rules).forEach(k => {
		rules[`babel/${k}`] = rules[k]; rules[k] = "off";
	}); babel && plugins.push("babel");
	Object.assign(rules, {
		indent, "no-tabs": tab > 1 ? "error" : "off",
		"jsx-quotes": ["error", `prefer-${quote}`],
	});
	const config = {
		rules, overrides, plugins, extends: exts,
		parserOptions: {
			parser: "babel-eslint",
			sourceType: es5 ? "script" : "module",
			ecmaVersion: es5 ? 5 : 10,
			ecmaFeatures: {
				experimentalObjectRestSpread: true,
				impliedStrict: true,
				globalReturn: true,
				jsx: true,
			},
		},
		env: {
			commonjs: true,
			browser: true,
			worker: true,
			jquery: true,
			mocha: true,
			node: true,
			jest: true,
			amd: true,
			es6: !es5,
		},
	};
	if (es5) { exts.push("ali/es5"); return config; }
	react && exts.push("plugin:react/recommended");
	react && plugins.push("react", "react-hooks");
	plugins.push("date", "import", "flowtype");
	exts.push("plugin:flowtype/recommended");
	Object.assign(rules, require("./mbp"), {
		"date/no-new-date-with-args": "error",
		"import/newline-after-import": "off",
		"import/no-named-default": "error",
		"import/no-duplicates": "error",
		"import/default": "error",
		"import/export": "error",
		"import/first": "error",
	}, react && {
		"react/jsx-indent": ["error", tab],
		"react/jsx-indent-props": ["error", tab],
		"react/jsx-filename-extension": ["error", { extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"] }],
		"react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
		"react/jsx-equals-spacing": ["error", "never"],
		"react/jsx-curly-spacing": ["error", "never"],
		"react/jsx-boolean-value": "error",
		"react/self-closing-comp": "error",
		"react/no-deprecated": "off",
		"react/prop-types": "off",
		"react-hooks/exhaustive-deps": "error",
		"react-hooks/rules-of-hooks": "error",
	}); return config;
};
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
 * SEARCH_tab|babel|quote|indent
 * ES5_es6=false_sourceType=script
 */
module.exports = opt => {
	opt = { ...opt }; let { quote } = opt;
	const tab = opt.tab > 1 ? 2 : "tab";
	quote !== "single" && (quote = "double");
	const rules = {
		semi: ["error", "always"],
		camelcase: ["error", { properties: "never" }],
		quotes: ["error", quote, { avoidEscape: true, allowTemplateLiterals: false }],
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
			"@typescript-eslint/quotes": rules.quotes,
			"@typescript-eslint/indent": ["error", tab],
			"@typescript-eslint/no-extra-parens": "error",
		},
	}];
	const plugins = []; const ext = ["eslint:recommended"];
	opt.babel && Object.keys(rules).forEach(k => {
		rules[`babel/${k}`] = rules[k]; rules[k] = "off";
	}); opt.babel && plugins.push("babel");
	Object.assign(rules, {
		indent: ["error", tab],
		"no-tabs": tab > 1 ? "error" : "off",
		"jsx-quotes": ["error", `prefer-${quote}`],
	});
	const config = {
		rules, overrides, plugins, extends: ext,
		parserOptions: {
			parser: "babel-eslint",
			sourceType: opt.es5 ? "script" : "module",
			ecmaVersion: opt.es5 ? 5 : 11,
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
			es6: !opt.es5,
		},
	};
	if (opt.es5) { ext.push("ali/es5"); return config; }
	plugins.push("date", "import", "flowtype");
	ext.push("plugin:flowtype/recommended");
	ext.push("plugin:date/recommended");
	opt.react && plugins.push("react", "react-hooks");
	opt.react && ext.push("plugin:react/recommended");
	Object.assign(rules, require("./mbp"), {
		"import/newline-after-import": "off",
		"import/no-named-default": "error",
		"import/no-duplicates": "error",
		"import/default": "error",
		"import/export": "error",
		"import/first": "error",
	}, opt.react && {
		"react/jsx-indent": ["error", tab],
		"react/jsx-indent-props": ["error", tab],
		"react/jsx-filename-extension": ["error", { extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"] }],
		"react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
		"react/jsx-curly-spacing": ["error", "never"],
		"react/jsx-equals-spacing": ["error", "never"],
		"react/jsx-boolean-value": "error",
		"react/self-closing-comp": "error",
		"react/no-deprecated": "off",
		"react/prop-types": "off",
		"react-hooks/exhaustive-deps": "error",
		"react-hooks/rules-of-hooks": "error",
	}); return config;
};
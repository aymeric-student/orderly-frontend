module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine", "@angular-devkit/build-angular"],
		files: [{ pattern: "src/**/*.spec.ts", watched: false }],
		plugins: [
			require("karma-jasmine"),
			require("karma-chrome-launcher"),
			require("karma-coverage"),
			require("karma-jasmine-html-reporter"),
			require("karma-webpack"),
			require("@angular-devkit/build-angular/plugins/karma"),
		],
		client: {
			jasmine: {},
			clearContext: false,
		},
		coverageReporter: {
			dir: require("path").join(__dirname, "./coverage"),
			subdir: ".",
			reporters: [{ type: "html" }, { type: "lcov" }, { type: "text-summary" }],
			check: {
				global: {
					statements: 0,
					branches: 0,
					functions: 0,
					lines: 0,
					include: ["**/*.component.ts"],
				},
			},
		},
		reporters: ["progress", "kjhtml"],
		browsers: ["ChromeHeadless"],
		restartOnFileChange: true,
	});
};

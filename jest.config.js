module.exports = {
  setupFiles: ['<rootDir>/tests/setup.js'],
	moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testMatch: ['<rootDir>/tests/**/*.spec.(js|jsx|ts|tsx)|<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)'],
	testURL: 'http://localhost/',
	collectCoverage: true,
	coverageDirectory: '<rootDir>/tests/__coverage__',
	collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}', '!<rootDir>/src/assets/**/*.{js}', '!**/node_modules/**'],
	coveragePathIgnorePatterns: ['<rootDir>/tests/*', '<rootDir>/src/main.ts', '<rootDir>/src/config/*', '<rootDir>/src/database/*']
};

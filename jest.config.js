module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['./src', './examples'],
  setupFiles: ['raf/polyfill'],
  setupFilesAfterEnv: ['<rootDir>/src/components/__tests__/test-helper.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/src/components/__tests__/component.tsx',
    '<rootDir>/src/components/__tests__/test-helper.ts',
  ],
  moduleNameMapper: {
    'formsy-react-components': '<rootDir>/src/main.ts',
  },
};

module.exports = {
  preset: "@testing-library/react-native", // Use the testing library preset
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"], // Supported file extensions
  setupFilesAfterEnv: ["./jest-setup.ts"], // Setup file for Jest
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest", // Transform TypeScript files using Babel
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|react-native-swiper|react-redux|react-native-linear-gradient|@react-navigation|@react-native|@react-native/assets)/)", // Transform specific node modules
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$", // Test file patterns
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"], // Ignore specific paths
  collectCoverage: true, // Enable code coverage collection
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map module paths
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.tsx", // Mock image imports
    "react-native-responsive-fontsize":
      "<rootDir>/__mocks__/react-native-responsive-fontsize.tsx", // Mock responsive font size
    "react-native-size-matters":
      "<rootDir>/__mocks__/react-native-size-matters.tsx", // Mock size matters
  },
  coverageReporters: ["json", "text", "lcov", "clover"], // Coverage report formats
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Collect coverage from these files
    "!src/**/*.d.ts", // Exclude TypeScript declaration files
    "!src/navigation/*.{js,jsx,ts,tsx}", // Exclude navigation files
  ],
  globals: {
    "ts-jest": {
      babelConfig: true, // Use Babel configuration with ts-jest
    },
  },
};

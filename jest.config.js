module.exports = {
    preset: 'jest-expo', // Use Expo's Jest preset
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transform TypeScript files
      '^.+\\.tsx$': 'ts-jest', // Transform TypeScript JSX files
      '^.+\\.js$': 'babel-jest', // Transform JavaScript files using Babel
    },
    transformIgnorePatterns: [
      "node_modules/(?!(@react-native|react-native|@react-navigation))" // Ensure React Native modules get transformed
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/jest/setup.js'], // Additional testing setup
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  
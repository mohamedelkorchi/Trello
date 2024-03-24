module.exports = {
    preset: '@testing-library/react-native',
    transform: {
        '\\.[jt]sx?$': 'babel-jest'
    },
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react|react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
};
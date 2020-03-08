module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json'],
    transform: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "identity-obj-proxy",
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};
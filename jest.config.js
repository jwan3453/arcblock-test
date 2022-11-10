module.exports = {
    // transform: {
    //     '\\.svg$': 'jest-svg-transformer',
    // },
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/_test_/state/index.test.js',
        '^.+\\.svg$': 'jest-svg-transformer',
    }
};
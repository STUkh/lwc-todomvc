import * as sfdxLwcConfig from '@salesforce/sfdx-lwc-jest/config.js';

const { jestConfig } = sfdxLwcConfig;

const config = {
    ...jestConfig,
    moduleNameMapper: {
        '^c/(.*)$': ['<rootDir>/src/modules/$1/$1'],
        '^company/(.*)$': '<rootDir>/src/modules/company/$1/$1'
    },
};

export default config;
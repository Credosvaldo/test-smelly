import js from '@eslint/js';
import jest from 'eslint-plugin-jest';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                exports: 'writable',
                module: 'writable',
                require: 'readonly',
            }
        },
        plugins: {
            jest
        },
        rules: {
            'jest/no-disabled-tests': 'warn',
            'jest/no-conditional-expect': 'error',
            'jest/no-identical-title': 'error'
        }
    },
    {
        files: ['test/**/*.js', '**/*.test.js', '**/*.spec.js'],
        languageOptions: {
            globals: {
                ...jest.environments.globals.globals,
                describe: 'readonly',
                it: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                jest: 'readonly'
            }
        },
        plugins: {
            jest
        },
        rules: {
            ...jest.configs.recommended.rules,
            'jest/no-disabled-tests': 'warn',
            'jest/no-conditional-expect': 'error',
            'jest/no-identical-title': 'error'
        }
    }
];

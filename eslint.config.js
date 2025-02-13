import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
    js.configs.recommended,
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'],
        ignores: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: [
                    path.join(__dirname, 'tsconfig.json'),
                    path.join(__dirname, 'tsconfig.app.json'),
                    path.join(__dirname, 'tsconfig.node.json'),
                ],
                tsconfigRootDir: __dirname,
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            import: pluginImport,
            'jsx-a11y': pluginJsxA11y,
            react: pluginReact,
            'react-hooks': pluginReactHooks,
            'react-refresh': pluginReactRefresh,
            prettier: pluginPrettier,
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': { typescript: {} },
        },
        rules: {
            'no-undef': 'off',
            // React
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/prop-types': 'off',
            'react/jsx-sort-props': 'off',
            'react/react-in-jsx-scope': 'off',

            // Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Import
            'import/extensions': 'off',
            'import/no-cycle': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/no-unresolved': 'off',
            'import/order': 'off',
            'import/prefer-default-export': 'off',

            // JSX Accessibility
            'jsx-a11y/no-noninteractive-element-interactions': 'off',
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',

            // TypeScript
            '@typescript-eslint/no-shadow': ['error'],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'off',

            // Misc
            'no-console': 'off',
            'no-underscore-dangle': 'off',
            'no-unsafe-optional-chaining': 'off',
            'global-require': 'off',
            'no-param-reassign': 'off',
            'no-shadow': 'off',
            'no-unused-vars': 'off',
            'no-unneeded-ternary': 'off',
            'no-restricted-exports': 'off',
            'no-useless-computed-key': 'off',
            'prefer-destructuring': ['warn', { array: false, object: true }],
            'spaced-comment': ['warn', 'always', { markers: ['/'] }],

            // Prettier
            'prettier/prettier': [
                'warn',
                {
                    arrowParens: 'always',
                    semi: true,
                    trailingComma: 'es5',
                    tabWidth: 4,
                    endOfLine: 'auto',
                    useTabs: false,
                    singleQuote: true,
                    printWidth: 120,
                    jsxSingleQuote: true,
                },
            ],
            indent: 'off', // Tắt cảnh báo về thụt dòng
            'no-mixed-spaces-and-tabs': 'off', // Tắt cảnh báo mix tab & space
        },
    },
    prettierConfig, // Đảm bảo Prettier được áp dụng cuối cùng
];

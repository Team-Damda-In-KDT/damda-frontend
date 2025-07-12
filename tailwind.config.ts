import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            // 향후 필요 시 colors, fontFamily, spacing 등을 여기에 확장
        },
    },
    plugins: [],
};

export default config;

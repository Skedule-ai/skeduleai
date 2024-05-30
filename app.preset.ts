import { Config } from 'tailwindcss';

const appPreset: Partial<Config> = {
    theme: {
        extend: {
            width: {
                15: '58px',
                75: '303px',
            },

            colors: {
                primary: {
                    500: '#7B79FF',
                    600: '#4945FF',
                    700: '#271FE0',
                },
                secondary: {
                    100: '#F0F0FF',
                    200: '#D9D8FF',
                },
                tertiary: {
                    100: '#F6F6F9',
                    150: '#EAEAEF',
                    200: '#DCDCE4',
                    800: '#32324D',
                },
                danger: {
                    600: '#D02B20',
                },
            },
        },
    },
};

export default appPreset;

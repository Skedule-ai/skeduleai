import { Config } from 'tailwindcss';

const appPreset: Partial<Config> = {
    theme: {
        extend: {
            width: {
                15: '58px',
                75: '303px',
            },

            fontSize: {
                xxs: '11px',
            },

            colors: {
                primary: {
                    100: '#F0F0FF',
                    200: '#D9D8FF',
                    500: '#7B79FF',
                    600: '#4945FF',
                    700: '#271FE0',
                },

                secondary: {
                    100: '#EAF5FF',
                    200: '#B8E1FF',
                    500: '#66B7F1',
                    600: '#0C75AF',
                    700: '#006096'
                },

                neutral: {
                    0: '#FFFFFF',
                    100: '#F6F6F9',
                    150: '#EAEAEF',
                    200: '#DCDCE4',
                    300: '#C0C0CF',
                    400: '#A5A5BA',
                    500: '#8E8EA9',
                    600: '#666687',
                    700: '#4A4A6A',
                    800: '#32324D',
                    900: '#212134',
                    1000: '#181826',
                },
                danger: {
                    600: '#D02B20',
                },
            },
        },
    },
};

export default appPreset;

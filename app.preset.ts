import { Config } from 'tailwindcss';
import defaultColors from  'tailwindcss/colors';

export const colors = {
    primary: defaultColors.blue,
    secondary: defaultColors.purple,
    neutral: defaultColors.neutral,
    green: defaultColors.green,
    red: defaultColors.red,
    amber: defaultColors.amber,
    sky: defaultColors.sky
}

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

            colors,
        },
    },
};

export default appPreset;

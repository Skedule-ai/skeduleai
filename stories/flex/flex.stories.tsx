import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@/components/flex'

const meta: Meta<typeof Flex> = {
    component: Flex,
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const flex: Story = {
    args: {
        inline: false,
        dir: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        fullWidth: true,
        reverse: false,
        wrap: true,
        gap: 2,
        gapX: 2,
        gapY: 3,
    },
};

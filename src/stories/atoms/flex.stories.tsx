import type { Meta, StoryObj } from '@storybook/react';
import { Flex, FlexItem } from '@/components/atoms/flex';

const meta: Meta<typeof Flex> = {
    title: 'Atoms/Flex',
    component: Flex,
    parameters: {},
    tags: ['autodocs'],
    argTypes: {
        dir: { control: 'select', options: ['row', 'column'] },
        gapX: { control: 'number' },
        gapY: { control: 'number' },
    },
    args: {},
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

const itemCss = 'size-10 border border-neutral-950';
export const FlexBox: Story = {
    args: {
        inline: false,
        dir: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        fullWidth: true,
        reverse: false,
        wrap: true,
        gap: 2,
        children: (
            <>
                <FlexItem className={itemCss}>1</FlexItem>
                <FlexItem className={itemCss}>2</FlexItem>
                <FlexItem className={itemCss}>3</FlexItem>
                <FlexItem className={itemCss}>4</FlexItem>
                <FlexItem className={itemCss}>5</FlexItem>
            </>
        ),
    },
};

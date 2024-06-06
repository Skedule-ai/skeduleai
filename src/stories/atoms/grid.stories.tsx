import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@/components/atoms/grid';

const meta: Meta<typeof Grid> = {
    title: 'Atoms/Grid',
    component: Grid,
    parameters: {},
    tags: ['autodocs'],
    argTypes: {
        columns: { control: 'number' },
        rows: { control: 'number' },
        gap: { control: 'number' },
        gapX: { control: 'number' },
        gapY: { control: 'number' },
    },
    args: {},
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof Grid>;

const itemCss = 'size-10 bg-neutral-950';
export const GridBox: Story = {
    args: {
        columns: 1,
        rows: 5,
        gap: 4,
        children: (
            <>
                <span className={itemCss}>1</span>
                <span className={itemCss}>2</span>
                <span className={itemCss}>3</span>
                <span className={itemCss}>4</span>
                <span className={itemCss}>5</span>
            </>
        ),
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@/components/grid'

const meta: Meta<typeof Grid> = {
    component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const grid: Story = {
    args: {
        columns: 1,
        rows: 5,
        gap: 4,
        gapX: 3,
        gapY: 4,
    }
};


import type { Meta, StoryObj } from '@storybook/react';
import Text from '@/components/atoms/text';
import { fontSize, fontWeight, fontColor } from '@/components/atoms/text/text.variants';

const meta: Meta<typeof Text> = {
    title: 'Atoms/Text',
    component: Text,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: Object.keys(fontSize) },
        weight: { control: 'select', options: Object.keys(fontWeight) },
        color: { control: 'select', options: Object.keys(fontColor) },
    },
    args: {},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

export const RegularText: Story = {
    args: {
        children: 'Hello world',
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Header1, Header2, Header3, Subtitle, Body, SmallText, BodyHightlight, TabelLabel } from '@/components/text/Typography';

type TypographyType  = { children: any}

const meta: Meta<TypographyType> = {
    component: Header1,
};

export default meta;
type Story = StoryObj<TypogrpahyType>;

export const headerOne: Story = {
    args: {
        children: 'Hello world'
    }
}
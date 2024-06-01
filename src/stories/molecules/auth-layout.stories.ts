import type { Meta, StoryObj } from "@storybook/react";
import AuthLayout from "../../components/molecules/layout/auth-layout";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: "Molecules/Auth Layout",
    component: AuthLayout,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {}
} satisfies Meta<typeof AuthLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ExampleAuthLayout: Story = {
    args: {
        children: "Auth layout design is in progress."
    },
};
import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    label: { control: "text" },
    name: { control: "text" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
    required: { control: "boolean" },
    errorMessage: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = { args: { label: "Label" } };
export const WithPlaceholder: Story = { args: { placeholder: "Placeholder" } };
export const WithLabelAndDefaultValue: Story = { args: { label: "Label", defaultValue: "Default value" } };
export const Required: Story = { args: { label: "Label", placeholder: "Placeholder", required: true } };
export const WithError: Story = {
  args: { label: "Label", defaultValue: "Default value", errorMessage: "Error messaage", required: true },
};

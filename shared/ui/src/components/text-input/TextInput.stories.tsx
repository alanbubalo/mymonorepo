import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = { args: {} };
export const WithLabel: Story = { args: { label: "Label" } };
export const WithPlaceholder: Story = { args: { placeholder: "Placeholder" } };
export const WithDefaultValue: Story = { args: { defaultValue: "Default value" } };
export const Required: Story = { args: { label: "Label", required: true } };
export const WithError: Story = { args: { label: "Label", errorMessage: "Error", required: true } };

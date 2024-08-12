import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    name: { control: "text" },
    defaultValue: { control: "text" },
    required: { control: "boolean" },
    errorMessage: { control: "text" },
  },
};

export default meta;

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

type Story = StoryObj<typeof Select>;

export const Default: Story = { args: { label: "Label", optionsList: mockOptions } };
export const Disabled: Story = { args: { disabled: true, optionsList: mockOptions } };
export const WithError: Story = {
  args: { label: "Label", optionsList: mockOptions, errorMessage: "Error", required: true },
};

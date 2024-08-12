import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;

const mockOptions = (
  <>
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </>
);

type Story = StoryObj<typeof Select>;

export const Default: Story = { args: { children: mockOptions } };
export const WithLabel: Story = { args: { label: "Label", children: mockOptions } };
export const Disabled: Story = { args: { disabled: true, children: mockOptions } };
export const WithError: Story = {
  args: { label: "Label", children: mockOptions, errorMessage: "Error", required: true },
};

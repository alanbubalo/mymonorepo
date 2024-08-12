import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    className: { control: "text" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = { args: {} };

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: "Click me" } };

export const Transparent: Story = { args: { children: "Click me", variant: "transparent" } };

export const WithLink = () => (
  <MemoryRouter initialEntries={["/"]}>
    <Button to="/">Click me</Button>
  </MemoryRouter>
);

export const WithTransparentLink = () => (
  <MemoryRouter initialEntries={["/"]}>
    <Button to="/" variant="transparent">
      Click me
    </Button>
  </MemoryRouter>
);

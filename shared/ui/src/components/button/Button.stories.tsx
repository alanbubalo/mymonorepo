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

export const Primary: Story = { args: { ...Default.args, variant: "primary" } };
export const Danger: Story = { args: { ...Default.args, variant: "danger" } };

export const TransparentPrimary: Story = { args: { ...Default.args, variant: "primary", transparent: true } };
export const TransparentDanger: Story = { args: { ...Default.args, variant: "danger", transparent: true } };

export const WithLink = () => (
  <MemoryRouter initialEntries={["/"]}>
    <Button to="/" variant="primary" transparent={false} disabled={false}>
      Click me
    </Button>
  </MemoryRouter>
);

export const WithTransparentLink = () => (
  <MemoryRouter initialEntries={["/"]}>
    <Button to="/" variant="primary" transparent disabled={false}>
      Click me
    </Button>
  </MemoryRouter>
);

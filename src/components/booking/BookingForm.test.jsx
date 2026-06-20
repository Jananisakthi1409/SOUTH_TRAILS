import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import BookingForm from "./BookingForm";

const baseForm = {
  travelers: 2,
  travelDate: "",
  fullName: "",
  email: "",
  phone: "",
  paymentMethod: "online",
};

describe("BookingForm", () => {
  it("emits field changes and submit events", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const onBack = vi.fn();

    render(
      <BookingForm
        form={baseForm}
        price="Rs. 12,000"
        totalAmount="Rs. 24,000"
        onChange={onChange}
        onSubmit={onSubmit}
        onBack={onBack}
      />
    );

    await user.clear(screen.getByLabelText(/number of travelers/i));
    await user.type(screen.getByLabelText(/number of travelers/i), "3");
    await user.click(screen.getByRole("button", { name: /proceed to booking/i }));
    await user.click(screen.getByRole("button", { name: /back to packages/i }));

    expect(onChange).toHaveBeenCalledWith("travelers", "");
    expect(onChange).toHaveBeenCalledWith("travelers", "23");
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("shows validation errors and disabled saving state", () => {
    render(
      <BookingForm
        form={baseForm}
        price="Rs. 12,000"
        totalAmount="Rs. 24,000"
        error="Please enter a valid phone number."
        isSubmitting
        onChange={() => {}}
        onSubmit={() => {}}
        onBack={() => {}}
      />
    );

    expect(screen.getByText("Please enter a valid phone number.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
  });
});

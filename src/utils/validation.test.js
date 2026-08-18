import { describe, expect, it } from "vitest";
import {
  validateBookingForm,
  validateContactForm,
  validateLoginForm,
  validatePackageForm,
  validateSignupForm,
} from "./validation";

describe("validation helpers", () => {
  it("validates login form email and password", () => {
    expect(validateLoginForm({ email: "", password: "" })).toBe("Email address is required.");
    expect(validateLoginForm({ email: "bad", password: "secret" })).toBe("Please enter a valid email address.");
    expect(validateLoginForm({ email: "user@example.com", password: "secret" })).toBe("");
  });

  it("validates signup form", () => {
    const form = {
      fullName: "Janani",
      phone: "+91 9876543210",
      email: "janani@example.com",
      address: "Chennai",
      password: "secret1",
      confirmPassword: "secret1",
      agree: true,
    };

    expect(validateSignupForm({ ...form, phone: "123" })).toBe("Please enter a valid phone number.");
    expect(validateSignupForm({ ...form, confirmPassword: "different" })).toBe("Passwords do not match.");
    expect(validateSignupForm(form)).toBe("");
  });

  it("validates contact and package forms", () => {
    expect(validateContactForm({ name: "A", email: "a@b.com", phone: "9876543210", message: "Hi" })).toBe("");
    expect(validatePackageForm({
      title: "Ooty",
      destination: "Ooty",
      state: "Tamil Nadu",
      price: "12000",
      days: "3",
      nights: "2",
      category: "Family",
      description: "Hill station escape",
    })).toBe("");
  });

  it("validates booking forms", () => {
    const form = {
      travelers: "2",
      travelDate: "2026-12-20",
      fullName: "Janani S",
      email: "janani@example.com",
      phone: "+91 9876543210",
      paymentMethod: "online",
    };

    expect(validateBookingForm({ ...form, travelers: "0" })).toBe("Please choose at least one traveler.");
    expect(validateBookingForm({ ...form, travelDate: "" })).toBe("Travel date is required.");
    expect(validateBookingForm({ ...form, email: "bad" })).toBe("Please enter a valid email address.");
    expect(validateBookingForm(form)).toBe("");
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { createBooking, getBookings } from "./bookingService";

describe("bookingService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends Spring Boot snake_case booking payloads", async () => {
    let capturedBody = null;
    vi.stubGlobal("fetch", vi.fn(async (_url, options) => {
      capturedBody = JSON.parse(options.body);
      return new Response(JSON.stringify({ id: "BK-1", ...capturedBody }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }));

    const result = await createBooking({
      customer_id: "C-1",
      package_id: "ooty-family-escape",
      package_snapshot: { title: "Ooty Family Escape" },
      travel_date: "2026-12-20",
      travelers: 2,
      total_amount: 37998,
      special_request: "Window seat",
    });

    expect(result.error).toBeNull();
    expect(capturedBody).toMatchObject({
      customer_id: "C-1",
      package_id: "ooty-family-escape",
      package_snapshot: JSON.stringify({ title: "Ooty Family Escape" }),
      travel_date: "2026-12-20",
      travelers: 2,
      total_amount: 37998,
      special_request: "Window seat",
    });
    expect(capturedBody).not.toHaveProperty("customerId");
  });

  it("normalizes Spring Boot booking responses for the UI", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify([
      {
        id: "BK-2",
        packageSnapshot: JSON.stringify({ title: "Kerala Explorer" }),
        travelDate: "2026-12-21",
        totalAmount: 29999,
      },
    ]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })));

    const bookings = await getBookings();

    expect(bookings[0]).toMatchObject({
      id: "BK-2",
      packageName: "Kerala Explorer",
      travelDate: "2026-12-21",
      totalAmount: 29999,
    });
  });
});

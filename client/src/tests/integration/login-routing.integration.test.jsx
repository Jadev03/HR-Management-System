import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Login from "../../components/modules/Login";

const mockPost = jest.fn();

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    post: (...args) => mockPost(...args),
  },
}));

describe("Login integration tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it("moves from /login to /admin route after successful admin login", async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        status: "Success",
        role: "Admin",
        EMP_id: "E000001",
      },
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<div>Admin Route Loaded</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter User ID"), {
      target: { value: "U000001" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "admin123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Admin Route Loaded")).toBeInTheDocument();
      expect(sessionStorage.getItem("user")).toBe("E000001");
    });
  });

  it("stays on login page and shows error for invalid credentials", async () => {
    mockPost.mockResolvedValueOnce({ data: "Invalid" });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<div>Admin Route Loaded</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter User ID"), {
      target: { value: "U000009" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByText("User ID or password is incorrect")).toBeInTheDocument();
    expect(screen.queryByText("Admin Route Loaded")).not.toBeInTheDocument();
  });
});

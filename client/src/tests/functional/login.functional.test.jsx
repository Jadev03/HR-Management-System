import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Login from "../../components/modules/Login";

const mockPost = jest.fn();

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    post: (...args) => mockPost(...args),
  },
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login functional tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it("renders login form fields and button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter User ID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("navigates admin user and stores employee id on successful login", async () => {
    mockPost.mockResolvedValueOnce({
      data: {
        status: "Success",
        role: "Admin",
        EMP_id: "E000001",
      },
    });

    render(
      <MemoryRouter>
        <Login />
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
      expect(mockPost).toHaveBeenCalledWith('/login', {
        User_ID: "U000001",
        Password: "admin123",
      });
      expect(sessionStorage.getItem("user")).toBe("E000001");
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });
  });

  it("shows invalid credentials message for unsuccessful login", async () => {
    mockPost.mockResolvedValueOnce({ data: "Invalid" });

    render(
      <MemoryRouter>
        <Login />
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
  });

  it("shows generic error message on API failure", async () => {
    mockPost.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter User ID"), {
      target: { value: "U000001" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: "admin123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByText("An error occurred during login")).toBeInTheDocument();
  });
});

import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Post } from "./Post";
import { AuthContext } from "../../contexts/AuthContext";

test("Post component should render correctly", () => {
  const user = { name: "Giorgio", token: "testToken" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <Post />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText("Post")).toBeInTheDocument();
  expect(screen.queryByRole("button")).toBeInTheDocument();
});

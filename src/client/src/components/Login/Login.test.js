import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Login } from "./Login";
import { AuthContext } from "../../contexts/AuthContext";

test("Login popup should render correctly", () => {
  const onSigning = () => {};

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{onSigning}}>
        <Login />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText('Log in')).toBeInTheDocument();
});

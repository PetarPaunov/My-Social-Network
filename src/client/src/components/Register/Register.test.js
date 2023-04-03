import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render, screen} from "@testing-library/react";

import "@testing-library/jest-dom";

import { Register } from "./Register";
import { AuthContext } from "../../contexts/AuthContext";

test("Register component should render correctly", () => {
  const onSigning = () => {};

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ onSigning }}>
        <Register />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText("Sing up")).toBeInTheDocument();
});
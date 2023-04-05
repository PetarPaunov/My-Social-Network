import React from "react";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Error404 } from "./Error404";
import { AuthContext } from "../../contexts/AuthContext";

test("Error404 component should render correctly", () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{}}>
        <Error404 />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText("Damnit stranger,")).toBeInTheDocument();
});

test("Go back to earth. button should redirect to home page", () => {
  const expectedLocation = "/";

  global.window = { location: { pathname: null } };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{}}>
        <Error404 />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.queryByText("Go back to earth."));

  expect(global.window.location.pathname).toContain(expectedLocation);
});

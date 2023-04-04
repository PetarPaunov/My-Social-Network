import React from "react";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Modal } from "./Modal";
import { AuthContext } from "../../contexts/AuthContext";

test("Modal should render properly", () => {
  render(
    <AuthContext.Provider value={{}}>
      <Modal />
    </AuthContext.Provider>
  );

  expect(screen.queryByText('Cancel')).toBeInTheDocument();
  expect(screen.queryByText('Delete')).toBeInTheDocument();
});

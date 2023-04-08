import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Modal } from "./Modal";
import { AuthContext } from "../../contexts/AuthContext";

test("Modal should render properly", () => {
  render(
    <AuthContext.Provider value={{}}>
      <Modal />
    </AuthContext.Provider>
  );

  expect(screen.queryByText("Cancel")).toBeInTheDocument();
  expect(screen.queryByText("Delete")).toBeInTheDocument();
});

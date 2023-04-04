import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Comment } from "./Comment";
import { AuthContext } from "../../../contexts/AuthContext";

test("Comment should render correctly", () => {
  render(
    <AuthContext.Provider>
      <Comment applicationUserUsername={'test username'} description={'test description'}/>
    </AuthContext.Provider>
  );

  expect(screen.queryByText('test username')).toBeInTheDocument();
  expect(screen.queryByText('test description')).toBeInTheDocument();
});

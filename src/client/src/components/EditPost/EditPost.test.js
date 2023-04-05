import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { EditPost } from "./EditPost";
import { AuthContext } from "../../contexts/AuthContext";

const postInfoFakeObject = {
  id: "id",
  title: "title test",
  description: "description test",
};

test("EditPost component should render correctly", () => {
  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <EditPost postInfo={postInfoFakeObject} />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText("Edit Post")).toBeInTheDocument();
  expect(screen.queryByText("Drop files here")).toBeInTheDocument();
  expect(screen.queryByText("Edit")).toBeInTheDocument();
});

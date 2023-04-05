import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";

import { FriendSection } from "./FriendSection";
import { AuthContext } from "../../contexts/AuthContext";

const friendTestObject = {
  userId: "id",
  imageUrl: null,
  username: "Test username",
};

test("FriendSection component should render correctly", () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{}}>
        <FriendSection firend={friendTestObject} />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText("Test username")).toBeInTheDocument();
});

test("Clicking on friend should redirect correclty", () => {
  const expectedLocation = "/friend/id";

  global.window = { location: { pathname: null } };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{}}>
        <FriendSection firend={friendTestObject} />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.queryByRole("img"));

  expect(global.window.location.pathname).toContain(expectedLocation);
});

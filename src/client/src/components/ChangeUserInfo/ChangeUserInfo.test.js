import React from "react";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { ChangeUserInfo } from "./ChangeUserInfo";
import { AuthContext } from "../../contexts/AuthContext";

const userInfoFakeObject = {
  firstName: "firstName",
  lastName: "lastName",
  userName: "userName",
  address: "address",
};

test("ChangeUserInfo component should render correctly", () => {
  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <ChangeUserInfo userInfo={userInfoFakeObject} />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText("Change Information")).toBeInTheDocument();
  expect(screen.queryByText("Drop files here")).toBeInTheDocument();
});

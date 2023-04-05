import React from "react";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { FriendRequest } from "./FriendRequest";
import { AuthContext } from "../../contexts/AuthContext";

const requestsFakeObject = {
  requestId: "reqId",
  userId: "userId",
  username: "username",
  firstName: "firstName",
  lastName: "lastName",
  imageUrl: null,
};

const server = setupServer(
  rest.get(
    "http://localhost:5236/api/Request/all-requests",
    (req, res, ctx) => {
      return res(ctx.json([requestsFakeObject]));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Don't have any friend requests yet! should be rendered", async () => {
  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };

  server.use(
    rest.get(
      "http://localhost:5236/api/Request/all-requests",
      (req, res, ctx) => {
        return res(ctx.json([]));
      }
    )
  );

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <FriendRequest />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.queryByText("Don't have any friend requests yet!")
    ).toBeInTheDocument();
  });
});

test("Friend requests should be diplayed properly", async () => {
  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <FriendRequest />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.queryByText("username")).toBeInTheDocument();
  });
});

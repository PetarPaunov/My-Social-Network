import React from "react";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Main } from "./Main";
import { AuthContext } from "../../contexts/AuthContext";

const postsRequestObject = {
  comments: [],
  commentsCount: 0,
  description:
    "New post test 123New post test 123New post test 123New post test 123New post test 123",
  id: "a3dbadeb-dd26-4b91-cb8d-08db2f9e2861",
  imageUrl: null,
  likes: 0,
  title: "New post test 123",
  userId: "2e80d0e6-57fa-436a-9e33-bb7668dc3a8e",
  userImage: "testImage",
  userName: "TestUser Username",
};

const userFriendsRequestObject = {
  userId: "Id",
  username: "friend userName",
  firstName: "friend firstName",
  lastName: "friend lastName",
  imageUrl: null,
  address: null,
};

const server = setupServer(
  rest.get("http://localhost:5236/api/Post/all", (req, res, ctx) => {
    return res(ctx.json([postsRequestObject]));
  }),
  rest.get("http://localhost:5236/api/UserProfile/friends", (req, res, ctx) => {
    return res(ctx.json([userFriendsRequestObject]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Add new post button should work correctly", async () => {
  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <Main />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => screen.queryByText("Add new post"));

  fireEvent.click(screen.queryByText("Add new post"));

  expect(screen.queryByText("Add Post")).toBeInTheDocument();
});

test("Add new post button should not be rendered if user is not logged in", () => {
  const user = { name: "Giorgio", token: "testToken" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <Main />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText("Add Post")).not.toBeInTheDocument();
});

test("Post should be rendered corrctly", async () => {
  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <Main />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.queryByText(postsRequestObject.description)
    ).toBeInTheDocument();
  });
});

test("User friends should be rendered correctly", async () => {
  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <Main />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.queryByText("Friends")).toBeInTheDocument();
  });
});

test("User friends should not be rendered", async () => {
  server.use(
    rest.get(
      "http://localhost:5236/api/UserProfile/friends",
      (req, res, ctx) => {
        return res(ctx.json([]));
      }
    )
  );

  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <Main />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.queryByText("Friends")).not.toBeInTheDocument();
  });
});

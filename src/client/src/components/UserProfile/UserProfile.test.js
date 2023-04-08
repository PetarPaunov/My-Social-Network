import React from "react";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { UserProfile } from "./UserProfile";
import { AuthContext } from "../../contexts/AuthContext";

const userInfoRequestObject = {
  address: "TestAddress",
  firstName: "TestUser FirstName",
  imageUrl: "testImage",
  lastName: "TestUser LastName",
  userName: "TestUser Username",
};

const userPostsRequestObject = {
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
  userName: "TestUser Username1",
};

const server = setupServer(
  rest.get(
    "http://localhost:5236/api/UserProfile/user-profile",
    (req, res, ctx) => {
      return res(ctx.json(userInfoRequestObject));
    }
  ),
  rest.get("http://localhost:5236/api/Post/get-user-posts", (req, res, ctx) => {
    return res(ctx.json([userPostsRequestObject]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Should return user info correct", async () => {
  const user = { name: "Giorgio", token: "testToken" };
  const onUserInfoChange = () => {};

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user, onUserInfoChange }}>
        <UserProfile />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.queryByText(userInfoRequestObject.firstName)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(userInfoRequestObject.lastName)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(userInfoRequestObject.userName)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(userInfoRequestObject.address)
    ).toBeInTheDocument();
  });
});

test("Should render all user posts", async () => {
  const user = { name: "Giorgio", token: "testToken" };
  const onUserInfoChange = () => {};

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user, onUserInfoChange }}>
        <UserProfile />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.queryByText(userPostsRequestObject.description)
    ).toBeInTheDocument();
  });
});

import React from "react";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { FriendPorfile } from "./FriendProfile";
import { AuthContext } from "../../contexts/AuthContext";

const firnedInfoRequestObject = {
  address: "TestAddress",
  firstName: "TestUser FirstName",
  imageUrl: "testImage",
  lastName: "TestUser LastName",
  username: "TestUser Username",
};

const firnedPostsRequestObject = {
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
    "http://localhost:5236/api/UserProfile/friend-info",
    (req, res, ctx) => {
      return res(ctx.json(firnedInfoRequestObject));
    }
  ),
  rest.get(
    "http://localhost:5236/api/Post/get-friend-posts",
    (req, res, ctx) => {
      return res(ctx.json([firnedPostsRequestObject]));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Should return firend info correct", async () => {
  const user = { name: "Giorgio", token: "testToken", userId: "id" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <FriendPorfile />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.queryByText(firnedInfoRequestObject.firstName)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(firnedInfoRequestObject.lastName)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(firnedInfoRequestObject.username)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(firnedInfoRequestObject.address)
    ).toBeInTheDocument();
  });
});

test("Should render all friend posts", async () => {
  const user = { name: "Giorgio", token: "testToken" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user }}>
        <FriendPorfile />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(
      screen.queryByText(firnedPostsRequestObject.description)
    ).toBeInTheDocument();
  });
});

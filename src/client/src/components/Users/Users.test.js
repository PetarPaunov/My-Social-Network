import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Users } from "./Users";
import { AuthContext } from "../../contexts/AuthContext";

const testReturnObject = [
  {
    address: null,
    firstName: "testFirstName",
    imageUrl: "testImage",
    lastName: "testLastName",
    userId: "0749eed2-01ee-444a-a27d-8b00862ca907",
    username: "testUsername",
  },
  {
    address: null,
    firstName: "testFirstName1",
    imageUrl: "testImage",
    lastName: "testLastName1",
    userId: "0749eed2-01ee-444a-a27d-8b00862ca904",
    username: "testUsername1",
  },
];

const server = setupServer(
  rest.post("http://localhost:5236/api/UserProfile/all-users", (req, res, ctx) => {
    return res(ctx.json(testReturnObject));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Gets all registered users", async () => {
  const firstUser = 'testUsername';
  const secondUser = 'testUsername';

  const user = { name: "Giorgio", token:'testToken' };

  render(
    <AuthContext.Provider value={{user}}>
      <Users />
    </AuthContext.Provider>
  );

  await waitFor(() => screen.getAllByRole('img'));

  expect(screen.getByText(firstUser)).toBeInTheDocument();
  expect(screen.getByText(secondUser)).toBeInTheDocument();
});

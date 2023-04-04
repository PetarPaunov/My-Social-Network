import React from "react";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { PostArticle } from "./PostArticle";
import { AuthContext } from "../../../contexts/AuthContext";


test("Post article component should render correctly", () => {
  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{user}}>
        <PostArticle comments={[]}/>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText('Like this post')).toBeInTheDocument();
});

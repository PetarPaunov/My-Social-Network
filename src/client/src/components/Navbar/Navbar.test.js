import React from "react";
import { BrowserRouter } from "react-router-dom";

import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Navbar } from "./Navbar";
import { AuthContext } from "../../contexts/AuthContext";

test("Logo should navigate correctly to home page", () => {
  const expectedLocation = "/";

  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };
  const onLogout = () => {};

  global.window = { location: { pathname: null } };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user, onLogout }}>
        <Navbar />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.queryByText("MB"));

  expect(global.window.location.pathname).toContain(expectedLocation);
});

test("Home button should navigate correctly to home page", () => {
  const expectedLocation = "/";

  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };
  const onLogout = () => {};

  global.window = { location: { pathname: null } };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user, onLogout }}>
        <Navbar />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.queryByText("Home"));

  expect(global.window.location.pathname).toContain(expectedLocation);
});

test("Users button should navigate correctly to users page", () => {
  const expectedLocation = "/users";

  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };
  const onLogout = () => {};

  global.window = { location: { pathname: null } };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user, onLogout }}>
        <Navbar />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.queryByText("Users"));

  expect(global.window.location.pathname).toContain(expectedLocation);
});

test("Requests button should navigate correctly to requests page", () => {
  const expectedLocation = "/friend-requests";

  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };
  const onLogout = () => {};

  global.window = { location: { pathname: null } };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user, onLogout }}>
        <Navbar />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.queryByText("Requests"));

  expect(global.window.location.pathname).toContain(expectedLocation);
});

test("User image button should navigate correctly to user profile page", () => {
  const expectedLocation = "/user-profile";

  const user = { name: "Giorgio", token: "testToken", email: "test@abv.bg" };
  const onLogout = () => {};

  global.window = { location: { pathname: null } };

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user, onLogout }}>
        <Navbar />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.queryByRole("img"));

  expect(global.window.location.pathname).toContain(expectedLocation);
});

/// <reference types="cypress" />

import faker from "@faker-js/faker";

const email = `${faker.internet.userName()}@tecno-brega-stack.com`;
const password = "password";

describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads home page as unauthenticated user", () => {
    cy.contains("Login");
    cy.contains("Create account");
  });

  it("creates new account", () => {
    cy.contains("Create account").click();
    cy.contains("SignUp");

    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);

    cy.get("form").submit();

    cy.contains("Please, check you email to confirm your registration.");
  });

  it("login to the new account", () => {
    cy.contains("Login").click();
    cy.contains("SignIn");

    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);

    cy.get("form").submit();

    cy.contains("Notes");
  });

  it("creates a new note", () => {
    cy.contains("Login").click();
    cy.contains("SignIn");

    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);

    cy.get("form").submit();

    cy.contains("Notes").click();
    cy.contains("Notes");

    const newNote = faker.random.words(3);

    cy.get("input[name=content]").type(newNote);

    cy.contains("Create note").click();

    cy.get("input[name=content]").clear();

    cy.contains(newNote);

    cy.contains("Logout").click();

    cy.contains("Welcome to tecno-brega-stack");
  });
});

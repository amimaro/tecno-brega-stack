/// <reference types="cypress" />

describe("home page", () => {
  it("loads home page", () => {
    cy.visit("/");
    cy.contains("Welcome to tecno-brega-stack");
  });
});

/// <reference types="Cypress" />

describe("todo", () => {
  before(() => cy.visit("http://localhost:2000/todo"));

  it("should be created", () => {
    const todo = "test todo";
    cy.get("input[type=text]")
      .type(todo)
      .should("have.value", todo);
    cy.get("input[type=submit]").click();
    cy.get("input[type=text]").should("have.value", "");
    cy.get("[data-testid=todo]")
      .find("div")
      .should("contain", todo);
  });

  it("shouldn't be created with empty content", () => {
    const todo = "   ";
    cy.get("input[type=text]")
      .type(todo)
      .should("have.value", todo);
    cy.get("input[type=submit]").click();
    cy.get("input[type=text]").should("have.value", "");
    cy.get("[data-testid=todo]:nth-child(2)").should("not.exist");
  });

  it("should be completed", () => {
    cy.get("[data-testid=todo]")
      .contains("Complete")
      .click();
    cy.get("[data-testid=todo]").should(
      "have.css",
      "background-color",
      "rgb(128, 128, 128)",
    );
  });

  it("should be deleted", () => {
    cy.get("[data-testid=todo]")
      .contains("Delete")
      .click();
    cy.get("[data-testid=todo]:nth-child(1)").should("not.exist");
  });
});

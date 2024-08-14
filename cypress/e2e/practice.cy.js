describe("Practice", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
  });
  it("It should login and add products to the cart", () => {
    // Login
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    // Verify login was successful
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    // Add products to the cart
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get("#add-to-cart-sauce-labs-bike-light").click();
    cy.get("span.shopping_cart_badge").should("have.text", "2");
    // Navigate to the cart
    cy.get("#shopping_cart_container").click();
    cy.url().should("eq", "https://www.saucedemo.com/cart.html");
    // Check if products are added
    cy.contains(
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
    ).should("be.visible");
    cy.contains(
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
    ).should("be.visible");
    // Test Checkout
    cy.get("#checkout").click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html");
    cy.get("#first-name").type("first name");
    cy.get("#last-name").type("last name");
    cy.get("#postal-code").type("52-131");
    cy.get("#continue").click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");
    cy.contains("43.18").should("be.visible");
    cy.get("#finish").click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html");
    cy.contains(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    ).should("be.visible");
  });
});

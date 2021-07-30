describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("header contains recipe heading with a message that there are no recipes", () => {
      cy.findByRole('heading').should('contain', 'My Recipes')
      cy.get('p')
        .findByText('There are no recipes to list.')
        .should('exist')
    })
    // cypress/integration/home/home.spec.js
it("contains an add recipe button that when clicked opens a form", () => {
  cy.get('#add-recipe').click()
  
    cy.get('form')
      .findByRole('button')
      .should('exist')
  })

  it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
    cy.get('#add-recipe').click()
    expect(cy.get('#newRecipeName')).toExist()
    cy.get('#newRecipeInstructions').should('exist')
  })

  // cypress/integration/home/home.spec.js
  
  it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
    const recipeName = 'Tofu Scramble Tacos';
    cy.get('#add-recipe').click()
    cy.get('#newRecipeName').type(recipeName)
    cy.get('#newRecipeInstructions').type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
  
    return cy.findByRole('button').click()
      .then(() => {
      expect(cy.findByRole('listitem', /tofu scramble tacos/i)).toExist();
      })
  })


  it("should display multiple recipes", () => {
    const recipeName = 'Tofu Scramble Tacos';
    const recipeNameSecond = 'Super Meat Scramble Tacos';
    cy.get('#add-recipe').click()
    cy.get('#newRecipeName').type(recipeName)
    cy.get('#newRecipeInstructions').type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
    cy.get('[type="submit"]').click()
    cy.get('#newRecipeName').clear()
    cy.get('#newRecipeName').type(recipeNameSecond)
    cy.get('#newRecipeInstructions').clear()
    cy.get('#newRecipeInstructions').type("ONLY MEAT")
  
    return cy.get('[type="submit"]').click()
      .then(() => {
      expect(cy.contains(recipeName)).toExist();
      expect(cy.contains(recipeNameSecond)).toExist();
      })
  })


  it("Should display recipe instructions once the recipe name is clicked", () => {
    const recipeName = 'Tofu Scramble Tacos';
    cy.get('#add-recipe').click()
    cy.get('#newRecipeName').type(recipeName)
    cy.get('#newRecipeInstructions').type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
    

    return cy.get('[type="submit"]').click()
      .then(() => {
        cy.get('#newRecipeInstructions').clear()
        cy.get('#newRecipeName').clear()
        cy.get('[data-testid="Tofu Scramble Tacos"]').click()
      expect(cy.get('[data-testid="Tofu Scramble Tacos-instructions"]')).toExist();
      })
  })

})
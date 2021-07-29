//src App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('Add recipe button toggles visibility of a form on the page ', () => {

  render(<App />);
  // `queryBy...` methods will return null if the element is not found:
  const recipeForm = screen.queryByText("Instructions:");

  // `getBy...` methods will "throw" an error if the element is not found:
  // const recipeForm = screen.getByText("Instructions:");

  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText("Add Recipe"));

  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
});

test('typing in the recipe name makes the recipe name appear in the input', async () => {
  render(<App />);

  const recipeName = 'No pockets';
  userEvent.click(screen.getByText("Add Recipe"));
  await userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);

  expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
})
const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('recipe name from state appears in an unordered list', async () => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})

test('displays multiple recipes', async () => {
  const {instructionsInput, nameInput, submitButton} = setup();
  const firstRecipeName = "Lean Pockets"
  const firstRecipeInstructions1= "place in toaster oven on 350 for 45 minutes"

  const secondRecipeName = "Spaghett"
  const secondRecipeInstructions = "boil in water for some time, then throw against wall to see if done"


  await userEvent.type(instructionsInput, firstRecipeInstructions1)
  await userEvent.type(nameInput, firstRecipeName)
  userEvent.click(submitButton);

  //expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(firstRecipeName)).toBeInTheDocument();

  userEvent.clear(screen.getByLabelText('newRecipeName'))
  userEvent.clear(screen.getByLabelText('newRecipeInstructions'))
  await userEvent.type(instructionsInput, secondRecipeInstructions)
  await userEvent.type(nameInput, secondRecipeName)
  userEvent.click(submitButton);

  //expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(secondRecipeName)).toBeInTheDocument();

})
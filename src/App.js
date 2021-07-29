// App.js
import React from 'react';

class App extends React.Component {
  state = {
    isAddRecipeFormDisplayed: false,
    recipes: [],
    newRecipeName: "",
    newRecipeInstructions: ""
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
  
    this.setState({[name]: target.value});
  }
  
  handleRecipeInstructionsChange = (event) => {
    const value = event.target.value;
  
    this.setState({newRecipeInstructions: value});
  }
  
  handleRecipeNameChange = (event) => {
    const value = event.target.value;
  
    this.setState({newRecipeName: value});
  }

  submitRecipe = (event) => {
    event.preventDefault()
    let tempArray = [...this.state.recipes];
    tempArray.push({
      name: this.state.newRecipeName,
      instructions :this.state.newRecipeInstructions
    })
    this.setState({recipes: tempArray})
  }

  toggleAddRecipeForm = () => {
    this.setState({isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed})
  }

  

  render(){
    const addNewRecipeForm = (
        <form id="recipe-form" onSubmit={this.submitRecipe} >
          <label htmlFor="newRecipeName">Recipe name: </label>
          <input type="text"
            aria-label="newRecipeName"
            id="newRecipeName"
            name="newRecipeName"
            onChange={this.handleChange}
            value={this.state.newRecipeName} />
          <label htmlFor="newRecipeInstructions">Instructions:</label>
          <textarea id="newRecipeInstructions"
            name="newRecipeInstructions"
            aria-label="newRecipeInstructions"
            placeholder="write recipe instructions here..."
            onChange={this.handleChange}
            value={this.state.newRecipeInstructions} />
          <input type="submit" />
        </form>
      )

      return (
        <div className="App">
          <h1 className="App-header">My Recipes</h1>
          {
            this.state.isAddRecipeFormDisplayed
            ? addNewRecipeForm
            : <button id="add-recipe" onClick={this.toggleAddRecipeForm}>Add Recipe</button>
          }
          {
            this.state.recipes.length > 0 ? this.state.recipes.map((recipe)=> {
              return(
                <ul>
                <li key = {recipe.name}>
                  {recipe.name}
                  </li>
              </ul>
              )
            }) :
              <p>There are no recipes to list.</p>
          }
        </div>
      )
  }
}

export default App;
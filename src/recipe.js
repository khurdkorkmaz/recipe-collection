// App.js
import React from 'react';

class Recipe extends React.Component {
  
    constructor(props) {
        super(props)

        this.state = {
            instructionsShow: false,
            editNameShow: false,
            editInstructionsShow: false,
            name: this.props.data.name,
            instructions: this.props.data.instructions
    }
    
  }

//   nameChange = () {

//   }

  toggleShowInstructions = () => {
    this.state.instructionsShow ? this.setState({instructionsShow: false}) : this.setState({instructionsShow: true})
  }

editName = () => {
    console.log(this.state.editNameShow)
    this.state.editNameShow ? this.setState({editNameShow: false}) : this.setState({editNameShow:true})
}

editInstructions = () => {
    console.log(this.state.editInstructionsShow)
    this.state.editInstructionsShow ? this.setState({editInstructionsShow: false}) : this.setState({editInstructionsShow:true})
}


  render() {
      return (
        <ul>
            <li aria-label = {this.state.name} onClick={this.toggleShowInstructions} data-testid={this.state.name}>
                <h3>{this.state.name} </h3>
            </li>
            <div>
                <button data-testid={`${this.state.name}-Edit-Button`} onClick={this.editName}>Edit Name</button>
                    {this.state.editNameShow ? <h5>{`Edit Name`}</h5> : <div></div>}
            </div>
            <div>
                {this.state.instructionsShow ? 
                    <div>
                        <h5 data-testid={this.state.name + '-instructions'}>{`${this.state.instructions}`}</h5> 
                        <button data-testid={`${this.state.name}-Edit-Instructions-Button`} onClick={this.editInstructions}>Edit Instructions</button>
                        {this.state.editInstructionsShow ? <h5>{`Edit Instructions`}</h5> : <div></div>}
                    </div> : <div></div> }
        
            </div>
        </ul>
        
      )
  }
}

export default Recipe;
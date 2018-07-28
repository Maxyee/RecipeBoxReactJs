import React, { Component } from 'react';
import './App.css';

import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FromControl from 'react-bootstrap/lib/FormControl';



class App extends Component {

  state = {
    recipes: [
      {recipeName: 'Dylan1', ingredients:['Sexy1', 'Spelling Champ', 'MEGA SMART']},
      {recipeName: 'Dylan2', ingredients:['Sexy2', 'Spelling Champ', 'MEGA SMART']},
      {recipeName: 'Dylan3', ingredients:['Sexy3', 'Spelling Champ', 'MEGA SMART']}
    ],

    showAdd: false,
    showEdit: false,
    currentIndex: 0,
    newestRecipe: {recipeName:"", ingredients:[]}
  }

  //this fuction deletes a recipes
  deleteRecipe(index){
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    this.setState({recipes});
  }

  //update newestRecipe.recipeName
  updateNewRecipe(recipeName,ingredients){
    this.setState({newestRecipe:{recipeName:recipeName, ingredients:ingredients}});
  }

  //save a new recipe to a Recipes
  saveNewRecipe(){
    let recipes = this.state.recipes.slice();
    recipes.push({recipeName:this.state.newestRecipe.recipeName, ingredients:this.state.newestRecipe.ingredients});

    this.setState({recipes});
    this.setState({newestRecipe:{recipeName:'',ingredients:[] }});
    this.close();
  }

  //Closing a Modal
  close = () => {
    if(this.state.showAdd){
      this.setState({showAdd: false});
    }
    if(this.state.showEdit)
    {
      this.setState({showEdit: false});
    }
  }


  //opening A Modal
  open = (state,currentIndex) => {
    this.setState({[state]: true});
    this.setState({ currentIndex });
  }


  //updates recipeName of a recipe
  updateRecipeName(recipeName, currentIndex){
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = {recipeName: recipeName, ingredients: recipes[currentIndex].ingredients};
    this.setState({recipes});
  }

  //updates ingrediants of recipe
  updateIngredients(ingrediants, currentIndex){
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = {recipeName:recipes[currentIndex].recipeName, ingredients:ingrediants};
    this.setState({recipes});
  }

  render() {

    const {recipes,newestRecipe,currentIndex} = this.state;
    

    return (
      <div className="App container">
        {recipes.length > 0 && (
          <div>
            <Accordion>
              {recipes.map((recipe, index) => (
                <Panel header={recipe.recipeName} eventKey = {index} key = {index}>
                  <h1>{recipe.recipeName}</h1>
                  <ol>
                    {recipe.ingredients.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                    
                  <ButtonToolbar>
                    <Button bsStyle='danger' onClick={ (event) => this.deleteRecipe(index) }>Delete Recipe</Button>
                    <Button bsStyle='default' onClick={ (event) => this.open("showEdit", index)}>Edit Recipe</Button>    
                  </ButtonToolbar>  
                </Panel>

              ))}
            </Accordion>
            
            {/* this mode is for show Edit */}
            <Modal show={this.state.showEdit} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Recipe</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>

                    <FormGroup controlId="formBasicText">
                      <ControlLabel>Recipe Name</ControlLabel>
                      <FromControl 
                        type="text" 
                        value={recipes[currentIndex].recipeName} 
                        placeholder="Enter text" 
                        onChange= {(event) => this.updateNewRecipe(event.target.value, currentIndex)}
                      />
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Ingredients</ControlLabel>
                      <FromControl componentClass="textarea" 
                      placeholder="Enter Ingredients (Seperate By Commas)" 
                      onChange= {(event) => this.updateIngredients(event.target.value.split(","), currentIndex)} 
                      value = {recipes[currentIndex].ingredients}>
                      
                      </FromControl>
                    </FormGroup>

                </Modal.Body>
                  
                <Modal.Footer>
                  <Button onClick={(event) => this.saveNewRecipe()}>Save New Recipe</Button>
                </Modal.Footer>
                
            </Modal> 
          </div>
        )} 




          { /* this mode is for show Add */ }
          <Modal show={this.state.showAdd} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Add Recipe</Modal.Title>
                <Modal.Body>

                  <FormGroup controlId="formBasicText">

                    <ControlLabel>Recipe Name</ControlLabel>
                    <FromControl type="text" 
                      value={newestRecipe.recipeName} 
                      placeholder="Enter Recipe Name" 
                      onChange= {(event) => this.updateNewRecipe(event.target.value, newestRecipe.ingredients)}
                    ></FromControl>

                  </FormGroup>

                  <FormGroup controlId="formControlsTextarea">

                    <ControlLabel>Recipe Name</ControlLabel>
                    <FromControl 
                      type="textarea" 
                      value={newestRecipe.recipeName} 
                      placeholder="Enter Ingredients (Seperate By Commas)" 
                      onChange= {(event) => this.updateNewRecipe(newestRecipe.recipeName, event.target.value.split(","))} 
                      value = {newestRecipe.ingredients}
                    >
                    </FromControl>

                  </FormGroup>
                </Modal.Body>
                
                <Modal.Footer>
                  <Button onClick={(event) => this.saveNewRecipe()}>Save New Recipe</Button>
                </Modal.Footer>
              </Modal.Header>
          </Modal>  


        <Button bsStyle='primary' onClick={(event) => this.open("showAdd",currentIndex)}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;

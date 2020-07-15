import React, { Component } from 'react';
import './App.css';
//import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';
//import styled from 'styled-components';

// const StyledButton = styled.button`
//   background-color: ${props => props.alt ? 'red' : 'green'};
//   color: white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;
  
//   &:hover {
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//     color: black;
//   }
// `;



class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasd2', name: 'Manu', age: 29 },
      { id: 'wcas3', name: 'Stephanie', age: 26 } // provide id because it makes the system more efficiently and avoiding some errors in the future
    ],
    otherState: 'some other value',
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; //copy persons without making an action to the original
    persons.splice(personIndex,1);
    this.setState({persons:persons})
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p =>{
      //console.log(p.id);
      return p.id ===id;
    });
    //console.log('3');
    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({},this.state.persons[personIndex]);
    //this is an alternative way

    person.name = event.target.value;
    //console.log(person.name);
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    //console.log(persons[personIndex]);
    this.setState( {persons: persons} );
  };

  togglePersonsHandler = () => {
    //console.log('4');
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  
  render () {
    //เป็นแค่normal variable
    
    //console.log('Pass');
    let persons = null;
    if (this.state.showPersons){
      //console.log(this.state.showPersons);

      persons= (
        <div>
          {this.state.persons.map((person,index) => {
            return <Person 
              click   = {() => this.deletePersonHandler(index)}
              name    = {person.name}
              age     = {person.age}
              key     = {person.id}
              changed = {(event) => this.nameChangedHandler(event,person.id)} />//ใส่event แรกเพื่อส่งไปยังperson.js eventหลังใส่เพื่อส่งไปchangename
          })}
          
        </div>  
        
      );
      // style.backgroundColor='red';
      // style[':hover']={
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // };
    };

    const classes = [];
    if (this.state.persons.length <=2 ){
      classes.push('red'); //classes=['red']
    };
    if (this.state.persons.length <=1 ){
      classes.push('bold'); //classes=['red','bold']
    };


    return (
     
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ') }>This is really working!</p>
        <button
          className="button"
          onClick={this.togglePersonsHandler}
          >Toggle Name
        </button>
        {persons}
      </div>
     
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;

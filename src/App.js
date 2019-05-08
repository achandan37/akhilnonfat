import React, { Component } from 'react';
import './App.css';
import { Projects } from './Projects';

class App extends Component {  
  state = {
    projects:[]
  };
  // function to toggle interest and save to local storage so it persists
  addRemoveInterest = (project) =>{
      let newprojects = this.state.projects;
      let interested = project.interested ? false : true;
      newprojects[project.id].interested=interested;
      this.setState({projects:newprojects});
      localStorage.setItem('projects', JSON.stringify(this.state.projects));
  }

  // function for saving from json file to local storage

  jsonToStorage = () =>{
      let projects = require('./projects.json').projects;
        function compare(a,b){
          if(a.added < b.added) return 1;
          if(b.added < a.added) return -1;
          return 0;
        }
      projects.sort(compare);
      let keys = Object.keys(projects);
        keys.forEach(function(key){
            projects[key].interested=false;
            projects[key].id=key;
        });
      localStorage.setItem('projects', JSON.stringify(projects));
      this.setState({"projects":projects})
  }

  // checking for local storage on page load

  componentDidMount(){
    if(localStorage.getItem("projects")){
      this.setState({"projects":JSON.parse(localStorage.getItem("projects"))})
    }
    else{
      this.jsonToStorage()
    }
  }

  // rendering the app
  
  render(){
    return (
      <div className="App">
        <Projects projects={this.state.projects} interestfn={this.addRemoveInterest}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

// Displaying category buttons for all categories that have been input
class IndividualProject extends Component{
	// setting the boolean for interest for each individual project
	constructor(props) {
	    super(props);
	    this.state = {
	      interested: this.props.project.interested
	    };

	    this.handleInputChange = this.handleInputChange.bind(this);
	  }

	// changing properties when checkbox is changed and passing to app level to save the change to local storage
	handleInputChange(event) {
	    this.props.interestfn(this.props.project);
	    this.setState({interested: this.props.project.interested})
	}

	// changing from epoch timestamp to regular readable dates
	getRegularDate = (utcSeconds) => {
		let d = new Date(utcSeconds*1000);
		let hours=0;
		let ampm=" AM";
		let minutes = d.getMinutes();
		if (minutes===0)minutes = "00"
		if(d.getHours() > 12){
			ampm=" PM";
			hours=d.getHours()-12;
		}
		else if(d.getHours()===0){
			hours=12;
		}
		else{hours=d.getHours()}
		return(d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear() +" " + hours + ":" + minutes + ampm)
	}

	// rendering individual project divs 
	render(){
	return(
		<div className="individualprojects">
			<div className="projects__details">
				<h3 className="projectdisplay__projects--title">{this.props.project.title}</h3>
				<div className="projectdisplay__projects--type">Type: {this.props.project.type}</div>
				<div className="projectdisplay__projects--castingdirector">Casting Director: {this.props.project.castingDirector}</div>
			</div>
			<div className="projects__dateinfo">
				<div className="projectdisplay__projects--added">Added: {this.getRegularDate(this.props.project.added)}</div>
				<div className="projectdisplay__projects--startdate">Start Date: {this.getRegularDate(this.props.project.startDate)}</div>
				<strong>I&apos;m Interested: </strong><input
		            name="interested"
		            type="checkbox"
		            checked={this.state.interested}
		            onChange={this.handleInputChange}/>
			</div>
		</div>
		)}
}

class Project extends React.Component{
		// creating the individual projects from the project array and rendering them 
	render(){
		return (

			<div className='projectdisplay'>
				{this.props.projects.map((project,i) => {return(
						<IndividualProject key={i} project={project} interestfn={this.props.interestfn}/>
					)}
				)}
			</div>)
	}
}
	
export class Projects extends React.Component {
	render() {
		return( 
			<>
				<Project projects={this.props.projects} interestfn={this.props.interestfn}/>
			</>
		)
	}
}
import React, { Component } from 'react';
import styles from './styles';
import Progress, {Stage} from './components/Progress';
import Steps, {Step} from './components/Steps';


class Stepper extends Component {
	state = {
		stage: this.props.stage
		//current stage
	}
	static defaultProps = {
    stage: 1
	//step 
  }
	static Progress = Progress
	static Steps = Steps
	static Stage = Stage
	static Step = Step
	//handle click previous
	handlePreviousQuiz = () => {
		this.setState({ stage: this.state.stage - 1});
	}
	//handle click continue
	handleNextQuiz = () => {
		this.setState({ stage: this.state.stage + 1});
	}
	render() {
		const { stage } = this.state;
		const children = React.Children.map(this.props.children, child => {
			return React.cloneElement(child, {stage, handleNextQuiz: this.handleNextQuiz, handlePreviousQuiz: this.handlePreviousQuiz})
		})
		return (
			<div style={styles.container}>
				{children}
			</div>
		);
	}
}

export default Stepper;

import React, { Component } from "react";
import { Power2, TweenLite } from "gsap";
import {
  TransitionGroup,
  CSSTransition,
  Transition
} from "react-transition-group";
import styles from "../styles";
import Button from "./Button";


export const Step = ({ num, text }) => (
    <div key={num} style={styles.stageContent} >
      {text}
      <br/>
    </div>
    
);

const entering = node => {
  TweenLite.fromTo(
    node,
    1,
    {
      scaleX: 0.9,
      scaleY: 0.9,
      opacity: 0,
      cx: 500
    },
    {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      cx: 0,
      ease: Power2.easeOut
    }
  ).delay(0.4);
};

const exiting = node => {
  TweenLite.to(node, 0.6, {
    opacity: 0,
    onComplete: console.log("Pass")
  });
};

class Steps extends Component {
  render() {
    const { stage, handleNextQuiz, handlePreviousQuiz } = this.props;
    const count = React.Children.count(this.props.children);
    const children = React.Children.map(this.props.children, child => {
      return (
        stage === child.props.num && (
          <Transition
            appear={true}
            timeout={300}
            onEntering={entering}
            onExiting={exiting}
          >
            {child}
          </Transition>
        )
      );
    });
    return (
      <div style={styles.stagesContainer}>
        <div style={styles.stages} >
          <TransitionGroup>{children}</TransitionGroup>
        </div>
        <div style={styles.stageButton}>
        <Button disabled={ stage === 1 } click={handlePreviousQuiz}>
            Back
          </Button>
         <Button disabled={stage === count } click={handleNextQuiz}>
            Continue
          </Button>
        </div>
      </div>
    );
  }
}
export default Steps;

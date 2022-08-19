// TODO ESLINT OVERRIDES
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
/* eslint react/prop-types: 0 */
// import styles from './nav.less';
import styles from './nav.module.css'; // https://www.w3schools.com/react/react_css.asp 

const Nav = (props) => {
    if(!props.stepsLabel) {
        return
    }

    const dots = [];
    // for (let i = 1; i <= props.totalSteps; i += 1) {
    for (let i = 1; i <= Object.keys(props.stepsLabel).length; i += 1) {
        const isActive = props.currentStep === i;
        const isDone = props.currentStep > i;
        const isDisabled = props.currentStep < i;
        dots.push((
            // <span
            //     key={`step-${i}`}
            //     className={`${styles.dot} ${isActive ? styles.active : ''}`}
            //     onClick={() => props.goToStep(i)}
            // >&bull;</span>
            <li
                key={`step-${i}`}
                onClick={() => props.goToStep(i)}
                style={{ cursor: "pointer" }}>
                <a className={`${isDone ? 'done' : ''} ${isActive ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}>
                    <span className="step_no">{i}</span>
                    <span className="step_descr">
                        Step {i}<br />
                        <small>{props.stepsLabel[i]}</small>
                    </span>
                </a>
            </li>
        ));
    }

    return (
        // <div className={styles.nav}>{dots}</div>
        <ul className="wizard_steps">
            {dots}
        </ul>
    );
};

export default Nav;

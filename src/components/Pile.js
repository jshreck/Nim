import React from "react";
import './Pile.css';

const Pile = (props) => {

    let sticks= [];

    for (let i = props.numberSticks; i > 0; i--) {
        sticks.push(<span key={i}  className="stick"><img onClick={props.handleStickClick} data-pile={props.pile} alt="stick" src={require('../images/match.png')}/></span>);
    }
    return <h2>{sticks}</h2>;
}

export default Pile;
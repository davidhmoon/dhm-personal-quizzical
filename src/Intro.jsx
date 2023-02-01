import React from "react"
import ReactDOM from "react-dom"

export default function Intro (props) {
    
    return (
        <div>
            <h1 id="title"> Quizzical </h1>
            <h3 id="subTitle"> A trivia game! </h3>
            <div id="startButtonContainer">
                <button id="startButton" onClick = {()=>props.toggleStart()}> Start quiz </button>
            </div>
        </div>
        
        
        
    )
}
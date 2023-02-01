import React from "react"
import ReactDOM from "react-dom"


export default function Question (props) {
    const answersHolder = props.answers.map(element => 
        <div 
            className = "individualAnswer" 
            key={element.id}
            disabled = {props.thirdScreen} 
            onClick={()=>props.toggleSelect(element.id, props.id)} 
            style={{border: element.isSelected ? "none" : "0.794239px solid #4D5B9E",
            opacity: props.thirdScreen & element.isWrong ? .5 : 1,
            backgroundColor: element.isWrong ? "#F8BCBC" :  element.isRight ? "#94D7A2" : element.isSelected ? "#D6DBF5" : "#F5F7FB",
        }} >
            {element.answer}
        </div>
    ) 
    return (
        <div id = "big-container">
            <div id="question"> {props.question} </div>
            <div id = "answersContainer">{answersHolder} </div>
            <div id = "border-container">
                <div id = "border"></div>
            </div> 
        </div>
)
}
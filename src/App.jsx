import React from "react"
import ReactDOM from "react-dom"
import {nanoid} from "nanoid"
import Question from "./Question"
import Intro from "./Intro"

export default function App () {
    
const [quizData, setQuizData] = React.useState([])
const [gameScore, setGameScore] = React.useState(0)
const [toggleFetch, setToggleFetch] = React.useState(true)
const [secondScreen, setSecondScreen] = React.useState(false)
const [thirdScreen, setThirdScreen] = React.useState(false)
const questionAnswerBlock = quizData.map(object => {
        return <Question
            key={object.id}
            id={object.id}
            question={object.question}
            answers={object.answers}
            toggleSelect={toggleSelect}
            thirdScreen={thirdScreen}
        />
    })

React.useEffect(()=>{
       fetch("https://opentdb.com/api.php?amount=5&encode=url3986")
           .then(res => res.json())
           .then(data => {
               setQuizData(()=> {
                   return data.results.map(object => { //this returns the array to setQuizData
                       const correctAnswer = object.correct_answer
                       const sortedAnswers = [...object.incorrect_answers, object.correct_answer].sort()
                       const allAnswersWithProperties = sortedAnswers.map(answer => {
                           return {
                               id: nanoid(),
                               questionId: nanoid(),
                               answer: decodeURIComponent(answer),
                               correctAnswer: decodeURIComponent(correctAnswer),
                               isSelected: false,
                               isRight: false,
                               isWrong: false}                     })
                                  
                       return { //this returns the mapping over data.results
                           id: nanoid(),
                           question: window.decodeURIComponent(object.question),
                           answers: allAnswersWithProperties}   })
               })
           })
        
   }, [toggleFetch])


function toggleStart () {
    setSecondScreen(oldSecondScreen => !oldSecondScreen) 
    setToggleFetch(oldToggleFetch => !oldToggleFetch) //runs use effect
}


function toggleSelect (answerId, questionId) {
setQuizData(oldQuizData =>{
        const newQuizData = [...oldQuizData]
        for(let i = 0; i < newQuizData.length; i++){
                if (questionId === newQuizData[i].id){
                    for(let j = 0; j < newQuizData[i].answers.length; j++)
                    {if (answerId === newQuizData[i].answers[j].id){
                        newQuizData[i].answers[j] = {...newQuizData[i].answers[j], isSelected: !newQuizData[i].answers[j].isSelected}
                    }
                    else {
                        newQuizData[i].answers[j] = {...newQuizData[i].answers[j], isSelected: false }
                    }
                }
            }
        }
        return newQuizData
    }) 
}

function submitAnswers () {
  setQuizData(oldQuizData =>{
          let newQuizData = oldQuizData
          for(let i = 0; i < newQuizData.length; i++){
                  for(let j = 0; j < newQuizData[i].answers.length; j++)
                  {if (newQuizData[i].answers[j].isSelected && newQuizData[i].answers[j].answer === newQuizData[i].answers[j].correctAnswer){
                      newQuizData[i].answers[j] = {...newQuizData[i].answers[j], isRight: true}
                  }
              }
          }
          return newQuizData
      })
  setQuizData(oldQuizData =>{
          let newQuizData = oldQuizData          
          for(let i = 0; i < newQuizData.length; i++){
                  for(let j = 0; j < newQuizData[i].answers.length; j++)
                  {if (newQuizData[i].answers[j].isSelected && newQuizData[i].answers[j].answer != newQuizData[i].answers[j].correctAnswer){
                      newQuizData[i].answers[j] = {...newQuizData[i].answers[j], isWrong: true}
                  }
              }
          }
          return newQuizData
      })
      
  setGameScore(oldGameScore =>{
          let newGameScore = 0          
          for(let i = 0; i < quizData.length; i++){
                  for(let j = 0; j < quizData[i].answers.length; j++)
                  {if (quizData[i].answers[j].isRight){
                      newGameScore = newGameScore + 1
                  }
              }
          }
          return newGameScore
      })     
    setThirdScreen(thirdScreen => true)
}


function resetGame () {
    setThirdScreen(thirdScreen => false)
    setSecondScreen(false)
}

function toggleCheckAnswers() {if (secondScreen && !thirdScreen) {return <div id="submitAnswersWrapper"><button id="submitAnswers" onClick={()=>submitAnswers()}> Check answers </button></div>}}

return (
        <div>
            <div className="yellow-blob"></div>
            <div className="blue-blob"></div>
            {!secondScreen && <Intro toggleStart={toggleStart} />}
            {secondScreen && <div id="wrapper">{questionAnswerBlock}</div>}
            
            {toggleCheckAnswers()} 
            
            {thirdScreen &&
                <div id="playAgainContainer">
                    <div id="youScored">You Scored {gameScore}/5 correct answers</div>
                    <button id="playAgain" onClick = {() => resetGame()} >Play again</button>
                </div>
            }

        </div>
)


}

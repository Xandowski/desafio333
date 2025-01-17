import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

export default class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      game:{}
    }
  }
  connectToServer = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("playerId", data => {
      this.setState({playerNumber:data});
    });

    socket.on("playerConnect", data => {
      this.setState({anotherPlayerConnected:data});
    });

    socket.on("gameState", data => {
      this.setState({gameState:data});
    });

  }
  componentWillMount(){
    this.connectToServer()
    this.updateScenario()
  }

  updateScenario(){
    let scenarioDomElement = this.buildScenario()
    this.setState({
      scenarioDomElement:scenarioDomElement
    })
    setTimeout(()=>{this.updateScenario()},30)
  }

  buildScenario(){
    if (!this.state.gameState){
      return <div>Loading...</div>
    }
    let playerScenario = this.state.gameState.map
    return (
      <div>
        {
          playerScenario.map((yArray,yKey)=>{
            return (
              <div key={yKey}>
                {yArray.map((xValue,xKey)=>{
                  if(xValue === 1 || xValue === 2){
                    return (
                      <span key={xKey} style={{background: "red"}}>{xValue}</span>
                    )
                  }
                  return (
                    <span key={xKey} style={{background: "black"}}>{xValue}</span>
                  )
                })}
              </div>
            )
          })
        }
      </div>
    )
  }

  render(){
    if (this.state.gameState){
      if (this.state.gameState.gameOver){
        return <h1>Game over!</h1>
      }
    }
    return (
      <div>
        <div>You are Player {this.state.playerNumber}</div>
        <div>{this.state.anotherPlayerConnected ? `Player ${this.state.anotherPlayerConnected} connected` : ""}</div>
        <div>{this.state.gameState ? JSON.stringify(this.state.gameState.matrixPosition) : ''}</div>
        {this.state.scenarioDomElement}
        <div></div>
      </div>
    )
  }
}

import React, { Component, useEffect, useState } from "react";
import "./Layout.css";
import Card from "../Card/Card";
import KanbanDB from '../../DB/KanbanDB';
import CardForm from '../Card/CardForm/CardForm';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
    this.initializingCard = this.initializingCard.bind(this);
    this.onChangeStatusHandler = this.onChangeStatusHandler.bind(this);
    this.onDeleteCardHandler = this.onDeleteCardHandler.bind(this);
    this.onAddCardHandler = this.onAddCardHandler.bind(this);
  }

  componentDidMount() {
    this.initializingCard();
  }

  initializingCard() {
    let This = this;
    KanbanDB.connect().then(function ready(db, dbInstanceId) {
      // Add some 3 cards
      db.addCard({
        name: "My First Task1",
        description: "This is going to be my first task",
        status: "TODO",
      });

      db.addCard({
        name: "My First Task2",
        description: "This is going to be my first task",
        status: "DOING",
      });

      db.addCard({
        name: "My First Task3",
        description: "This is going to be my first task",
        status: "DONE",
      });

      // Get all cards
      db.getCards()
        .then((cards) => {
          This.setState({ cards: cards });
          console.log(cards);
        })
        .catch((err) => {
          console.error("error", err.message);
        });
    });
  }

  onDeleteCardHandler = (id) => {    
    let This = this;
    KanbanDB
    .connect()
    .then(function ready(db, dbInstanceId) {
      const existingCards = This.state.cards.filter(x=>x.id !== id);

      existingCards.forEach(element => {
        db.addCard(element);
      });
        // Get all cards
        db.getCards()
        .then((cards) => {
          This.setState({ cards: cards });
          console.log(cards);
        }).catch((err) => {
          console.error("error", err.message);
        });
    });


    // Provided Kanband api is not working..check console.. Id is not found. so writting my own custom logic
    // KanbanDB
    // .connect()
    // .then(function ready(db, dbInstanceId) {
    //   db.deleteCardById(id)
    //   .then(card => {
    //     debugger;
    //     console.log('deleted')
    //   })
    //   .catch(err => console.error('Delete '+ err.message));
    // });
  }

  onAddCardHandler = (data, event) => {
    event.preventDefault();
    let This = this;
    KanbanDB
    .connect()
    .then(function ready(db, dbInstanceId) {
      const newCard = {
        name: data.name,
        description: "New Task",
        status: data.status,
      };

      let cardsArray = [...This.state.cards, newCard];
      cardsArray.forEach(element => {
        db.addCard(element);
      });
        // Get all cards
        db.getCards()
        .then((cards) => {
          This.setState({ cards: cards });
          console.log(cards);
        }).catch((err) => {
          console.error("error", err.message);
        });
    });
  }


  onChangeStatusHandler = (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('id')
    const status = event.target.value;    
    const cardToUpdate = null;

    let This = this;
    KanbanDB
    .connect()
    .then(function ready(db, dbInstanceId) {
      const cardToUpdateIndx = This.state.cards.findIndex(x=> x.id === id);

      let cardsArray = [...This.state.cards];
      cardsArray[cardToUpdateIndx].status = status;

      cardsArray.forEach(element => {
        db.addCard(element);
      });
        // Get all cards
        db.getCards()
        .then((cards) => {
          This.setState({ cards: cards });
          console.log(cards);
        }).catch((err) => {
          console.error("error", err.message);
        });
    });


    // Provided Kanband api is not working..check console.. Id is not found. so writting my own custom logic
    // KanbanDB
    // .connect()
    // .then(function ready(db, dbInstanceId) {
    //   db.getCardById(id)
    //   .then(card => {
    //     debugger;
    //     cardToUpdate = card
    //     cardToUpdate.status = status;
    //     db.updateCard(id , cardToUpdate).then(uCard => {
    //       debugger;
    //     }).catch(err => console.log('Update' + err.message));
    //   })
    //   .catch(err => console.error('Update' + err.message));
    // });
  }


  render() {
    let inprogressCards = null;
    let toDoCards = null;
    let doneCards = null;

    toDoCards = this.state.cards.filter(x=> x.status === "TODO").length > 0 ? 
    this.state.cards.filter(x=> x.status === "TODO").map((card, index) => {
      return (
      <div key={index + 1} className="card" style={{ backgroundColor: "tomato" }}>
          <Card key={index + 1} id={card.id} name={card.name} status={card.status} onChangeStatusHandler={this.onChangeStatusHandler} onDeleteCardHandler={this.onDeleteCardHandler} />
      </div> 
      )
    }) : 'No Card Found..';

    inprogressCards = this.state.cards.filter(x=> x.status === "DOING").length > 0 ? 
    this.state.cards.filter(x=> x.status === "DOING").map((card, index) => {
      return (
        <div key={index + 1} className="card" style={{ backgroundColor: "#008080" }}>
         <Card key={index + 100} id={card.id} name={card.name} status={card.status} onChangeStatusHandler={this.onChangeStatusHandler} onDeleteCardHandler={this.onDeleteCardHandler}/>
       </div>
      )
    }) : 'No Card Found..';


    doneCards = this.state.cards.filter(x=> x.status === "DONE").length > 0 ?
     this.state.cards.filter(x=> x.status === "DONE").map((card, index) => {
      return (
        <div key={index + 1} className="card" style={{ backgroundColor: "#008000" }}>
         <Card  key={index + 1000} id={card.id} name={card.name} status={card.status}  onChangeStatusHandler={this.onChangeStatusHandler} onDeleteCardHandler={this.onDeleteCardHandler}/>
        </div>
      )
    }) : 'No Card Found..';

    return (
      <div className="wrapper">
        <header className="header">
          <p style={{marginLeft:'50%'}}>KANBAN DB APP</p>
        <CardForm onAddCardHandler={this.onAddCardHandler}/>
        </header>
        <section className="content">
          <div className="columns">
            <main className="main">
              <p style={{marginLeft:'50%'}}>TODO</p>
              <div className="flex-container">
               {toDoCards}
              </div>
            </main>
            <aside className="sidebar-first">
            <p style={{marginLeft:'50%'}}>InProgress</p>
              <div className="flex-container">
               {inprogressCards}
              </div>
            </aside>
            <aside className="sidebar-second">
            <p style={{marginLeft:'50%'}}>Done</p>
              <div className="flex-container">
              {doneCards}
              </div>
            </aside>
          </div>
        </section>
        <footer className="footer"><p style={{marginLeft:'50%'}}>Footer</p></footer>
      </div>
    );
  }
}
export default Layout;

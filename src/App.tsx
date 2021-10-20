import React, { useEffect, useState } from "react";
import "./App.css";
import { cards } from "./db";

interface ICard {
  uid: string;
  img: string;
  id: number;
}

const getRandomCards = () => {
  return cards.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [isAllOpen, setAllOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [openedCard, setOpenedCard] = useState<Array<ICard>>([]);
  const [findCarts, setFindCart] = useState<Array<ICard>>([]);

  const [isGameEnd, setGameEnd] = useState(false);

  const [randomCards, setRandomCards] = useState<Array<ICard>>([]);

  useEffect(() => {
    setRandomCards(getRandomCards());
  }, []);

  const checkSameCards = (cards: Array<ICard>) => {
    return cards[0].id === cards[1].id;
  };

  const restartGame = () => {
    setRandomCards(getRandomCards());
    setOpenedCard([]);
    setFindCart([]);
    setAllOpen(true);
    setTimeout(() => {
      setAllOpen(false);
      setDisabled(false);
    }, 5000);
  };

  const openCard = (card: ICard) => {
    const copy = [...openedCard];
    copy.push(card);
    setOpenedCard(copy);
    if (copy.length === 2) {
      setDisabled(true);
      setTimeout(() => {
        const newFindCart = [...findCarts, ...copy];
        if (checkSameCards(copy)) {
          setFindCart(newFindCart);
        }
        if (newFindCart.length === randomCards.length) {
          setGameEnd(true);
        }
        setOpenedCard([]);
        setDisabled(false);
      }, 500);
    }
  };

  const isCardOpen = (card: ICard) => {
    return (
      findCarts.find((item) => item === card) ||
      openedCard.find((item) => item === card)
    );
  };

  return (
    <div className="wrapper">
      <h1>Card Game</h1>
      <div className="cardboard-wrapper">
        <header className="cardboard-header">
          <button className="restart-btn" onClick={restartGame}>
            Restart
          </button>
        </header>
        <div className="cardboard">
          {randomCards.map((card) => {
            const isOpen = isCardOpen(card);
            return (
              <div
                className="card"
                key={card.uid}
                onClick={() => !isOpen && !disabled && openCard(card)}
              >
                {(isOpen || isAllOpen) && (
                  <img src={card.img} alt="card" width="60px" height="60px" />
                )}
              </div>
            );
          })}
          {isGameEnd && (
            <div className="end-game">
              <h2>You are WIN!!!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface Card {
  suit: string;
  rank: string;
}

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks = ["7", "8", "9", "10", "J", "Q", "K", "A"];

const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  return deck;
};

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const Poker = () => {
  const [deck, setDeck] = useState<Card[]>(generateDeck());
  const [computerHand, setComputerHand] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [victoryCondition, setVictoryCondition] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const pickCards = useCallback((): Card[] => {
    let tempDeck = [...deck];
    const hand: Card[] = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = getRandomInt(tempDeck.length);
      hand.push(tempDeck[randomIndex]);
      tempDeck.splice(randomIndex, 1);
    }
    hand.sort((a, b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank));
    setDeck(tempDeck);
    return hand;
  }, [deck]);

  const findHandValue = (arr: Card[]): { condition: string; value: number } => {
    const countMap: Record<string, number> = {};
    for (const card of arr) {
      countMap[card.rank] = (countMap[card.rank] || 0) + 1;
    }
    const counts = Object.values(countMap);

    if (counts.includes(4)) {
      return { condition: "Carré", value: 12 };
    } else if (counts.includes(3)) {
      return { condition: "Brelan", value: 11 };
    } else if (counts.filter((count) => count === 2).length === 2) {
      return { condition: "Double paire", value: 10 };
    } else if (counts.includes(2)) {
      return { condition: "Paire", value: 9 };
    } else {
      const highestCard = Math.max(
        ...arr.map((card) => ranks.indexOf(card.rank))
      );
      return {
        condition: `Carte la plus haute (${ranks[highestCard]})`,
        value: highestCard,
      };
    }
  };

  const determineWinner = useCallback(() => {
    const playerValue = findHandValue(playerHand);
    const computerValue = findHandValue(computerHand);

    if (playerValue.value > computerValue.value) {
      setResult("win");
      setVictoryCondition(playerValue.condition);
    } else if (playerValue.value < computerValue.value) {
      setResult("lose");
      setVictoryCondition(computerValue.condition);
    } else {
      setResult("draw");
      setVictoryCondition(null);
    }
  }, [playerHand, computerHand]);

  const handleGameStart = () => {
    setGameStarted(true);
    setPlayerHand([]);
    setComputerHand([]);
    setVictoryCondition(null);
    setResult(null);
    const timeoutDelay = 500;
    const playerCards = pickCards();
    const computerCards = pickCards();

    playerCards.forEach((card, index) => {
      setTimeout(() => {
        setPlayerHand((prevHand) => [...prevHand, card]);
      }, index * timeoutDelay);
    });

    computerCards.forEach((card, index) => {
      setTimeout(() => {
        setComputerHand((prevHand) => [...prevHand, card]);
      }, (index + playerCards.length) * timeoutDelay);
    });
  };

  useEffect(() => {
    if (gameStarted && playerHand.length === 4 && computerHand.length === 4) {
      determineWinner();
    }
  }, [gameStarted, playerHand, computerHand, determineWinner]);

  return (
    <div className="bg-green-600 min-h-screen flex items-center justify-center">
      <div className="flex flex-col p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Ordinateur:</h3>
          <div className="flex space-x-4">
            <AnimatePresence>
              {computerHand.map((card, index) => (
                <motion.div
                  key={index}
                  className="w-24 h-36 bg-white border border-gray-300 rounded-lg shadow-md flex flex-col justify-between items-center p-4"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-2xl font-bold">{card.rank}</div>
                  <div
                    className={`text-xl ${
                      card.suit === "Hearts" || card.suit === "Diamonds"
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  >
                    {card.suit}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Joueur:</h3>
          <div className="flex space-x-4">
            <AnimatePresence>
              {playerHand.map((card, index) => (
                <motion.div
                  key={index}
                  className="w-24 h-36 bg-white border border-gray-300 rounded-lg shadow-md flex flex-col justify-between items-center p-4"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-2xl font-bold">{card.rank}</div>
                  <div
                    className={`text-xl ${
                      card.suit === "Hearts" || card.suit === "Diamonds"
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  >
                    {card.suit}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        {result && (
          <div className="mb-6 text-lg font-bold">
            {result === "win" && (
              <p className="text-white">
                Vous avez gagné avec : {victoryCondition}
              </p>
            )}
            {result === "lose" && (
              <p className="text-white">
                Vous avez perdu contre : {victoryCondition}
              </p>
            )}
            {result === "draw" && <p className="text-white">Égalité.</p>}
          </div>
        )}
        <button
          onClick={handleGameStart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Démarrer
        </button>
      </div>
    </div>
  );
};

export default Poker;

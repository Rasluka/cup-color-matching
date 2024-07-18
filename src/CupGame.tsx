import React, { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { ICupData } from "./interfaces";
import { cupData } from "./CupData";
import { shuffleArray } from "./utils";

interface ICupGameProps {
  // shuffledData: ICupData[];
}

const CupGame: React.FC<ICupGameProps> = () => {
  const [cupsOrder, setCupsOrder] = useState<ICupData[]>(cupData);
  const [matchingCups, setMatchingCups] = useState<number>(0);
  const [shuffledCupData, setShuffledCupData] = useState<ICupData[]>([]);

  const checkUserOrder = () => {
    const matchingColors = shuffledCupData.filter(
      (cup, i) => cup.color === cupsOrder[i].color
    ).length;
    setMatchingCups(matchingColors);
  };

  useEffect(() => {
    setShuffledCupData(shuffleArray(cupData));
  }, []);

  return (
    <>
      <Reorder.Group
        values={cupsOrder}
        axis="x"
        onReorder={setCupsOrder}
        className="p-4 mb-4"
      >
        {cupsOrder.map((cup) => (
          <Reorder.Item value={cup} key={cup.color} className="inline-block">
            <div className="flex items-center justify-center rounded-lg w-24 h-24 p-2.5 cursor-grab rotate-180">
              <img
                src={cup.image}
                className="pointer-events-none"
                alt={`cup-${cup.color}-image`}
              />
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <p
        className={`font-extrabold text-2xl mb-4 ${
          matchingCups === cupData.length ? "text-green-500" : "text-red-500"
        }`}
      >
        {" "}
        {matchingCups}
      </p>

      <button
        onClick={checkUserOrder}
        className="bg-transparent py-2 px-4 border-2 rounded border-slate-300 text-slate-300 hover:border-slate-100 hover:text-slate-100 font-extrabold"
      >
        Submit
      </button>
    </>
  );
};

export default CupGame;

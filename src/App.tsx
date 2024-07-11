import { useEffect, useState } from "react";
import CupRed from "./assets/cup-red.png";
import CupBlue from "./assets/cup-blue.png";
import CupGreen from "./assets/cup-green.png";
import CupYellow from "./assets/cup-yellow.png";
import { Reorder } from "framer-motion";

interface ICupState {
  color: string;
  image: string;
}

const cupData: ICupState[] = [
  { color: "Red", image: CupRed },
  { color: "Blue", image: CupBlue },
  { color: "Green", image: CupGreen },
  { color: "Yellow", image: CupYellow },
];

export default function App() {
  const [shuffledCupData, setShuffledCupData] = useState<ICupState[]>([]);
  const [cupsOrder, setCupsOrder] = useState<ICupState[]>(cupData);
  const [matchingCups, setMatchingCups] = useState<number>(0);

  const shuffleArray = (array: ICupState[]) => {
    //Fisher–Yates shuffle algorithm
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const checkUserOrder = () => {
    console.log(
      "I will do something later, I should check this...",
      shuffledCupData
    );
  };

  useEffect(() => {
    setShuffledCupData(shuffleArray(cupData));
  }, []);

  useEffect(() => {
    console.log("Apparently this is changing", cupsOrder);
    const matchingColors = shuffledCupData.filter(
      (cup, i) => cup.color === cupsOrder[i].color
    ).length;
    setMatchingCups(matchingColors);
  }, [cupsOrder, shuffledCupData]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
    </div>
  );
}

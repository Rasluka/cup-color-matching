// import CupGame from "./CupGame";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { useState } from "react";
import { cupData } from "./CupData";

const cupNumbers = [3, 4, 5, 6];

export default function App() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(cupNumbers[0]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <CupGame /> */}
      <Dialog open={open} onClose={() => {}} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-red-400 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5">
                <div className="flex justify-center">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base text-center font-semibold leading-6 text-gray-900"
                    >
                      Select a difficulty
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select how many different colors you want to play with
                      </p>

                      <RadioGroup
                        value={selected}
                        onChange={setSelected}
                        aria-label="Server size"
                      >
                        {cupNumbers.map((aNumber) => (
                          <Field
                            key={aNumber}
                            className="flex items-center gap-2"
                          >
                            <Radio
                              value={aNumber}
                              className="group flex size-5 items-center justify-center border-cyan-300 rounded-full border bg-white data-[checked]:bg-blue-400"
                            >
                              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                            </Radio>
                            <Label className="flex">
                              {cupData.slice(0, aNumber).map((aCup) => (
                                <div className="flex items-center justify-center rounded-lg w-12 h-12 p-2 cursor-grab rotate-180">
                                  <img
                                    src={aCup.image}
                                    className="pointer-events-none"
                                    alt={`cup-${aCup.color}-image`}
                                  />
                                </div>
                              ))}
                            </Label>
                          </Field>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Play
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

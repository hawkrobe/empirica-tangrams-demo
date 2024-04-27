import { Chat, useGame } from "@empirica/core/player/classic/react";

import React from "react";
import { Profile } from "./Profile";
import { Task } from "./Task";

// const roundSound = new Audio("experiment/round-sound.mp3");
// const gameSound = new Audio("experiment/bell.mp3");

export function Game() {
  const game = useGame();

  // Make some noise
  // if (game.get("justStarted")) {
  //   gameSound.play();
  //   game.set("justStarted", false);
  // } else {
  //   roundSound.play();
  // }

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full flex flex-col">
        <Profile />
        <div className="h-full flex items-center justify-center">
          <Task />
        </div>
      </div>

      <div className="h-full w-128 border-l flex justify-center items-center">
        <Chat scope={game} attribute="chat" />
      </div>
    </div>
  );
}

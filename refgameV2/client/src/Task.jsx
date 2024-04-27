import {
  useGame,
  usePlayer,
  usePlayers,
  useRound,
  useStage
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { Tangram } from "./components/Tangram.jsx";

export function Task() {
  const game = useGame();
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const stage = useStage();
  const target = round.get("target")
  const tangramURLs = player.get('tangramURLs');
  const correct = player.get('clicked') == target;
  let tangramsToRender;
  if (tangramURLs) {
    tangramsToRender = tangramURLs.map((tangram, i) => (
      <Tangram
        key={tangram}
        tangram={tangram}
        tangram_num={i}
        round={round}
        stage={stage}
        game={game}
        player={player}
        players={players}
        target={target}
      />
    ));
  }
  let feedback = (
    player.get('clicked') == '' ? '' :
      correct ? "Correct! You earned 3 points!" :
      "Ooops, that wasn't the target! You earned no bonus this round."
  )
  return (
    <div className="task">
      <div className="board">
        <div className="header" style={{display:'flex'}}>
          <h1 className="roleIndicator" style={{'float': 'left', 'marginLeft': '50px'}}> You are the {player.get('role')}.</h1>
          <h3 className="feedbackIndicator" style={{'float': 'left', 'marginLeft': '50px', 'marginTop': 'auto', 'marginBottom': 'auto'}}><>{feedback}</></h3>
        </div>
        <div className="all-tangrams">
          <div className="tangrams grid">
            {tangramsToRender}
          </div>
        </div>
      </div>
    </div>
  );
}

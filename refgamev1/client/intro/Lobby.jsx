import React from "react";
import { Alert, Intent, NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Centered, shared } from "meteor/empirica:core";

export default class Lobby extends React.Component {
    componentWillMount() {}
    state = {
        remainingTime : (1000 * 60 * 5),
        earlyExit : false
    }

  render() {
    const { gameLobby, treatment, player } = this.props;
    const total = treatment.factor("playerCount").value;
    const exisiting = gameLobby.playerIds.length;
    const timeElapsed = Date.now() - player.readyAt;
    const showExtensionAlert = timeElapsed > this.state.remainingTime;

    console.log(gameLobby)

    if (exisiting >= total) {
      return (
          <div className="core">
          <div className="game-lobby">
            <NonIdealState
              icon={IconNames.PLAY}
              title="Game loading..."
              description="Your game will be starting shortly, get ready!"
            />
          </div>
        </div>
      );
    } else if (this.state.earlyExit) {
      // player.set('exited', true)
      player.online = false
      player.exit("Thanks for waiting, and sorry that there weren't enough other players for your game to begin in a timely fashion!")
    } else {
      return (
       <div className="core">
        <div className="game-lobby">
          <NonIdealState
            icon={IconNames.TIME}
            title="Lobby"
            description={
              <>
                <p>Please wait for the game to be ready...</p>
                <p>
                  {exisiting} / {total} players ready.
                </p>
                  <p> If it takes longer than {(this.state.remainingTime / 1000/ 60).toFixed(0)} minutes to have enough players, you will have the option to leave with compensation. </p>
                  <p> You've been waiting {(timeElapsed / 1000 / 60).toFixed(2)} minutes.</p>
              </>
            }
          />
        </div>
        <Alert
          intent={Intent.PRIMARY}
          isOpen={showExtensionAlert}
          confirmButtonText="Wait Longer"
          cancelButtonText="Exit Now"
          onConfirm={() => {this.state.remainingTime += (1000 * 60 * 5)}}
          onCancel={() => {this.state.earlyExit = true}}
        >
          <p>
            Sorry you have been waiting for a while. Do you wish to wait longer
            or exit now?
          </p>
        </Alert>
      </div>
    );
    }
  }
}//     render() {
//         const { player, gameLobby } = this.props;
//         return (
//         <header className="lobby">
//             <h1>Please wait until the game is ready...</h1>
//             <p>
//                 There are {gameLobby.readyCount} players ready out of{" "}
//                 {gameLobby.treatment.playerCount} expected total.
//             </p>
//         </header>
//     )
//   }
// }

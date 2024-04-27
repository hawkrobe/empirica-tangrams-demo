import React from "react";

import {Centered} from "meteor/empirica:core";

export default class Sorry extends React.Component {
  static stepName = "Sorry";

  render() {    
    const { player, game, hasNext, onSubmit } = this.props;
    let msg;
    switch (player.exitStatus) {
      case "gameFull":
        msg = "All games you are eligible for have filled up too fast...";
        break;
      case "gameLobbyTimedOut":
        msg = "There were NOT enough players for the game to start..";
        break;
      // case "playerLobbyTimedOut":
      //   msg = "???";
      //   break;
      case "playerEndedLobbyWait":
        msg =
          "You decided to stop waiting, we are sorry it was too long a wait.";
        break;
      default:
        msg = "Unfortunately the Game was cancelled...";
      break;
    }

    if(player.exitReason) 
      msg = player.exitReason
    return (
      <Centered>
        <div className="score">
          <h1>Sorry!</h1>
          <p>{msg}</p>
          {/*<p>Sorry, you were not able to play today! {msg}</p>*/}
          {/*{player.exitStatus !== "gameFull" ? (*/}
          {/*<p>*/}
          {/*Please return the HIT now so our platform does register your MTurk.*/}
          {/*Please come back for one of the next batches of Part 1. We will submit new*/}
          {/*batches on Monday the 6th of August and Tuesday the 7th of August*/}
          {/*(batches of 100 games every hour starting at 2PM ET until 5PM).*/}
          {/*</p>*/}

          <p>
            Please submit <em>3B021164</em> as the survey code in
            order to receive the base pay for your time today.
          </p>
          
          {/*) : (*/}
          {/*<p>*/}
          {/*Please click on: <strong>Reset current session</strong> from the*/}
          {/*top right side of the page (if it appears for you) to see if there*/}
          {/*are other games that you could join now. Note you will need to go*/}
          {/*over the instructions and quiz again (they might be different for*/}
          {/*different games). Otherwise, Please return the HIT now so our*/}
          {/*platform does not register your MTurk ID as someone who already*/}
          {/*participated.*/}
          {/*</p>*/}

          <p>
            {hasNext ? (
              <button
                className="pt-button pt-intent-primary"
                type="button"
                onClick={() => onSubmit()}
              >
                Done
              </button>
            ) : (
              ""
            )}
          </p>
        </div>
      </Centered>
    );
  }
}

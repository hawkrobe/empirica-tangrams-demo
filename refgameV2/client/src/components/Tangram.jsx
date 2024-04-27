import { useStageTimer } from "@empirica/core/player/classic/react";
import React from "react";
import _ from "lodash";
import { useGame } from "@empirica/core/player/classic/react";

export function Tangram(props){
  const handleClick = e => {
    console.log('click2')
    const { tangram, tangram_num, stage, player, players, round } = props;
    const partnerID = player.get('partner');
    const partner = players.filter((p) => p.id == partnerID)[0];
    const speakerMsgs = _.filter(game.get("chat"), msg => {
      return msg.sender.id == player.get('partner') && partner.get("role") == 'speaker'
    })
    // only register click for listener and only after the speaker has sent a message
    if (stage.get("name") == 'selection' &
        speakerMsgs.length > 0 &
        player.get('clicked') === false &
        player.get('role') == 'listener') {
      player.set("clicked", tangram)
      partner.set("clicked", tangram)
      setTimeout(() => player.stage.set("submit", true), 3000);
      setTimeout(() => partner.stage.set("submit", true), 3000);
    }
  };
  
  const { tangram, round, tangram_num, player, game, target, ...rest } = props;
  const row = 1 + Math.floor(tangram_num / 4)
  const column = 1 + tangram_num % 4
  const mystyle = {
    "background" : "url(" + tangram + ")",
    "backgroundSize": "cover",
    "width" : "25vh",
    "height" : "25vh",
    "gridRow": row,
    "gridColumn": column
  };

  // Highlight target object for speaker at selection stage
  // Show it to both players at feedback stage if 'showNegativeFeedback' enabled.
  if(tangram == target) {
    if(player.get('role') == 'speaker' ||
       (game.get('showNegativeFeedback') && player.get('clicked') != '')) {
      _.extend(mystyle, {
        "outline" : "10px solid #000",
        "zIndex" : "9"
      })
    }
    if(player.get('role') == 'speaker' &&
       !game.get('showNegativeFeedback') &&
       player.get('clicked') != '') {
      _.extend(mystyle, {
        "outline" : "10px solid red",
        "zIndex" : "9"
      })
    }
  }

  // Highlight clicked object in green if correct;
  // If 'showNegativeFeedback' enabled, also show red if incorrect
  if(tangram == player.get('clicked')) {
    const color = (
      tangram == target ? '10px solid green' : (
        player.get('role') == 'listener' || game.get('showNegativeFeedback')
      ) ? '10px solid red' : 'none'
    );
    _.extend(mystyle, {
      "outline" :  color,
      "zIndex" : "9"
    })
  }

  return (
    <div
      onClick={handleClick}
      style={mystyle}
    >
    </div>
  );
}

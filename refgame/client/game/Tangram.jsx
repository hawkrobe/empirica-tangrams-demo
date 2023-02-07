import React from "react";

export default class Tangram extends React.Component {
  handleClick = e => {
    const { game, tangram, tangram_num, stage, player, round } = this.props;
    const speakerMsgs = _.filter(round.get("chat"), msg => {
      return msg.role == 'speaker' & msg.playerId == player.get('partner')
    })
    const partner = _.find(game.players, p => p._id === player.get('partner'));
    
    // only register click for listener and only after the speaker has sent a message
    if (stage.name == 'selection' &
        speakerMsgs.length > 0 &
        player.get('clicked') === false &
        player.get('role') == 'listener') {
      partner.set("clicked", tangram)
      player.set("clicked", tangram)
      Meteor.setTimeout(() => player.stage.submit(), 3000);
      Meteor.setTimeout(() => partner.stage.submit(), 3000);
    }
  };
  
  render() {
    const { tangram, tangram_num, round, stage, player, game, target, ...rest } = this.props;
    const room = player.get('roomId')
    const contextSize = game.get('contextSize')

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
    // Show it to both players at feedback stage.
    if((target == tangram & player.get('role') == 'speaker') ||
       (target == tangram & player.get('clicked') != '')) {
      _.extend(mystyle, {
        "outline" :  "10px solid #000",
        "zIndex" : "9"
      })
    }

    // Highlight clicked object in green if correct; red if incorrect
    if(tangram == player.get('clicked')) {
      const color = tangram == target ? 'green' : 'red';
      _.extend(mystyle, {
        "outline" :  `10px solid ${color}`,
        "zIndex" : "9"
      })
    }
    
    return (
      <div
        onClick={this.handleClick}
        style={mystyle}
        >
      </div>
    );
  }
}

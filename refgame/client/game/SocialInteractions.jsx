import React from "react";
import EventLog from "./EventLog";
import ChatLog from "./ChatLog";
import Timer from "./Timer";

export default class SocialInteractions extends React.Component {
  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image"></span>
        <img src={player.get("avatar")} />
        <span className="name" style={{ color: player.get("nameColor") }}>
          {player.get("name")}
          {self ? " (You)" : " (Partner)"}
        </span>
      </div>
    );
  }

  render() {
    const { game, round, stage, player } = this.props;

    const partnerId = player.get('partner')
    const partner = _.filter(game.players, p => p._id === partnerId)[0];
    const messages = round.get("chat")
          .filter(({playerId}) => playerId === partnerId || playerId === player._id)
          .map(({ text, playerId }) => ({
            text,
            subject: game.players.find(p => p._id === playerId)
          }));
    const events = stage.get("log").map(({ subjectId, ...rest }) => ({
      subject: subjectId && game.players.find(p => p._id === subjectId),
      ...rest
    }));

    return (
      <div className="social-interactions">
        <div className="status">
          <div className="players bp3-card">
            {this.renderPlayer(player, true)}
            {this.renderPlayer(partner)}
          </div>

          <Timer stage={stage} />
          
          <div className="total-score bp3-card">
            <h5 className='bp3-heading'>Score</h5>

            <h2 className='bp3-heading'>${(player.get("bonus") || 0).toFixed(2)}</h2>
          </div>
        </div>
        <ChatLog messages={messages} round={round} stage={stage} player={player} />
        <EventLog events={events} game={game} stage={stage} player={player} />
      </div>
    );
  }
}

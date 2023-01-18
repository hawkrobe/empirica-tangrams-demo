import React from "react";
import moment from "moment/moment";
import Author from "./Author";

export default class EventLog extends React.Component {
  componentDidMount() {
    this.eventsEl.scrollTop = this.eventsEl.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events.length < this.props.events.length) {
      this.eventsEl.scrollTop = this.eventsEl.scrollHeight;
    }
  }

  render() {
    const { game, events, player } = this.props;

    //if the one who made the event is the player himself then self will be true
    return (
      <div className="eventlog bp3-card">
        <div className="events" ref={el => (this.eventsEl = el)}>
          {events.map((event, i) => (
            <Event
              key={i}
              game={game}
              event={event}
              player={player}
              self={event.subject ? player._id === event.subject._id : null}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Event extends React.Component {
  render() {
    const {
      subject,
      roundId,
      verb,
      object,
      target,
      state,
      at,
    } = this.props.event;
    console.log(this.props)
    const { self, game, player } = this.props;
    const partnerId = player.get('partner')
    const partner = _.filter(game.players, p => p._id === partnerId)[0];

    let content;
    switch (verb) {
    case "selectionStarted":
      content = (
        <>
          <div className="content">
            {player.get('role') == 'speaker' ?
             'Please describe the object in the black box so your partner can \
              correctly pick it out.' :
             'Click the object your partner is describing! Feel free to respond \
              or ask questions if necessary.'}
          </div>
          <br/>
          <br/>
        </>
      )
      break;

      case "feedbackStarted":
        content = (
          <div className="content">This is the feedback!
          </div>
        );
        break;
      default:
        console.error(`Unknown Event: ${verb}`);

        return null;
    }

    return (
      <div className="event">
        {/*
          Not sure we even need to show am/pm. I think we need seconds since the
          interactions are quick but to save space we can probably skip am/pm
          for the sake of space. We could maybe also just but the seconds since
          start of round or remaining second before end of round, might be more
          relevant. Might or might not be clear.
        */}
        {/* <div className="timestamp">{moment(at).format("hh:mm:ss a")}</div> */}
        <div className="timestamp">{moment(at).format("hh:mm:ss")}</div>
        {content}
      </div>
    );
  }
}

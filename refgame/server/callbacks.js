import Empirica from "meteor/empirica:core";
import {names, avatarNames, nameColors} from './constants.js';
import _ from "lodash";

// //// Avatar stuff //////

// onGameStart is triggered opnce per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart((game) => {
  const players = game.players;
  console.debug("game ", game._id, " started");

  const teamColor = game.treatment.teamColor;
  const schedule = game.get('schedule');
  const roleList = game.get('roleList');
  const targets = game.get('context');

  players.forEach((player, i) => {
    player.set("tangramURLs", _.shuffle(targets));
    player.set("partnerList", schedule[player._id]);
    player.set("roleList", roleList[player._id]);
    player.set("name", names[i]);
    player.set("avatar", `/avatars/jdenticon/${avatarNames[teamColor][i]}`);
    player.set("avatarName", avatarNames[teamColor][i]);
    player.set("nameColor", nameColors[teamColor][i]);
    player.set("bonus", 0);
  });
});

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {
  const players = game.players;
  const rooms = game.get('rooms')[round.index];
  round.set("chat", []);

  players.forEach(player => {
    const roomId = _.findIndex(rooms, room => _.includes(room, player._id));
    player.set('roomId', 'room' + roomId);
    player.set('partner', player.get('partnerList')[round.index]),
    player.set('role', player.get('roleList')[round.index])
    player.set('clicked', false);
  });
});

// onRoundStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {
  const players = game.players;
  console.debug("Round ", stage.name, "game", game._id, " started");
  stage.set("log", [
    {
      verb: stage.name + "Started",
      roundId: stage.name,
      at: new Date(),
    },
  ]);
});

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {});

// onRoundEnd is triggered after each round.
Empirica.onRoundEnd((game, round) => {
  const players = game.players;
  const rooms = game.get('rooms');
  const target = round.get('target');

  // Update player scores
  players.forEach(player => {
    const roomId = player.get('roomId');
    const selectedAnswer = player.get("clicked");
    const currScore = player.get("bonus") || 0;
    const correctAnswer = target[roomId];
    const scoreIncrement = selectedAnswer == correctAnswer ? 0.03 : 0;
    player.set("bonus", scoreIncrement + currScore);
  });

  // Save outcomes as property of round for later export/analysis
  rooms[round.index].forEach((room, roomId) => {
    const player1 = game.players.find(p => p._id == room[0]);
    const correctAnswer = target['room' + roomId];
    round.set('room' + roomId + 'response', player1.get('clicked'));
    round.set('room' + roomId + 'correct', correctAnswer == player1.get('clicked'));
  });
});

// onRoundEnd is triggered when the game ends.
// It receives the same options as onGameStart.
Empirica.onGameEnd((game) => {
  console.debug("The game", game._id, "has ended");
});

// ===========================================================================
// => onSet, onAppend and onChanged ==========================================
// ===========================================================================

// onSet, onAppend and onChanged are called on every single update made by all
// players in each game, so they can rapidly become quite expensive and have
// the potential to slow down the app. Use wisely.
//
// It is very useful to be able to react to each update a user makes. Try
// nontheless to limit the amount of computations and database saves (.set)
// done in these callbacks. You can also try to limit the amount of calls to
// set() and append() you make (avoid calling them on a continuous drag of a
// slider for example) and inside these callbacks use the `key` argument at the
// very beginning of the callback to filter out which keys your need to run
// logic against.
//
// If you are not using these callbacks, comment them out so the system does
// not call them for nothing.

// // onSet is called when the experiment code call the .set() method
// // on games, rounds, stages, players, playerRounds or playerStages.
Empirica.onSet(
  (
    game,
    round,
    stage,
    player, // Player who made the change
    target, // Object on which the change was made (eg. player.set() => player)
    targetType, // Type of object on which the change was made (eg. player.set() => "player")
    key, // Key of changed value (e.g. player.set("score", 1) => "score")
    value, // New value
    prevValue // Previous value
  ) => {
    // Compute score after player clicks
    if (key === "clicked") {
    }
  }
);

// // onSet is called when the experiment code call the `.append()` method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onAppend((
//   game,
//   round,
//   stage,
//   players,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue // Previous value
// ) => {
//   // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
//   //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
// });

// // onChange is called when the experiment code call the `.set()` or the
// // `.append()` method on games, rounds, stages, players, playerRounds or
// // playerStages.
// Empirica.onChange((
//   game,
//   round,
//   stage,
//   players,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue, // Previous value
//   isAppend // True if the change was an append, false if it was a set
// ) => {
//   // `onChange` is useful to run server-side logic for any user interaction.
//   // Note the extra isAppend boolean that will allow to differenciate sets and
//   // appends.
// });

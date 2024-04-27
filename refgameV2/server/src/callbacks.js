import _ from "lodash";
import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

const targetSets = [
    "/tangram_A.png",
    "/tangram_B.png",
    "/tangram_C.png",
    "/tangram_D.png",
    "/tangram_E.png",
    "/tangram_F.png",
    "/tangram_G.png",
    "/tangram_H.png",
    "/tangram_I.png",
    "/tangram_J.png",
    "/tangram_K.png",
    "/tangram_L.png"
  ]

const names = [
  "Repi",
  "Minu",
  "Laju",
  "Hera",
]; // for the players names to match avatar color

// Blue avatar names and color codes:
const avatarNames = [
    "Aria",
    "Katherine",
    "Kayla",
    "Oliver",
]

const nameColors = [
  "#29828D", // Aria
    "#444EA1", // Katherine
    "#57AEC6", // Kayla
    "#5792C8" // Oliver
]


Empirica.onGameStart(({ game }) => {
  // Set treatment variables for client-side access
  const treatment = game.get("treatment");
  game.set("showNegativeFeedback", treatment.showNegativeFeedback);
  game.set("contextSize", treatment.contextSize);
  game.set('context', _.sampleSize(targetSets, treatment.contextSize))

  // initialize players
  game.players.forEach((player, i) => {
    const otherPlayer = game.players.filter((p) => p.id != player.id);
    player.set("tangramURLs", _.shuffle(game.get('context')));
    player.set("avatar", `/avatars/jdenticon/${i}`);
    player.set("avatarName", avatarNames[i]);
    player.set("nameColor", nameColors[i]);
    player.set("partner", otherPlayer[0].id)
    player.set("role", i == 0 ? 'speaker' : 'listener')
    player.set("bonus", 0);
  });

  const targets = game.get('context')
  const reps = treatment.numRepetitionsWithPartner;
  const numTargets = targets.length;
  const numPartners = game.players.length - 1;
  const info = {
    numTrialsPerBlock : numTargets,
    numRepsPerPartner : reps,
    numTrialsPerPartner: reps * numTargets
  };

  // use this to play the sound on the UI when the game starts
  game.set("justStarted", true);

  // Loop through repetition blocks
  _.times(reps, repNum => {
    const block = _.shuffle(targets)

    // Loop through targets in block
    _.times(numTargets, targetNum => {
      const round = game.addRound();
      const target = block[targetNum]
      round.set('target', target)
      round.set('numTrials', reps * numTargets);
      round.set('trialNum', repNum * numTargets + targetNum);
      round.set('repNum', repNum);
      round.addStage({
        name: "selection",
        duration: treatment.selectionDuration
      });
    });
  });
});

Empirica.onRoundStart(({ round }) => {
  const players = round.currentGame.players;
  //round.currentGame.set("chat", []);

  players.forEach((player, i) => {
    player.set('clicked', false);
  });
});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {});

Empirica.onRoundEnded(({ round }) => {
  const players = round.currentGame.players;
  const target = round.get('target');

  // Update player scores
  players.forEach(player => {
    const selectedAnswer = player.get("clicked");
    const currScore = player.get("bonus") || 0;
    const correctAnswer = target
    const scoreIncrement = selectedAnswer == correctAnswer ? 0.03 : 0;
    player.set("bonus", scoreIncrement + currScore);
  });

  // Save outcomes as property of round for later export/analysis
  const player1 = players[0]
  round.set('response', player1.get('clicked'));
  round.set('correct', target == player1.get('clicked'));
});

Empirica.onGameEnded(({ game }) => {});


import GameModel from './../models/GameModel';
import * as gameView from './../views/gameView';

const state = {};

export const controllerGame = () => {
    // Prepare UI
    gameView.clearPlayArea();

    const currentGame = new GameModel();
    currentGame.generateChallenge();

    state.game = currentGame

    gameView.renderGameRows(currentGame.rows);
};

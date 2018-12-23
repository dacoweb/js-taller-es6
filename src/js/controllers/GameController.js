import GameModel from './../models/GameModel';
import * as gameView from './../views/gameView';

const state = {};

export default class ControllerGame {
    constructor() {
        this.startGame();
        this.renderBoxes();
        this.loadEventsBoxHanlders();
        this.loadEventsActionsHandlers();
    }

    startGame() {
        // Prepare UI
        gameView.clearPlayArea();

        // Generate Challenge
        const currentGame = new GameModel();
        currentGame.generateChallenge();

        state.game = currentGame
        state.solved_boxes = [];
    }

    renderBoxes() {
        // Render Rows
        gameView.renderGameRows(state.game.rows);
    }

    loadEventsBoxHanlders() {
        // Handle box click event
        gameView.boxes().forEach(box => {
            box.addEventListener('click', e => {        
                if (e.target.matches('.box, .box *')) {
                    const box = e.target.closest('.box');
                    const current_box = this.getBoxData(box);
                    this.addSelectedBoxData(current_box);
                    this.renderCurrentBox(current_box);
                    this.checkForSolvedSeletedBoxes();
                }
            });
        });
    }

    loadEventsActionsHandlers() {
        // Handle action buttons btnActions
        gameView.btnActions().forEach(btn => {
            btn.addEventListener('click', e => {
                if (e.target.matches('#btn-restart')) {
                    this.restartGame();
                }
            });
        });
    }

    restartGame() {
        this.startGame();
        this.renderBoxes();
        this.loadEventsBoxHanlders();
    }

    resetNotSolvedBoxes(selected_boxes) {
        selected_boxes.forEach(bx => {
            if (!state.solved_boxes.some(el => el.value === bx.value)) {
                setTimeout(() => gameView.resetBoxItemContent(bx.rowBoxIdx, bx.colBoxIdx), 500)
            }
        });
    };
    
    getBoxData(boxElement) {
        let row_idx = boxElement.dataset.rowBox;
        let item_idx = boxElement.dataset.itemBox;
        let item_value = state.game.getItemValueFrom(row_idx, item_idx); 
        return {
            box: boxElement, 
            rowBoxIdx: row_idx,
            colBoxIdx: item_idx,
            value: item_value
        };
    };
    
    addSelectedBoxData(bx) {
        if (!state.selected_boxes){
            state.selected_boxes = [];
        }
        if (!state.selected_boxes.some(el => el.rowBoxIdx === bx.rowBoxIdx && el.colBoxIdx === bx.colBoxIdx && el.value === bx.value)) {
            state.selected_boxes.push(bx);
        }
    };
    
    checkForSolvedSeletedBoxes() {
        if (state.selected_boxes && state.selected_boxes.length >= 2){
            // check & compare boxes        
            const all_values = state.selected_boxes.map(bx => bx.value);
            if (all_values.every(v => v === all_values[0])){
                // all elements values match
                state.selected_boxes.forEach(bx => state.solved_boxes.push(bx));
            }
    
            this.resetNotSolvedBoxes(state.selected_boxes);
            // clear/reset selected boxes
            state.selected_boxes = [];
        } // else no pair to compare yet...
    };
    
    renderCurrentBox(current_box) {
        if (state.selected_boxes && state.selected_boxes.length > 0 && state.selected_boxes.length <= 2){
            // Render value
            gameView.renderBoxItem(current_box.rowBoxIdx, current_box.colBoxIdx, current_box.value);
        }
    };
};

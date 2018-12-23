import { domEl } from './domMapping';

const prepareBoxItem = (row_idx, item_idx) => `
<div class="col-sm">
    <div class="box" data-row-box="${row_idx}" data-item-box="${item_idx}">
        <div class="box-content"> ? </div>
    </div>
</div>
`;

const prepareRow = (row, row_idx) => `<div class="row">
    ${row.items.map((el, item_idx) => prepareBoxItem(row_idx, item_idx)).join(' ')}  
</div><br>`;

export const renderGameRows = (gameRows) => {    
    gameRows.forEach((row, idx) => {
        const markup = prepareRow(row, idx);
        domEl.playArea.insertAdjacentHTML('beforeend', markup);
    });    
};

export const clearPlayArea = () => {
    domEl.playArea.innerHTML = '';
};

export const renderBoxItem = (row_idx, item_idx, item_value) => {
    let box = domEl.playArea.querySelector(`.box[data-row-box="${row_idx}"][data-item-box="${item_idx}"]`);
    if (box) {
        box.querySelector(".box-content").innerHTML = item_value;
    }
}

export const resetBoxItemContent = (row_idx, item_idx) => {
    let box = domEl.playArea.querySelector(`.box[data-row-box="${row_idx}"][data-item-box="${item_idx}"]`);
    if (box) {
        box.querySelector(".box-content").innerHTML = '?';
    }
};

export const boxes = () => Array.from(domEl.playArea.querySelectorAll(".box"));
export const btnActions = () => Array.from(domEl.btnActions.querySelectorAll(".btn-actions"));
import { domEl } from './domMapping';

const prepareBoxItem = item_value => `
<div class="col-sm">
    <div class="box">
        <div class="box-content">${item_value}</div>
    </div>
</div>
`;

const prepareRow = row => `<div class="row">
    ${row.items.map(el => prepareBoxItem(el)).join(' ')}  
</div><br>`;

export const renderGameRows = (gameRows) => {    
    gameRows.forEach(row => {
        const markup = prepareRow(row);
        domEl.playArea.insertAdjacentHTML('beforeend', markup);
    });    
};

export const clearPlayArea = () => {
    domEl.playArea.innerHTML = '';
};
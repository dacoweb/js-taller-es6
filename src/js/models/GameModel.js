export default class GameModel {
    constructor(numRows = 4, numBoxItems = 5, numMatchs = 2) {
        this.numRows = numRows;
        this.numBoxItems = numBoxItems;
        this.numMatchs = numMatchs;
        this.rows = []
        this.last_item_value = null;
    }

    getLimitOfLetters() {
        return (this.numRows * this.numBoxItems) / this.numMatchs;
    }

    getRandomLetters() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const limit = this.getLimitOfLetters();
        let letters_choosen = [];
        let final_letters = [];        

        // Random unique letters        
        while (letters_choosen.length < limit) {
            let choosen_char = letters.charAt(Math.floor(Math.random() * letters.length));
            if (!letters_choosen.includes(choosen_char)) {
                letters_choosen.push(choosen_char);
            }         
        }

        // Creating amount of matchs        
        for (let i = 0; i < this.numMatchs; i++) {
            final_letters = letters_choosen.concat(letters_choosen);            
        }

        return final_letters;
    }

    generateChallenge() {
        let challenge_letters = this.getRandomLetters();

        // Generating items of each rows or a letter for each box.
        for (let i = 0; i < this.numRows; i++) {
            const items = [];
            for (let j = 0; j < this.numBoxItems; j++) {
                let posChar = Math.floor(Math.random() * challenge_letters.length);                
                items.push(challenge_letters[posChar]);
                challenge_letters.splice(posChar, 1);
            }
            
            this.rows.push({items: items});
        }        
    }

    getItemValueFrom(row_idx, item_idx) {
        return this.rows[row_idx].items[item_idx];
    }
}
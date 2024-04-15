//PART ONE//

let validURL = 'http://numbersapi.com';

//1
let favNumber = 5;
async function numFact() {
    let num1Promise = $.getJSON(`${validURL}/${favNumber}?json`);
    let num1 = await num1Promise;
    console.log(num1);
}

numFact();

//2
let favNumbers = [1,2,3];
let favNumFacts = [];
async function numsFacts() {
    for (num in favNumbers) {
        let numPromise = $.getJSON(`${validURL}/${favNumbers[num]}?json`);
        favNumFacts.push(await numPromise);
    }
    console.log(favNumFacts);
}

numsFacts();

//3
const ul = document.querySelector('.num-list');

function getNum() {
    return prompt('Pick a number:');
}

async function fourNumFacts(){
    let fourNumPromises = await Promise.all([
        $.getJSON(`${validURL}/${getNum()}?json`),
        $.getJSON(`${validURL}/${getNum()}?json`),
        $.getJSON(`${validURL}/${getNum()}?json`),
        $.getJSON(`${validURL}/${getNum()}?json`)
    ])
        console.log(fourNumPromises[0]);
        console.log(fourNumPromises[1]);
        console.log(fourNumPromises[2]);
        console.log(fourNumPromises[3]);
        fourNumPromises.forEach(num => {
            console.log(num.text)
            const li = document.createElement('li');
            li.innerText = num.text;
            ul.appendChild(li);
        });   
}

fourNumFacts();



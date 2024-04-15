//PART TWO//
const newDeckURL = 'https://deckofcardsapi.com/api/deck/new'
const shuffleCardsURL = 'https://deckofcardsapi.com/api/deck';
const drawCardURL = 'https://deckofcardsapi.com/api/deck';
const $drawCard = $('#draw-card');
const $shuffleDeck = $('#shuffle-deck');
const $imgContainer = $('.image-container');
let deckID;

$shuffleDeck.hide();

getRanNum = function() {
    return Math.floor(Math.random()*91)
}

async function newDeck(){
    let newDeck = await $.getJSON(`${newDeckURL}?json`);
    console.log(`New Deck ID: ${newDeck.deck_id}`);
    shuffleDeck(newDeck.deck_id);
    deckID = newDeck.deck_id;
}

async function shuffleDeck(deckID){
    await $.getJSON(`${shuffleCardsURL}/${deckID}/shuffle?json`);
    }

newDeck();

$drawCard.on('click', async () => {
    let draw = await $.getJSON(`${drawCardURL}/${deckID}/draw/?count=1&json`);
    console.log(`${draw.cards[0].value} of ${draw.cards[0].suit}`);
    const $img = $('<img>');
    $img.attr('src', draw.cards[0].image);
    $img.css('position', 'relative').css('transform', `rotate(${getRanNum()-45}deg)`);
    $imgContainer.append($img);
    $img.prev().css('position', 'absolute');
    console.log(`Remaining cards: ${draw.remaining}`);
    if (draw.remaining === 0) {
        $drawCard.hide();
        $shuffleDeck.show();
    }
})

$shuffleDeck.on('click', () => {
    shuffleDeck(deckID);
    $('img').remove();
    $drawCard.show();
    $shuffleDeck.hide();
})
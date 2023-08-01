const overlayStart = document.querySelector('#overlay');
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
var missed = 0; //keeps track of # times player guesses wrong
const startButtonLink = document.querySelector('.btn__reset'); //gets the button, later will add event listener
const phrases = ['Spain', 'Italy', 'Greece', 'France', 'Poland', 'Great Britain'];
var ul = document.querySelector('#phrase ul');
var liListLetters =''; //list of li's of individual letters added to ul
var missed = 0;
var tallyShow = 0;

document.addEventListener('DOMContentLoaded', ()=>{

    function resetAllGameSettings(){
        //must wipe out all previus settings and start over when starting new game
        ul.innerHTML = ''; //wipes out previous letter display
        tallyShow = 0;
        missed = 0;
        var imageHeartCollection = document.querySelectorAll('ol .tries')
        for(var i =0; i< imageHeartCollection.length; i++){
            imageHeartCollection[i].innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">'
        }
        //now here reset the keyboard so all keys are now available for use again
        const keyBoardKeys = document.querySelectorAll('.keyrow button');
        for(const element of keyBoardKeys){
            element.classList ='';
            element.disabled = false;
        }
    }
    startButtonLink.addEventListener('click',(event) =>{
        if(startButtonLink.textContent == 'Start Game'){
            resetAllGameSettings(); //reset all changes made during user interactions
            overlayStart.style.display = 'none';
            const randomPhrase = getRandomPhraseAsArray(phrases);
            addPhraseToDisplay(randomPhrase);

        }
    });

    function getRandomPhraseAsArray(arrayParam){
        var randomIndex = Math.random();
        randomIndex = randomIndex * (arrayParam.length);
        randomIndex = Math.floor(randomIndex);

        const randomPhrase = arrayParam[randomIndex];
        // console.log(randomPhrase);
        const newCharacterArray = [];
        for(var i = 0; i < randomPhrase.length; i++){
            console.log(randomPhrase[i]);
            newCharacterArray.push(randomPhrase[i]);
        }
        return newCharacterArray;
    }

    function addPhraseToDisplay(arrayParam){
        for(var i =0; i< arrayParam.length; i++){
            //create new li for each character of array
            const newLi = document.createElement('li');
            newLi.textContent = arrayParam[i];
            if(arrayParam[i] == ' '){
                //do nothing (if there is not letter in that space)
                newLi.classList.add('letter');
                newLi.textContent = 'S';
                newLi.style = 'color:transparent';
                newLi.classList.add('show');
                tallyShow = tallyShow +1; 
            }
            else{
                newLi.classList.add('letter');
            }
            ul.appendChild(newLi);
        }
    }
    function checkLetter(chosenKey){
        liListLetters = ul.querySelectorAll('li');
        var letterFound =null;
        for(var i = 0; i< liListLetters.length;i++){
            if(chosenKey.textContent.toUpperCase() === liListLetters[i].textContent.toUpperCase()){
                liListLetters[i].classList.add('show');
                letterFound = liListLetters[i];
                tallyShow = tallyShow + 1;
            }
        }
        if(letterFound == null){return null;}
        return letterFound;
    }
    qwerty.addEventListener('click',(event)=>{
        const chosenKeyButton = event.target; //this will be a button
        if(chosenKeyButton.tagName === 'BUTTON'){
            console.log('MADE IT INSIDE');
            chosenKeyButton.classList.add('chosen');
            chosenKeyButton.disabled = true;
            const guessedLiKey = checkLetter(chosenKeyButton); //will return null if key is a wrong guess
            if(guessedLiKey == null){//now, if they missed, take "away" a heart
                var imageHeartCollection = document.querySelectorAll('ol .tries')
                imageHeartCollection[missed].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">'
                missed = missed + 1;
            }
            checkWin();
        }
    });

    function checkWin(){
        liListLetters = ul.querySelectorAll('li');
        if(tallyShow >= liListLetters.length){
            // console.log("GAME WIN GAME WIN GAME WIN")
            tallyShow=0;
            overlayStart.className ='';
            overlayStart.classList.add('win');
            overlayStart.style.display ='inline';
            //now, at ths point we have to reset all the code to allow for a new game
            
        }
        if(missed >= 5){
            missed = 0;
            overlayStart.className ='';
            overlayStart.classList.add('lose');
            overlayStart.style.display ='inline';
            //now, at ths point we have to reset all the code to allow for a new game
        }

    }

});
// const randomPhrase = getRandomPhraseAsArray(phrases);
// addPhraseToDisplay(randomPhrase);


//TASKS TO COMPLETE, ADDITIONS, FIXES, and CHANGES...
    //Fix problem with tally not catching repeat letters (ex. Greece has 3 E's, but tally only tallies for 1 e)
    //Reset number of Hearts when restarting game
    //have to RE ENABLE THE KEYS after disabling them for a new game
    //hheart takeaways do not work anymor
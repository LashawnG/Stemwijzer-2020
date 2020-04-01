var counter = 0;
var answers = [];
var startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backArrow');
const content = document.getElementById('content');
const intro = document.getElementById('intro');
const title = document.getElementById('title');
const statement = document.getElementById('statement');
const statements = document.getElementById('statements');
const container = document.getElementById('container');
const weighted = document.getElementById('weighted');
const select = document.getElementById('select');
const resultBtn = document.getElementById('resultBtn');
const results = document.getElementById('results');
const all = document.getElementById('all');
const big = document.getElementById('big');
const small = document.getElementById('small');



//Load the first  question
function start() {
    startBtn.style.display = 'none';
    backBtn.style.display = 'block';
    content.style.display = 'none';
    intro.style.display = 'none';
    statements.style.display = 'block';
    container.style.height = '670px';
    title.innerHTML = counter+1+ ". " + subjects[counter].title;
    statement.innerHTML = subjects[counter].statement;
}

//Function to load previous page
function back() {

    //Remove answer from array when going back to previous page
    answers.pop();

    //Load starting page
        if (counter < 1) {
            container.style.height = '450px';
            startBtn.style.display = 'block';
            content.style.display = 'block';
            intro.style.display = 'block';
            statements.style.display = 'none';

    //Load previous question
        } else if (counter >= 1) {
            counter--;
            title.innerHTML = counter+1+ ". " + subjects[counter].title;
            statement.innerHTML = subjects[counter].statement;
         }
}

//Function to load next page
function next(answer) {

    //Load party selection screen
    if (counter === (subjects.length-1)) {
        saveAnswer(answer);
        statements.style.display = 'none';
        container.style.height = '200px';
        select.style.display = 'block';

        //Load next statement
    } else if (counter < (subjects.length-1)) {
        saveAnswer(answer);
        counter++;
        title.innerHTML = counter+1+ ". " + subjects[counter].title;
        statement.innerHTML = subjects[counter].statement;
    }

    //Deselect checkbox after every question
    if (weighted.checked) {
        weighted.checked = false;
    }
}

//Function for saving the answers
function saveAnswer(position) {

    //Save empty string if question is skipped
    if (position === '') {
        answers.push({
            'position': position,
            'weighted': ''
        });

    //Save answer and weighing
    } else {
        answers.push({
            'position': position,
            'weighted': weighted.checked
        });
    }
}

//Making sure you can only select 1 checkbox
function option(selected) {
    if (selected === 'all') {
        big.checked = false;
        small.checked = false;
        resultBtn.style.display = 'block';


    } else if (selected === 'big') {
        all.checked = false;
        small.checked = false;
        resultBtn.style.display = 'block';

    } else if (selected === 'small') {
        big.checked = false;
        all.checked = false;
        resultBtn.style.display = 'block';
        console.log(answers);
    }
}

//Function for displaying the results
function getResult() {

    //Load result page
        select.style.display = 'none';
        document.getElementById('result').style.display = 'block';
        results.style.display = 'block';

    //Give all parties the attribute 'score' for keeping score
    for (let i = 0; i < parties.length; i++) {
        parties[i]['score'] = 0;
    }

    //Compare your answers based on the selected party type
    if (document.getElementById('all').checked) {
        compare('party.size >= 0');
    } else if(document.getElementById('big').checked) {
        compare('party.size > 20');
    } else if (document.getElementById('small').checked) {
        compare('party.secular');
    }

    //Show top 3 results on screen
    results.innerHTML =
        parties[0].name + ' score: ' + parties[0].score + '<br>'
        + parties[1].name + ' score: ' + parties[1].score + '<br>'
        + parties[2].name + ' score: ' + parties[2].score;
}

//Compare your answers to the selected type of parties
function compare(a) {
    for (let r = 0; r < answers.length; r++) {

        //Loop through all the answers of the parties
        for (let partieCount = 0; partieCount < subjects[r].parties.length; partieCount++) {

            //Compare your answers with the answers of all the parties
            if (answers[r].position === subjects[r].parties[partieCount].position) {
                let partieName = subjects[r].parties[partieCount].name;

                //Find matching party name
                for (let partieNr = 0; partieNr < parties.length; partieNr++) {
                    let party = parties[partieNr];
                    if (partieName === party.name) {


                        //Adding score to the matching parties
                        if (a && !answers[r].weighted) {
                            party.score++;
                        }
                        if (a && answers[r].weighted) {
                            party.score += 2;
                        }
                    }
                }
            }
        }
    }
    sortScores();
}

//Sort parties from highest to lowest based on score
function sortScores() {
    parties.sort(function (a, b) {
        return b.score - a.score;
    });
}















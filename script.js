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

//De eerst vraag laden
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

// Terug gaan naar de vorige pagina
function back() {

    //Antwoord uit array halen
    answers.pop();

    //Terug naar home
        if (counter < 1) {
            container.style.height = '450px';
            startBtn.style.display = 'block';
            content.style.display = 'block';
            intro.style.display = 'block';
            statements.style.display = 'none';

    //Terug naar vorige vraag
        } else if (counter >= 1) {
            counter--;
            title.innerHTML = counter+1+ ". " + subjects[counter].title;
            statement.innerHTML = subjects[counter].statement;
         }
}


//Doorgaan naar de volgende pagina
function next(answer) {
    if (counter === 29) {
        saveAnswer(answer);

        //Partij pagina inladen
        statements.style.display = 'none';
        container.style.height = '200px';
        select.style.display = 'block';

    } else if (counter < 29) {
        saveAnswer(answer);
        counter++;
        title.innerHTML = counter+1+ ". " + subjects[counter].title;
        statement.innerHTML = subjects[counter].statement;
    }
    if (weighted.checked) {
        weighted.checked = false;
    }
}

//Antwoord opslaan in array
function saveAnswer(position) {

    //Niks opslaan als de vraag word overgeslagen
    if (position === '') {
        answers.push({
            'position': position,
            'weighted': ''
        });

    //Antwoord en weging opslaan
    } else {
        answers.push({
            'position': position,
            'weighted': weighted.checked
        });
    }
}

//Zorgen dat er maar 1 selectie tegelijk gemaakt kan worden
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

function getResult() {

    //Result pagina weergeven
        select.style.display = 'none';
        document.getElementById('result').style.display = 'block';
        results.style.display = 'block';

    //Geeft alle partijen een score waarmee een match kan worden berekend
    for (let i = 0; i < parties.length; i++) {
        parties[i]['score'] = 0;
    }

    //Alle partijen
    if (document.getElementById('all').checked) {

        //Door alle antwoorden heen lopen
        for (let r = 0; r < answers.length; r++) {

            //Door alle antwoorden van de partijen heen loopen
            for (let partieCount = 0; partieCount < subjects[r].parties.length; partieCount++) {

                //Jouw antwoorden vergelijken met die van de partijen
                if (answers[r].position === subjects[r].parties[partieCount].position) {
                    let partieName = subjects[r].parties[partieCount].name;

                    for (let partieNr = 0; partieNr < parties.length; partieNr++) {
                        let party = parties[partieNr];

                        //Matchende partij zoeken in de parties array en de score updaten
                        if (partieName === party.name) {

                            if (!answers[r].weighted) {
                                party.score ++;
                            }
                            else if (answers[r].weighted){
                                party.score += 2;
                            }
                        }
                    }
                }
            }
        }
        sortScores();




        //Alleen grote partijen
    } else if (document.getElementById('big').checked){

        // Door al jouw antwoorden heen lopen
        for (let r = 0; r < answers.length; r++) {

            //Door alle antwoorden van de partijen heen loopen
            for (let partieCount = 0; partieCount < subjects[r].parties.length; partieCount++) {

                    //Jouw antwoorden vergelijken met die van de partijen
                    if (answers[r].position === subjects[r].parties[partieCount].position) {
                       let partieName = subjects[r].parties[partieCount].name;

                        for (let partieNr = 0; partieNr < parties.length; partieNr++) {
                            let party = parties[partieNr];
                            if (partieName === party.name) {

                                    if (party.size > 20 && !answers[r].weighted) {
                                        party.score ++;
                                    }
                                    if (party.size > 20 && answers[r].weighted){
                                        party.score += 2;
                                    }
                            }
                        }
                    }
            }
        }
        sortScores();

        //Alleen seculiere partijen
    } else if (document.getElementById('small').checked){

        //Door al jouw antwoorden heen lopen
        for (let r = 0; r < answers.length; r++) {

            //Door alle antwoorden van de partijen heen loopen
            for (let partieCount = 0; partieCount < subjects[r].parties.length; partieCount++) {


                //Jouw antwoorden vergelijken met die van de partijen
                if (answers[r].position === subjects[r].parties[partieCount].position) {
                    var partieName = subjects[r].parties[partieCount].name;

                    for (var partieNr = 0; partieNr < parties.length; partieNr++) {
                        var party = parties[partieNr];
                        if (partieName === party.name) {
                            if (party.secular && !answers[r].weighted) {
                                    party.score ++;
                            }
                            if (party.secular && answers[r].weighted){
                                party.score += 2;
                            }
                        }
                    }
                }
            }
        }
        sortScores();
    }

    //Partijen sorteren op scores van hoog naar laag
    function sortScores() {
        parties.sort(function (a, b) {
            return b.score - a.score;
        });
    }

    //Top 3 resultaten tonen op het scherm
    results.innerHTML =
        parties[0].name + ' score: ' + parties[0].score + '<br>'
        + parties[1].name + ' score: ' + parties[1].score + '<br>'
        + parties[2].name + ' score: ' + parties[2].score;
}














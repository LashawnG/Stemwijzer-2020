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
// const partijen = document.getElementById('partijen');
// const details = document.getElementById('details');


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
    // console.log(answers[0].position);
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
        document.getElementById('big').checked = false;
        document.getElementById('small').checked = false;
        resultBtn.style.display = 'block';

        //Door alle antwoorden van de partijen heenlopen per vraag
        for (var b = 0; b < subjects.length; b++){
            for (let i = 0; i < subjects[0].parties.length; i++) {

            }

        }

    } else if (selected === 'big') {
        document.getElementById('all').checked = false;
        document.getElementById('small').checked = false;
        resultBtn.style.display = 'block';

    } else if (selected === 'small') {
        document.getElementById('big').checked = false;
        document.getElementById('all').checked = false;
        resultBtn.style.display = 'block';
        console.log(answers);
    }
}

function selectParties() {
    //Geeft alle partijen een score waarmee een match kan worden berekend
    for (let i = 0; i < parties.length; i++) {
        parties[i]['score'] = 0;
    }

    //Alle partijen
    if (document.getElementById('all').checked) {
        console.log("all");
        //Door alle antwoorden heen lopen
        for (let r = 0; r < answers.length; r++) {

            //Door alle antwoorden van de partijen heen loopen
            for (let partieCount = 0; partieCount < subjects[r].parties.length; partieCount++) {

                //Jouw antwoorden vergelijken met die van de partijen
                if (answers[r].position === subjects[r].parties[partieCount].position) {
                    let partieName = subjects[r].parties[partieCount].name;

                    for (let partieNr = 0; partieNr < parties.length; partieNr++) {
                        let party = parties[partieNr];
                        if (partieName === party.name) {

                            if ( !answers[r].weighted) {
                                party.score ++;
                            }
                            if ( answers[r].weighted){
                                party.score += 2;
                            }
                        }
                    }

                    //Checken of antwoord zwaarder moet meewegen
                    if (!answers[r].weighted) {
                        parties[partieCount].score ++;
                    } else if (answers[r].weighted){
                        parties[partieCount].score += 2;
                    }
                }
            }
        }
        sortScores();




        //Alleen grote partijen
    } else if (document.getElementById('big').checked){
        console.log("big");
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

                                    if (!party.secular && !answers[r].weighted) {
                                        party.score ++;
                                    }
                                    if (!party.secular && answers[r].weighted){
                                        party.score += 2;
                                    }
                            }
                        }
                    }
            }
        }
        sortScores();
        //Alleen kleine partijen
    } else if (document.getElementById('small').checked){
        console.log("secular");
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
    function sortScores() {
        parties.sort(function (a, b) {
            return b.score - a.score;
        });
    }

    console.log(parties);
}







// function openDetails() {
//     partijen.style.display = 'none';
//     details.style.display = 'block';
// }

// function closeDetails() {
//     partijen.style.display = 'block';
//     details.style.display = 'none';
// }














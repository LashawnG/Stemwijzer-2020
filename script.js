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
        console.log(answers);
}


//Doorgaan naar de volgende pagina
function next(answer) {
    if (counter === 29) {
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
        document.getElementById('big').checked = false;
        document.getElementById('small').checked = false;
        resultBtn.style.display = 'block';

    } else if (selected === 'big') {
        document.getElementById('all').checked = false;
        document.getElementById('small').checked = false;
        resultBtn.style.display = 'block';

    } else if (selected === 'small') {
        document.getElementById('big').checked = false;
        document.getElementById('all').checked = false;
        resultBtn.style.display = 'block';
    }
}

function showResult(selection) {
    if (document.getElementById('all').checked) {
        for (let i = 0; i < parties.length; i++) {
            console.log(parties[i].name);
        }
    } else if (document.getElementById('big').checked){
        for (let i = 0; i < parties.length; i++) {
            if (parties[i].secular) {
                console.log(parties[i].name);
            }
        }

    } else if (document.getElementById('small').checked){
        for (let i = 0; i < parties.length; i++) {
            if (!parties[i].secular) {
                console.log(parties[i].name);
            }
        }
    }
    // for (var i = 0; i < parties.length; i++) {
    //     parties[i]['preference'] = 0;
    //    // console.log(parties[i].name + '  ' + parties[i].secular);
    //        }
}



// function openDetails() {
//     partijen.style.display = 'none';
//     details.style.display = 'block';
// }

// function closeDetails() {
//     partijen.style.display = 'block';
//     details.style.display = 'none';
// }














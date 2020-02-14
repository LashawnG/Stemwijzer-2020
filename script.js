var counter = 0;
var startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backArrow');
const content = document.getElementById('content');
const intro = document.getElementById('intro');
const title = document.getElementById('title');
const statement = document.getElementById('statement');
const statements = document.getElementById('statements');
const container = document.getElementById('container');


function start() {
    startBtn.style.display = 'none';
    backBtn.style.display = 'block';
    content.style.display = 'none';
    intro.style.display = 'none';
    statements.style.display = 'block';
    container.style.height = '670px';
    title.innerHTML = counter+1+ ". " + subjects[counter].title;
    statement.innerHTML = subjects[counter].statement;
    console.log(counter);
}

function back() {
        if (counter < 1) {
            container.style.height = '450px';
            startBtn.style.display = 'block';
            content.style.display = 'block';
            intro.style.display = 'block';
            statements.style.display = 'none';
        } else if (counter >= 1) {
            counter--;
            title.innerHTML = counter+1+ ". " + subjects[counter].title;
            statement.innerHTML = subjects[counter].statement;
         }
}

function next() {
    if (counter === 29) {
        container.style.height = '450px';
        startBtn.style.display = 'block';
        content.style.display = 'block';
        intro.style.display = 'block';
        statements.style.display = 'none';
        counter = 0;
    } else {
        counter++;
        title.innerHTML = counter+1+ ". " + subjects[counter].title;
        statement.innerHTML = subjects[counter].statement;
        console.log(counter);
    }
}

function openDetails() {

}

function closeDetails() {
    //
}








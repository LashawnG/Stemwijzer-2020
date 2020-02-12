function start() {
    var startBtn = document.getElementById('startBtn');
    var backBtn = document.getElementById('backArrow');
    var content = document.getElementById('content');
    var intro = document.getElementById('intro');
    var title = document.getElementById('title');
    var statement = document.getElementById('statement');
    var statements = document.getElementById('statements');
    var container = document.getElementById('container');
    var counter = 0;

    startBtn.style.display = 'none';
    backBtn.style.display = 'block';
    content.style.display = 'none';
    intro.style.display = 'none';
    statements.style.display = 'block';
    container.style.height = '670px';
    title.innerHTML = counter+1+ ". " + subjects[counter].title;
    statement.innerHTML = subjects[counter].statement;
}

function back(page) {
    if (page == "home") {
        container.style.height = '450px';
        startBtn.style.display = 'block';
        content.style.display = 'block';
        intro.style.display = 'block';
        statements.style.display = 'none';
    }



}








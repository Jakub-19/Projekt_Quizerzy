var questions;
var questionLevel = 1;

window.addEventListener('load', function () {
    $.ajax({
        url: "scripts/getQuestions.php",
        type: "GET",
        async: false,
        success: function (result) {
            console.log("Questions downloaded from server");
            questions = result;
        },
        error: function (error) {
            console.log("Error");
            console.log(error);
        }
    })

    $("#answerA").on('click', answer);
    $("#answerB").on('click', answer);
    $("#answerC").on('click', answer);
    $("#answerD").on('click', answer);
    $("#fiftyFifty").one('click', fiftyFifty);
    $("#phoneFriend").one('click', phoneFriend);
    $("#askAudience").one('click', askAudience);
    $("#giveUp").click(giveUp);
    $("#hostText>p").html("Witaj w grze Quizerzy. Przed Tobą 1 z 12 pytań:");
    askQuestion(questions[0]);
}, true);

function answer() {
    var question = questions[questionLevel - 1];
    switch ($(this).text().substring(0, 1)) {
        case 'A':
            if (!question.A.IsCorrect) {
                defeat();
                return;
            }
            break;
        case 'B':
            if (!question.B.IsCorrect) {
                defeat();
                return;
            }
            break;
        case 'C':
            if (!question.C.IsCorrect) {
                defeat();
                return;
            }
            break;
        case 'D':
            if (!question.D.IsCorrect) {
                defeat();
                return;
            }
            break;
    }

    if (questionLevel < 12) {
        nextQuestion();
    }
    else {
        win();
    }
}

function askQuestion(question) {
    $("#questionNumber").html("Pytanie " + questionLevel);
    $("#question").html(question.Content);
    $("#answerA").html("A: " + question.A.Content);
    $("#answerB").html("B: " + question.B.Content);
    $("#answerC").html("C: " + question.C.Content);
    $("#answerD").html("D: " + question.D.Content);
}

function nextQuestion() {
    clearLifelines();
    $("#A" + questionLevel).addClass("answered");
    questionLevel++;
    $("#hostText>p").html("Dobra odpowiedź. Oto kolejne pytanie:");
    askQuestion(questions[questionLevel - 1]);
}

function defeat() {
    var message = "Udzieliłeś nieprawidłowej odpowiedzi. ";

    if (questionLevel > 7)
        saveResult(message + "Wygrywasz 40 000 zł.", 7);
    else if (questionLevel > 2)
        saveResult(message + "Wygrywasz 1000 zł.", 2);
    else
        saveResult(message + "Odchodzisz z pustymi rękoma.", 0);
}

function win() {

    saveResult("Gratulacje, udzieliłeś 12 poprawnych odpowiedzi. Wygrywasz główną nagrodę - 1 000 000 zł.", 12);
}

function giveUp() {
    var message = "Rezygnujesz z gry. Twoja nagroda za udzielenie " + (questionLevel - 1) + " poprawnych odpowiedzi to ";

    switch (questionLevel - 1) {
        case 0:
            message += "0 zł";
            break;
        case 1:
            message += "500 zł";
            break;
        case 2:
            message += "1000 zł";
            break;
        case 3:
            message += "2000 zł";
            break;
        case 4:
            message += "5000 zł";
            break;
        case 5:
            message += "10 000 zł";
            break;
        case 6:
            message += "20 000 zł";
            break;
        case 7:
            message += "40 000 zł";
            break;
        case 8:
            message += "75 000 zł";
            break;
        case 9:
            message += "125 000 zł";
            break;
        case 10:
            message += "250 000 zł";
            break;
        case 11:
            message += "500 000 zł";
            break;
    }

    saveResult(message + ".", questionLevel - 1);
}

function saveResult(message, level) {
    $("#answerA").prop("disabled", true);
    $("#answerB").prop("disabled", true);
    $("#answerC").prop("disabled", true);
    $("#answerD").prop("disabled", true);
    $("#askAudience").prop("disabled", true);
    $("#fiftyFifty").prop("disabled", true);
    $("#phoneFriend").prop("disabled", true);
    $("#giveUp").prop("disabled", true);

    message += "<br> Możesz zapisać swój wynik:"
    $("#hostText>p").html(message);

    const $form = $('<form action="scripts/saveResult.php" method="post"><label for="nick">Imię: </label><input id="endGameNick" type="text" name="nick" autocomplete="off"><input type="hidden" name="result" value="' + level + '"><input type="submit" value="Zapisz"></form>');
    $("#hostText").append($form);
}

function fiftyFifty() {
    $(this).prop("disabled", true);
    console.log('50/50');

    var q = questions[questionLevel - 1];
    var answers;
    if (q.A.IsCorrect) {
        answers = ['B', 'C', 'D'];
    }
    else if (q.B.IsCorrect) {
        answers = ['A', 'C', 'D'];
    }
    else if (q.C.IsCorrect) {
        answers = ['B', 'A', 'D'];
    }
    else if (q.D.IsCorrect) {
        answers = ['B', 'C', 'A'];
    }

    var i = Math.round(Math.random() * 2);
    answers.splice(i, 1);

    $("#answer" + answers[0]).prop("disabled", true);
    $("#answer" + answers[1]).prop("disabled", true);

    $("#hostText>p").html("Oto możliwości po odrzuceniu dwóch niepoprawnych odpowiedzi:");
}

class Friend {
    constructor(name) {
        this.name = name;
        this.knowledge = {
            "Matematyka": Math.round(Math.random() * 13) + 1,
            "Fizyka": Math.round(Math.random() * 13) + 1,
            "Historia": Math.round(Math.random() * 13) + 1,
            "Rolnictwo": Math.round(Math.random() * 13) + 1,
            "Biologia": Math.round(Math.random() * 13) + 1,
            "Religia": Math.round(Math.random() * 13) + 1,
            "Geografia": Math.round(Math.random() * 13) + 1,
            "Sport": Math.round(Math.random() * 13) + 1,
            "Literatura": Math.round(Math.random() * 13) + 1,
            "Sztuka": Math.round(Math.random() * 13) + 1,
            "Ekonomia": Math.round(Math.random() * 13) + 1,
            "Gry": Math.round(Math.random() * 13) + 1,
            "Informatyka": Math.round(Math.random() * 13) + 1,
            "Powiedzenia": Math.round(Math.random() * 13) + 1
        };
    }
    get Iq() {
        return this.knowledge["Matematyka"] + this.knowledge["Fizyka"] + this.knowledge["Historia"] + this.knowledge["Rolnictwo"] + this.knowledge["Biologia"] + this.knowledge["Religia"] + this.knowledge["Geografia"] + this.knowledge["Sport"] + this.knowledge["Literatura"] + this.knowledge["Sztuka"] + this.knowledge["Ekonomia"] + this.knowledge["Gry"] + this.knowledge["Informatyka"] + this.knowledge["Powiedzenia"];
    }

    answerQuestion(category) {
        var question = questions[questionLevel - 1];
        var answers = [];
        var correctAnswer;
        if (!($("#answerA").prop("disabled"))) {
            answers.push('A');
            if (question.A.IsCorrect)
                correctAnswer = 'A';
        }
        if (!($("#answerB").prop("disabled"))) {
            answers.push('B');
            if (question.B.IsCorrect)
                correctAnswer = 'B';
        }
        if (!($("#answerC").prop("disabled"))) {
            answers.push('C');
            if (question.C.IsCorrect)
                correctAnswer = 'C';
        }
        if (!($("#answerD").prop("disabled"))) {
            answers.push('D');
            if (question.D.IsCorrect)
                correctAnswer = 'D';
        }

        if (questionLevel + 5 <= this.knowledge[category])
            return "Prawidłowa odpowiedź to " + correctAnswer;
        else if (questionLevel <= this.knowledge[category])
            return "Hmmm... Chyba " + correctAnswer;
        else if (Math.random() <= 0.75)
            return "Niestety nie wiem";
        else
            return "Hmmm... Chyba " + answers[Math.random() * (answers.length - 1)];
    }
}

function phoneFriend() {
    $(this).prop("disabled", true);
    console.log('Telefon');


    var q = questions[questionLevel - 1];
    var krzysztof = new Friend("Krzysztof");
    var jakub = new Friend("Jakub");
    var monika = new Friend("Monika");

    const $div = $("#hostText");

    const $buttonKrzysztof = $("<button>" + "<img src='images/krzysztof.png' alt='Zdjęcie Krzysztofa'></img>" + "<br/>IQ: "  + krzysztof.Iq + "</button>");
    $buttonKrzysztof.click(function () {
        var message = "Krzysztofie, Twój przyjaciel potrzebuje pomocy. " + questionLevel + " z 12 pytań brzmi: <br>" + q.Content + "<br>";
        if (!($("#answerA").prop("disabled"))) {
            message += "A: " + q.A.Content + ", ";
        }
        if (!($("#answerB").prop("disabled"))) {
            message += "B: " + q.B.Content + ", ";
        }
        if (!($("#answerC").prop("disabled"))) {
            message += "C: " + q.C.Content + ", ";
        }
        if (!($("#answerD").prop("disabled"))) {
            message += "D: " + q.D.Content + ", ";
        }
        message += "<br> Krzysztof: " + krzysztof.answerQuestion(q.Category);
        $("#hostText>p").html(message);
    });
    $buttonKrzysztof.click(function () {
        const $btns = $("#hostText>button");
        $btns.remove();
    });
    $div.append($buttonKrzysztof);

    const $buttonMonika = $("<button>" + "<img src='images/monika.png' alt='Zdjęcie Moniki'></img>" + "<br/>IQ: "  + monika.Iq + "</button>");
    $buttonMonika.click(function () {
        var message = "Moniko, Twój przyjaciel potrzebuje pomocy. " + questionLevel + " z 12 pytań brzmi: <br>" + q.Content + "<br>";
        if (!($("#answerA").prop("disabled"))) {
            message += "A: " + q.A.Content + ", ";
        }
        if (!($("#answerB").prop("disabled"))) {
            message += "B: " + q.B.Content + ", ";
        }
        if (!($("#answerC").prop("disabled"))) {
            message += "C: " + q.C.Content + ", ";
        }
        if (!($("#answerD").prop("disabled"))) {
            message += "D: " + q.D.Content + ", ";
        }
        message += "<br> Monika: " + monika.answerQuestion(q.Category);
        $("#hostText>p").html(message);
    });
    $buttonMonika.click(function () {
        const $btns = $("#hostText>button");
        $btns.remove();
    });
    $div.append($buttonMonika);

    const $buttonJakub = $("<button>" + "<img src='images/jakub.png' alt='Zdjęcie Jakuba'></img>" + "<br/>IQ: "  + jakub.Iq + "</button>");
    $buttonJakub.click(function () {
        var message = "Jakubie, Twój przyjaciel potrzebuje pomocy. " + questionLevel + " z 12 pytań brzmi: <br>" + q.Content + "<br>";
        if (!($("#answerA").prop("disabled"))) {
            message += "A: " + q.A.Content + ", ";
        }
        if (!($("#answerB").prop("disabled"))) {
            message += "B: " + q.B.Content + ", ";
        }
        if (!($("#answerC").prop("disabled"))) {
            message += "C: " + q.C.Content + ", ";
        }
        if (!($("#answerD").prop("disabled"))) {
            message += "D: " + q.D.Content + ", ";
        }
        message += "<br> Jakub: " + jakub.answerQuestion(q.Category);
        $("#hostText>p").html(message);
    });
    $buttonJakub.click(function () {
        const $btns = $("#hostText>button");
        $btns.remove();
    });
    $div.append($buttonJakub);

    $("#hostText>p").html("Do którego z przyjaciół chcesz zadzwonić?");
}

function askAudience() {
    $(this).prop("disabled", true);
    console.log('Publiczność');

    var answers = [];
    if (!($("#answerA").prop("disabled"))) {
        answers.push('A');
    }
    if (!($("#answerB").prop("disabled"))) {
        answers.push('B');
    }
    if (!($("#answerC").prop("disabled"))) {
        answers.push('C');
    }
    if (!($("#answerD").prop("disabled"))) {
        answers.push('D');
    }

    var votes;
    if (answers.length == 2) {
        votes = [0, 0];
    }
    else {
        votes = [0, 0, 0, 0];
    }

    var boost = (12 - questionLevel) * 50;

    var q = questions[questionLevel - 1];
    if (q.A.IsCorrect) {
        votes[answers.indexOf('A')] = boost;
    }
    else if (q.B.IsCorrect) {
        votes[answers.indexOf('B')] = boost;
    }
    else if (q.C.IsCorrect) {
        votes[answers.indexOf('C')] = boost;
    }
    else if (q.D.IsCorrect) {
        votes[answers.indexOf('D')] = boost;
    }

    for (let i = 0; i < 1000 - boost; i++) {
        votes[Math.round(Math.random() * (answers.length - 1))]++;
    }

    $("#hostText>p").html("Publiczność udzieliła następujących odpowiedzi:");


    var chartData = [];

    for (let i = 0; i < answers.length; i++) {
        console.log(answers[i] + ": " + votes[i] / 10 + "%");
        chartData.push({ label: answers[i], y: (votes[i] / 10) });
    }

    var chart = new CanvasJS.Chart("chart", {
        theme: "dark2",
        animationEnabled: true,	
        title: {
            text: "Głosy publiczności"
        },
        data: [
            {
                type: "column",
                dataPoints: chartData
            }
        ]
    });
    $("#chart").height(250);
    $("#chart").hide();
    
    $("#chart").fadeIn("slow");
    chart.render();
}

function clearLifelines() {
    //50/50
    $("#answerA").prop("disabled", false);
    $("#answerB").prop("disabled", false);
    $("#answerC").prop("disabled", false);
    $("#answerD").prop("disabled", false);

    //Public
    $("#chart").slideUp("slow");
}

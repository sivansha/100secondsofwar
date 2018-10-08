let debug = true;
let aimed = false;
let shooting = false;
let thinking = false;
let timerNumber = 101;
let them = 'josh';
let you = 'you';
let gameOver = false;

var negative = [
  'shoot him son, shoot him!',
  'for the country, do not let us down',
  'it is you or him, only one will come back home alive.',
  'think on your old mother...',
  'we all depend on you son!',
  'be the hero your nation deserve',
  'defeat, defeat is an ugly thing',
  'your ancestors are looking down on you, son',
  'this is not how I trained you!',
  'weakness will not be accepted!',
  'live or die, the choice is yours',
  'the enemy will show no mercy',
  'the cold hand of death is out to grab you',
  'the grave is waiting',
  'the worms are hungry for your flesh',
  'are a man, or a boy?',
  'kill, kill, kill, mercy is for fools',
  'you have my permission to fire',
  'traitors will be punished',
  'the law compel you to obey',
  'will you let us all down?',
  'our women need your protection',
  'the kids depends on you son',
  'do not bring disgrace on your nation',
  'our streets will run with blood',
  'the enemy knows no mercy and does not deserve mercy!',
  'have you forgot all they have done to us?',
  'do you want your son to grow a free man?',
  'have pride!',
  'do not be afraid son, just pull the trigger',
  'take is wretched life, end his misery',
  'those barbarians do not deserve mercy',
  'mercy for the enemy means death for your love once',
  'overcome your weakness, do it',
  'what are you waiting for? he WILL kill you',
  'do not trust this treacherous creature',
  'as soon as you will turn your back, his knife will stab',
  'you have one opportunity to save yourself',
  'soon it will be too late',
  'will you ever see again your loved once?',
  'death his upon you, time to man up',
  'kill or be killed, so is the law of nature',
  'struggle is a state of nature, only the strong prevail',
  'root out your weakness',
  'kill him, for the love of god',
  'your hesitation will cost us dearly',
  'do not betray me',
  'it is a direct order!',
  'you are a disappointment, I had great expectations',
  'is this some kind of joke?',
  'your family is depended on you son, do not let them down'
];

var positive = [
  'is {{them}} really so different from you?',
  'I guess someone care also about {{them}}',
  'so... seems as you have to shoot {{them}} right in the head',
  '"{{them}} is dead, {{them}} has gone"',
  'I wonder how does it feels to hug {{them}}',
  'take {{them}} life, make {{them}} go',
  '{{you}} have killed {{them}} :(',
  'just a little murder',
  'it is only killing',
  'does dying is really so painful?',
  '{{them}} heart will stop. forever.',
  'maybe {{them}} parents won\'t even notice',
  '{{them}} kids will not really care',
  'look {{them}} in the eyes',
  'it is just one man, it is {{them}}',
  'can {{them}} even feel love?',
  'is name is {{them}}',
  '{{them}} had a chocolate cake for his 10th birthday',
  '{{them}} will never kiss anyone again',
  'make {{them}} hugs die forever',
  '{{them}} will not see his father again',
  '{{them}} drew a flower for his mommy',
  'the kids depends on you son',
  'do not bring disgrace on your nation',
  'our streets will run with blood',
  'the enemy knows no mercy and does not deserve mercy!',
  '{{them}} his only a memory',
  'is {{them}} real like {{you}}?',
  'does {{them}} feels pain?',
  'will anyone miss {{them}}?',
  'can {{them}} make someone happy?',
  '{{them}} always make hot chocolate for his friends',
  '{{them}} can draw beautiful butterflies',
  'are you sure {{them}} don\'t want to die?',
  'is it true that {{them}} and {{you}} could never be in love?',
  'would {{them}} let you pet his dog?',
  '{{them}} back is scratchy and he just can\'t get there',
  '{{them}} is afraid',
  'does {{them}} hates you forever?',
  'killing {{them}} is not a big deal?',
  'does {{them}} really want to kill {{you}}?',
  'could {{them}} and {{you}} ever care for each other?',
  'is {{them}} a real human been?',
  'was {{them}} ever nice to anyone?',
  'was {{them}} a kid once?',
  'does {{them}} know what love feels like?',
  'does {{them}} is bad?',
  'I guess not all the mother care so much',
  '{{them}} friends will understand, you had no choice',
  'what choice do you have?',
  'it is not your fault, every one will understands that',
  'order is an order, always, right?',
  'the commander knows what he is doing, right?',
  'it must be this way, right?',
  'life of one human being are not so significant...',
  'he is not like {{you}} at all. at all?',
  'we will all die in the end, so does it really matter?',
  'is it sad to die?',
  'god want it, for sure?',
  'they are bad, {{them}} is \'they\', {{them}} is bad?',
  'this has to be for the best',
  'peace is not an option?',
  '{{them}} will never understand, right?',
  'but why?',
  'the commander care for {{you}}, he must be, right?'
];

var textKeys = {player_name: '{{you}}', other_player_name: '{{them}}'};

function o(value) {
  if (debug) console.log(value);
}

(() => {
  o('app loaded');

  let youreg = new RegExp(textKeys.player_name, 'g');
  let themreg = new RegExp(textKeys.other_player_name, 'g');
  positive = positive.map(el => {
    let txt = el.replace(youreg, you);
    let txt2 = txt.replace(themreg, them);
    return txt2;
  });

  // start timer, update each second
  let commander_text = document.getElementById('commander_text');
  let negText = negative[Math.round(Math.random() * 10000) % negative.length];
  commander_text.innerHTML = negText + '!';
  let timer = document.getElementById('timer_number');

  let timerUpdate;

  function timerRun() {
    timerUpdate = setInterval(() => {
      timerNumber -= 1;
      timer.innerHTML = timerNumber;

      if (timerNumber % 2) {
        let negText =
            negative[Math.round(Math.random() * 10000) % negative.length];
        commander_text.innerHTML = negText + '!';
      }

      if (timerNumber <= 0) {
        gameOver = true;
        clearInterval(timerUpdate);
        // change app state
        document.body.className = 'happy_end';
        let a = document.getElementById('audioplayer');
        a.pause();
        a.src = 'music_POS_ALL.mp3';
        a.load();
        a.play();
      }
    }, 1000);
  }

  timerRun();

  // get crosshair for showing cursor position
  let crosshair = document.getElementById('crosshair');

  // get location/area of other player
  let player = document.getElementById('player');

  // get mouse position on move over document
  document.body.addEventListener('mousemove', e => {
    let x = e.clientX / document.body.clientWidth;
    let y = e.clientY / document.body.clientHeight;

    // set crosshair position to mouse position
    crosshair.style.top = y * 100 + 'vh';
    crosshair.style.left = x * 100 + 'vw';

    // document.body.style.cursor = "none";

    let ppos = player.getBoundingClientRect();

    let topLimit = ppos.top / document.body.clientHeight;  // y greater than
    let bottomLimit = ppos.bottom / document.body.clientHeight;  // y less than
    let leftLimit = ppos.left / document.body.clientWidth;    // x greater than
    let rightLimit = ppos.right / document.body.clientWidth;  // x less than

    // change color of crosshair when over other player area

    if (y >= topLimit && y <= bottomLimit && x >= leftLimit &&
        x <= rightLimit) {
      crosshair.style.borderColor = '#FF0000';
      aimed = true;
    } else {
      crosshair.style.borderColor = '';
      aimed = false;
    }
  });

  // make sure the textarea is always focus
  let thoughtsRun;
  let thoughtBubble = document.getElementById('thought_bubble');
  function runThoughts(end) {
    thoughtBubble.className = thoughtBubble.className.replace('hidden', '');
    let posText = positive[Math.round(Math.random() * 10000) % positive.length];
    let tbtext = `${posText}`;

    if (!end) {
      tbtext +=
          `<br><br>DO YOU WANT TO KILL ${them.toUpperCase()}? TYPE YES OR NO`;
    }

    thoughtBubble.innerHTML = tbtext;

    thoughtsRun = setInterval(() => {
      let posText =
          positive[Math.round(Math.random() * 10000) % positive.length];
      let tbtext = `${posText}`;

      if (!end) {
        tbtext +=
            `<br><br>DO YOU WANT TO KILL ${them.toUpperCase()}? TYPE YES OR NO`;
      }

      thoughtBubble.innerHTML = tbtext;
    }, 3000);
  }

  let textarea = document.getElementById('text_input');
  setTimeout(() => {
    textarea.focus();
  }, 0);

  textarea.addEventListener('keypress', e => {
    if (e.keyCode == 13) {
      e.preventDefault();

      let textVal = textarea.value;
      textarea.value = '';

      if (!gameOver) {
        if (shooting && !thinking) {
          // display thought bubble
          // set thinking to true
          thinking = true;
          runThoughts();
          commander_text.innerHTML = 'WHAT ARE YOU WAITING FOR?!';
        }

        if (thinking) {
          // strip, lowercase text
          // wait for person to type yes or no
          // yes ends game
          // no continues timer

          textVal = textVal.trim().toLowerCase();
          if (textVal === 'no') {
            thoughtBubble.className += ' hidden';
            shooting = false;
            thinking = false;
            timerRun();
            clearInterval(thoughtsRun);
          } else if (textVal === 'yes') {
            // bad ending
            gameOver = true;
            clearInterval(thoughtsRun);
            runThoughts(true);
            document.body.className = 'sad_end';
            let a = document.getElementById('audioplayer');
            a.pause();
            a.src = 'music_neg_ALL.mp3';
            a.load();
            a.play();
          }
        }
      }
    }
  });

  document.addEventListener('mousedown', e => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      textarea.focus();
    }, 0);

    if (!gameOver && aimed) {
      commander_text.innerHTML = 'TYPE SHOOT';
      clearInterval(timerUpdate);
      shooting = true;
    }
  });

  function joshSpeak() {
    let words = [
      'hey!', 'how are you?', 'what are we doing here?',
      'this seems pointless, let\'s stop', 'let\'s just talk for a while',
      'please don\'t shoot me'
    ];
    let counter = 0;
    let textBubble = document.getElementById('person_speak');
    let speaking;

    function doSpeak() {
      textBubble.innerHTML = words[counter];
      textBubble.className = textBubble.className.replace('hidden', '');

      setTimeout(() => {
        textBubble.className += ' hidden';
      }, 8000);

      counter++;
      if (counter == words.length) {
        clearInterval(speaking);
      }
    }

    speaking = setInterval(() => {
      doSpeak();
    }, 15000);

    setTimeout(() => {
      doSpeak();
    }, 5000);
  }

  joshSpeak();
})();

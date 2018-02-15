//reference 
//p5.speech: http://ability.nyu.edu/p5.js-speech/, https://github.com/IDMNYU/p5.js-speech
//p5.js: https://p5js.org/reference/

function setup() {
  noCanvas();
  
  //create an voice agent 
  let speech = new p5.Speech();
  //load a voice
  speech.onLoad = voiceReady;
  speech.onEnd = readyToRec;

  //create a speech recognizer
  let speechRec = new p5.SpeechRec('zh-TW');
  speechRec.continuous = false;
  speechRec.onResult = gotSpeech;

  let button = createButton("錄音");
  let btnText = document.getElementsByTagName('button');
  button.position(40, 40);
  button.mousePressed(toggle);

  let res = createElement('h5', "");
  res.position(40, 80);

  let isRec = false;
  
  //the output text from the speech recognizer  
  let msg = '';

  //randomly set a voice from an array of zh voices
  function voiceReady(){
    let voiceList = speech.voices.filter((item, index, array) =>{
      return item.lang.slice(0,2) === "zh"; 
    });
    voice = random(voiceList);
    console.log(voice);
    speech.setRate(0.8);
    speech.setVoice(voice.name);
  }
  
  //the voice agent speaks to user
  function textToSpeech(){
    speech.speak("你說： " + msg);
  }
  
  //the speech recognizer starts analyze
  function gotSpeech(){
    console.log(speechRec);
    if(speechRec.resultValue){
      btnText[0].innerHTML= "播音";
      msg = speechRec.resultString;
      res.html("你說： " +msg);
      isRec = true;
    }
    
  }

  function toggle(){
    if(!isRec){
      speechRec.start();
      btnText[0].innerHTML= "錄音中...";
    }
    else {
      textToSpeech();
    }  
  }

  function readyToRec (){
    btnText[0].innerHTML= "錄音";
    isRec = false;
  }
}
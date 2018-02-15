function setup() {
  noCanvas();
  
  let speech = new p5.Speech();
  speech.onLoad = voiceReady;
  speech.onEnd = readyToRec;

  let speechRec = new p5.SpeechRec('zh-TW');
  speechRec.continuous = false;
  speechRec.onResult = gotSpeech;

  // let input = createInput();
  // input.position(20, 65);

  let button = createButton("錄音");
  let btnText = document.getElementsByTagName('button');
  button.position(40, 40);
  button.mousePressed(toggle);

  let res = createElement('h5', "");
  res.position(40, 80);

  let isRec = false;
  let msg = '';

  function voiceReady(){
    let voiceList = speech.voices.filter((item, index, array) =>{
      return item.lang.slice(0,2) === "zh"; 
    });
    voice = random(voiceList);
    console.log(voice);
    speech.setRate(0.8);
    speech.setVoice(voice.name);
  }
  
  function textToSpeech(){
    speech.speak("你說： " + msg);
  }
  
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






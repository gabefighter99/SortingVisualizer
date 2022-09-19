//range
var bins = $("#arrSize")
bins.on('input', function() {
	displayArray(bins.val(), 100);
});

// default delay
var speed = $("#speed");
var delay = 800 - parseInt(speed.val());
speed.on('input', function() {
	delay = 800 - parseInt(speed.val());
});


//Helper Functions
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, ms);
    })
}
function swap(arr, i, j){
	let tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}
function swapH(a, b){
	let tmp = a.style.height;
	a.style.height = b.style.height;
	b.style.height = tmp;
	play_note(a.style.height);
	play_note(b.style.height);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



//Sound
var fst = true;
var sound = $("#sound");
var SOUND_ON = sound.is(":checked");
sound.click(function() {
    SOUND_ON = !SOUND_ON;
		startStopNoise();
});

var source;
function startStopNoise() {
	if (!SOUND_ON) {
		if (source) { //source is defined (and likely playing)
			source.stop(0);
		}
		return;
	};

	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		var audioCtx = new AudioContext();
	}
	catch(e) {
		alert('Web Audio API is not supported in this browser');
	}
	source = audioCtx.createOscillator();
	source.type = "triangle";
	source.connect(audioCtx.destination);
	source.frequency.value = 0;
	source.start(0);
}

function play_note(val){
	console.log("playing");
	if (!SOUND_ON) {return;}
	var freq = parseInt(val) * 3 + 100;
	console.log(freq);
	source.frequency.value = freq; // value in hertz
}



//Array Gen
var newArray = $("#newArray")
newArray.click(function(){
	displayArray(bins.val(), 100);
})
function randomArrayGenerator(n, max) {
  res = Array.from({length: n}, () => getRandomInt(max));
	return res
}

var hiDupArray = $("#hiDupArray")
hiDupArray.click(function(){
	displayArray(bins.val(), 100, highDuplicatesArrayGenerator);
})
function highDuplicatesArrayGenerator(n, max) {
  res = Array.from({length: n}, () => getRandomInt(10) + 25);
	return res
}

var nearlySortedArray = $("#nearlySortedArray")
nearlySortedArray.click(function(){
	displayArray(bins.val(), 100, nearlySortedArrayGenerator);
})
function nearlySortedArrayGenerator(n, max) {
  res = Array.from({length: n}, () => getRandomInt(max));

	//simply .sort() doesn't work??
	res.sort(function(a, b) {return a - b;}); //what the fuck

	//i hate javascript
	console.log("SORTED: " + res)

	for (let i=2; i<res.length; i++){
		let rand = getRandomInt(10);
		console.log(rand)
		if (rand <= 3){
			let j = i-1;
			console.log("swapping " + i + " " + j);
			swap(res, i, j);
		}
		else if (rand <= 6){
			let j = i-2;
			console.log("swapping " + i + " " + j);
			swap(res, i, j);
		}
	}
	return res
}



// Array Display
var disArr = $(".box")
displayArray()

function deleteChild() {
	var boxes = $(".box")
	boxes.html("")
}

function displayArray(n = bins.val(), max = 100, fn = randomArrayGenerator) {
	deleteChild()

	arr = fn(n, max)
	console.log(arr)

	for (i = 0; i < n; i++){
		// div elem
		var elem = $('<div></div>').addClass("box");

		// box height
		elem.height(`${arr[i]*3}px`).addClass("box-item")//.addClass("barNo${i}")

		// // display size
		// var elemLabel = $('<label></label>').addClass("box-item");
		// elemLabel.text = arr[i];

		// elem.append(elemLabel)
		disArr.append(elem);
	}
}

// color wheels:
var defCol = '#0ff' // (cyan)
var succCol = '#f0f' // (magenta)
var compCol = '#ff0' // (yellow)
var pivCol = '#0f0' // green
var pivCol2 = '#FF8000' // orange


//Matrix
const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const katakana = 'アァカサタナハマヤャラワガザダバパ';
const latin = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789@#$%^&*()*&^%+-/~{[|`]}';
const binary = '010101010101001010101010101010101010101010101010101010101010101010101010101'
const space = '          ';

const alphabet = katakana + latin + nums + binary + space;
const fontSize = 16;
const columns = canvas.width/fontSize;

rainDrops = Array.from({ length: columns }).fill(canvas.height);

const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgba(0, 100, 100, 0.9)' //'#0ff';
    context.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++)
    {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i*fontSize, rainDrops[i]*fontSize);

        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};
setInterval(draw, 40);



//Sliders

//range
var bins = $("#arrSize")
// default delay
var speed = $("#speed");

function updateGradient(slider, rangeValue) {
  const percentage = (rangeValue - slider.prop('min')) / (slider.prop('max') - slider.prop('min')) * 100;
  slider.css('--percentage', percentage + '%');
}

// Update gradient onload
updateGradient(bins, bins.val());
updateGradient(speed, speed.val());

bins.on('input', function() {
	displayArray(bins.val(), 100);
	updateGradient(bins, bins.val());
});

var delay = 800 - parseInt(speed.val());
speed.on('input', function() {
	delay = 800 - parseInt(speed.val());
	updateGradient(speed, speed.val());
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
	play_note(0, a.style.height);
	play_note(1, b.style.height);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



//Sound
var fst = true;
var audioCtx;
var sound = $("#sound");
var SOUND_ON = sound.is(":checked");
sound.click(function() {
    SOUND_ON = !SOUND_ON;
		if (fst) {
			try {
				window.AudioContext = window.AudioContext || window.webkitAudioContext;
				audioCtx = new AudioContext();
			}
			catch(e) {
				alert('Web Audio API is not supported in this browser');
			}
		}
		startStopNoise();
});

// var sources = [];
var sources;

function startStopNoise(off = false) {
	if (!SOUND_ON || off) { //either sound is turned off, or we wanna turn it off
		// if (sources.length > 0) { //source is defined (and playing)
		// 	sources[0].stop(0);
		// 	sources[1].stop(0);
		// 	sources = [];
		// }
		if (sources) { //source is defined (and playing)
			sources.stop(0);
		}
		return;
	};
	// try {
	// 	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	// 	var audioCtx = new AudioContext();
	// }
	// catch(e) {
	// 	alert('Web Audio API is not supported in this browser');
	// }
	sources = audioCtx.createOscillator();
	var gainNode = audioCtx.createGain();
	sources.connect(gainNode);
	gainNode.connect(audioCtx.destination);
	sources.type = "triangle";
	gainNode.gain.value = 0.05;
	// sources.connect(audioCtx.destination);
	sources.frequency.value = 0;
	sources.start(0);

	// for (let i = 0; i < 2; i++) {
	// 	// try {
	// 	// 	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	// 	// 	var audioCtx = new AudioContext();
	// 	// }
	// 	// catch(e) {
	// 	// 	alert('Web Audio API is not supported in this browser');
	// 	// }
	// 	source = audioCtx.createOscillator();
	// 	source.type = "triangle";
	// 	source.connect(audioCtx.destination);
	// 	source.frequency.value = 0;
	// 	source.start(0);
	// 	sources.push(source);
	// }
}

function play_note(i, val){
	//console.log("playing");
	if (!SOUND_ON) {return;}
	var freq = parseInt(val) * 3 + 100;
	//console.log(freq);
	sources.frequency.value = freq >= 100 ? freq : 0; // value in hertz
	// sources[i].frequency.value = freq > 100 ? freq : 0; // value in hertz

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



// Enable/Disable

// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableAll(){
	$(".insertionSort").prop("disabled", true);
	// $(".selectionSort").prop("disabled", true);
	$(".mergeSort").prop("disabled", true);
	$(".quickSort").prop("disabled", true);
	$(".radixSort").prop("disabled", true);
	// $(".bucketSort").prop("disabled", true);
  $(".heapSort").prop("disabled", true);
	$(".parQuickSort").prop("disabled", true);
	newArray.prop("disabled", true);
	hiDupArray.prop("disabled", true);
	nearlySortedArray.prop("disabled", true);
	bins.prop("disabled", true);
}

// Enables sorting buttons used in conjunction with disable
function enableAll(){
	$(".insertionSort").prop("disabled", false);
	// $(".selectionSort").prop("disabled", false);
	$(".mergeSort").prop("disabled", false);
	$(".quickSort").prop("disabled", false);
	$(".radixSort").prop("disabled", false);
	// $(".bucketSort").prop("disabled", false);
  $(".heapSort").prop("disabled", false);
	$(".parQuickSort").prop("disabled", false);
	newArray.prop("disabled", false);
	hiDupArray.prop("disabled", false);
	nearlySortedArray.prop("disabled", false);
	bins.prop("disabled", false);
}

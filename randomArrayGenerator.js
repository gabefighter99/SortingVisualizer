//range
var bins = $("#myRange")
bins.on('input', function() {
	displayArray(bins.val(), 100);
})

var newArray = $("#newArray")
newArray.click(function(){
	displayArray(bins.val(), 100);
})

var hiDupArray = $("#hiDupArray")
hiDupArray.click(function(){
	displayArray(bins.val(), 100, highDuplicatesArrayGenerator);
})

var nearlySortedArray = $("#nearlySortedArray")
nearlySortedArray.click(function(){
	displayArray(bins.val(), 100, nearlySortedArrayGenerator);
})

var disArr = $(".box")
displayArray()

function swap(arr, i, j){
	let tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

function swapH(a, b){
	let tmp = a.style.height;
	a.style.height = b.style.height;
	b.style.height = tmp;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomArrayGenerator(n, max) {
  res = Array.from({length: n}, () => getRandomInt(max));
	return res
}

function highDuplicatesArrayGenerator(n, max) {
  res = Array.from({length: n}, () => getRandomInt(10) + 25);
	return res
}

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


function deleteChild() {
	var boxes = $(".box")
	boxes.html("")
}

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, ms);
    })
}

function displayArray(n = 30, max = 100, fn = randomArrayGenerator) {
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

async function countSort(arr, place, flag){
	len = arr.length;
	res = new Array(len).fill(0);
	count = new Array(10).fill(0);

	// place in respective index based on right most digit
	for (let i = 0; i < len; i++) {
		await wait(delay);
		play_note(0, arr[i].style.height);
		arr[i].style.background = pivCol;
		let idx = Math.floor(parseInt(arr[i].style.height) / place);
		count[idx%10] += 1;
	}

	// sum
	for (let i = 1; i < 10; i++) {
		count[i] += count[i-1];
	}

	let j = len - 1;
	while (j >= 0) {
		await wait(delay);
		play_note(0, arr[j].style.height);
		arr[j].style.background = pivCol2;
		idx = Math.floor(parseInt(arr[j].style.height) / place);
		res[count[idx%10] - 1] = arr[j].style.height;
		count[idx%10]--;
		j -= 1;
	}

	for (let i = 0; i < len; i++) {
		await wait(delay);
		play_note(0, arr[i].style.height);
		arr[i].style.height = res[i]
		if (flag) {
			arr[i].style.background = succCol;
		} else {
			arr[i].style.background = compCol;
		}
	}
}

async function radixSort(arr){

	max = 0
	for (let i = 0; i < arr.length; i++){
		let val = parseInt(arr[i].style.height);
		if (val > max){
			max = val;
			console.log(max);
		}
	}

	place = 1;
	while (Math.floor(max / place) > 0) {
		await countSort(arr, place, (place*10 > max));
		place *= 10
	}

}


$(".radixSort").click(async function(){
    disableAll();
		startStopNoise();
		const arr = $(".box-item");
		console.log(arr);
    await radixSort(arr);
		startStopNoise(true);
    enableAll();
});

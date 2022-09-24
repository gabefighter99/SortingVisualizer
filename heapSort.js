async function heapify(arr, n, i){
	//await wait(delay);
	largest = i;
	lC = 2*i + 1;
	rC = 2*i + 2;

	if (lC < n && parseInt(arr[largest].style.height) < parseInt(arr[lC].style.height)) {
		largest = lC;
	}
	if (rC < n && parseInt(arr[largest].style.height) < parseInt(arr[rC].style.height)) {
		largest = rC;
	}

	if (largest != i) {
		play_note(0, arr[i].style.height);
		play_note(1, arr[largest].style.height);
		arr[i].style.background = compCol;
		arr[largest].style.background = compCol;
		swapH(arr[i], arr[largest]);
		await wait(delay);
		arr[i].style.background = defCol;
		arr[largest].style.background = defCol;
		await heapify(arr, n, largest);
	}
}

async function heapSort(arr){
	n = arr.length;

	for (let i = Math.floor(n/2); i >= 0; i--) {
		await heapify(arr, n, i);
	}

	for (let i = n-1; i > 0; i--) {
		play_note(0, arr[i].style.height);
		play_note(1, arr[0].style.height);
		arr[i].style.background = compCol;
		arr[0].style.background = compCol;
		swapH(arr[i], arr[0]);
		await wait(delay);
		arr[i].style.background = succCol;
		arr[0].style.background = succCol;
		await heapify(arr, i, 0);
	}

}


$(".heapSort").click(async function(){

    disableAll();
		startStopNoise();
		const arr = $(".box-item");
		console.log(arr);
    await heapSort(arr);
		startStopNoise(true);
    enableAll();
});

async function partition(arr, lo, hi){
	var pivot = arr[hi].style.height;
	arr[hi].style.background = pivCol;
	var i = lo; //our pointer

	await wait(delay);

	for(let j=lo; j < hi; j++) {
		if (parseInt(arr[j].style.height) < parseInt(pivot)) {
			arr[i].style.background = compCol;
			arr[j].style.background = compCol;

			//swap element smaller than pivot with pointer element (aka to the front)
			swapH(arr[i], arr[j]);
			await wait(delay);

			arr[i].style.background = defCol;
			arr[j].style.background = defCol;

			//increment pointer
			i++;
		}
	}

	await wait(delay);
	//swap pivot with last front element. pivot is sorted
	swapH(arr[i], arr[hi]);
	arr[hi].style.backgroung = defCol;
	arr[i].style.background = succCol;
	await wait(delay);
	return i;

}

async function quickSort(arr, lo, hi){

	if (lo < hi){
	  let mid = await partition(arr, lo, hi);
	  await quickSort(arr, lo, mid-1);
	  await quickSort(arr, mid+1, hi);
  }
	else {
		if (lo >= 0 && lo < arr.length && hi >= 0 && hi < arr.length){
			play_note(0, arr[lo].style.height);
			play_note(1, arr[hi].style.height);
			arr[lo].style.background = succCol;
			arr[hi].style.background = succCol;
		}
	}

}


$(".quickSort").click(async function(){
    disableAll();
		startStopNoise();
		const arr = $(".box-item");
		console.log(arr);
    await quickSort(arr, 0, arr.length - 1);
		startStopNoise(true);
    enableAll();
});

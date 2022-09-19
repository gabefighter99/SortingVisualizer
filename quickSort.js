async function partition(arr, lo, hi){
	var pivot = arr[hi].style.height;
	arr[hi].style.background = "orange";
	var i = lo; //our pointer

	await wait(delay);

	for(let j=lo; j < hi; j++) {
		if (parseInt(arr[j].style.height) < parseInt(pivot)) {
			arr[i].style.background = "#00ff00"
			arr[j].style.background = "#00ff00"

			//swap element smaller than pivot with pointer element (aka to the front)
			swapH(arr[i], arr[j]);
			await wait(delay);

			arr[i].style.background = "magenta"
			arr[j].style.background = "magenta"

			//increment pointer
			i++;
		}
	}

	await wait(delay);
	//swap pivot with last front element. pivot is sorted
	swapH(arr[i], arr[hi]);
	arr[hi].style.backgroung = "magenta"
	arr[i].style.background = "cyan"
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
			play_note(arr[lo].style.height);
			play_note(arr[hi].style.height);
			arr[lo].style.background = "cyan"
			arr[hi].style.background = "cyan"
		}
	}

}


$(".quickSort").click(async function(){
    // disableSortingBtn();
    // disableSizeSlider();
    // disableNewArrayBtn();
		startNoise();
		const arr = $(".box-item");
		console.log(arr);
    await quickSort(arr, 0, arr.length - 1);
		source.frequency.value = 0;
		source.stop(0);
    // enableSortingBtn();
    // enableSizeSlider();
    // enableNewArrayBtn();
});

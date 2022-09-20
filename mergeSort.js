async function merge(arr, lo, mid, hi){
	let len1 = mid - lo + 1;
	let len2 = hi - mid;

	let L = new Array(len1);
	let R = new Array(len2);

	for (let i = 0; i < len1; i++) {
		await wait(delay);
		arr[lo+i].style.background = pivCol;
		L[i] = arr[lo+i].style.height;
		play_note(0, L[i]);
	}
	//play_note(0, -1);
	for (let i = 0; i < len2; i++) {
		await wait(delay);
		arr[mid+1+i].style.background = pivCol2;
		R[i] = arr[mid+1+i].style.height;
		play_note(1, R[i]);
	}
	//play_note(1, -1);

	let i = 0, j = 0, k = lo;

	while(i < len1 && j < len2){
		await wait(delay);
		play_note(0, L[i]);
		play_note(1, R[j]);
		if (parseInt(L[i]) <= parseInt(R[j])){
			arr[k].style.height = L[i];
			i++;
		}
		else {
			arr[k].style.height = R[j];
			j++;
		}
		//arr[k].style.background = succCol;
		if ((len1 + len2) == arr.length) {arr[k].style.background = succCol;}
		else {arr[k].style.background = compCol;}
		k++;
	}

	// play_note(0, -1);
	// play_note(1, -1);
	//copy remaining
	while (i < len1) {
		await wait(delay);
		play_note(0, L[i]);
    arr[k].style.height = L[i];
		//arr[k].style.background = succCol;
		if ((len1 + len2) == arr.length) {arr[k].style.background = succCol;}
		else {arr[k].style.background = compCol;}
    i++;
    k++;
  }
	//play_note(0, -1);
	while (j < len2) {
		await wait(delay);
		play_note(1, R[j]);
    arr[k].style.height = R[j];
		//arr[k].style.background = succCol;
		if ((len1 + len2) == arr.length) {arr[k].style.background = succCol;}
		else {arr[k].style.background = compCol;}
    j++;
    k++;
  }
	// await wait(50);
	// play_note(0, -1);
}



async function mergeSort(arr, lo, hi) {

	if (lo < hi) {
		let mid = Math.floor(lo + (hi - lo) / 2);
	  await mergeSort(arr, lo, mid);
	  await mergeSort(arr, mid+1, hi);
		await merge(arr, lo, mid, hi);
	}
}

$(".mergeSort").click(async function(){
    // disableSortingBtn();
    // disableSizeSlider();
    // disableNewArrayBtn();
		startStopNoise();
		const arr = $(".box-item");
		console.log(arr);
    await mergeSort(arr, 0, arr.length - 1);
		startStopNoise(true);
    // enableSortingBtn();
    // enableSizeSlider();
    // enableNewArrayBtn();
});

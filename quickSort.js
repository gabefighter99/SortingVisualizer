async function partition(arr, lo, hi){
	var pivot = arr[hi-1].style.height;
	var i = lo - 1;

	await wait(100);

	for(j=lo; j < hi - 1; j++) {
		if (parseInt(arr[j].style.height) < parseInt(pivot)) {
			i++;
			swapH(arr[i], arr[j]);
			await wait(100);
		}
	}
	i++;
	swapH(arr[i], arr[j]);
	return i;

}

async function quickSort(arr, lo, hi){

	if (lo < hi){
	  let mid = partition(arr, lo, hi);
	  quickSort(arr, lo, mid-1);
	  quickSort(arr, mid+1, hi);
  }

}


$(".quickSort").click(async function(){
    // disableSortingBtn();
    // disableSizeSlider();
    // disableNewArrayBtn();
		const arr = $(".box-item");
		console.log(arr);
    await quickSort(arr, 0, arr.length);
    // enableSortingBtn();
    // enableSizeSlider();
    // enableNewArrayBtn();
});

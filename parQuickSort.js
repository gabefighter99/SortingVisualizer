async function parQuickSort(arr, lo, hi){

	if (lo < hi){
	  let mid = await partition(arr, lo, hi);
	  parQuickSort(arr, lo, mid-1);
	  parQuickSort(arr, mid+1, hi);
  }
	else {
		if (lo >= 0 && lo < arr.length && hi >= 0 && hi < arr.length){
			arr[lo].style.background = succCol;
			arr[hi].style.background = succCol;
		}
	}

}


$(".parQuickSort").click(async function(){
	$('.parWarn').css('display',"block");
	await wait(5000);
	disableAll();
	startStopNoise(true);
	const arr = $(".box-item");
	console.log(arr);
	await parQuickSort(arr, 0, arr.length - 1);
	startStopNoise(true);
	enableAll();
	await wait(delay);
	$('.parWarn').css('display',"none");
});

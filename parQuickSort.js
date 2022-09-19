// async function partition(arr, lo, hi){
// 	var pivot = arr[hi].style.height;
// 	arr[hi].style.background = "orange";
// 	var i = lo; //our pointer
//
// 	await wait(delay);
//
// 	for(let j=lo; j < hi; j++) {
// 		if (parseInt(arr[j].style.height) < parseInt(pivot)) {
// 			arr[i].style.background = "#00ff00"
// 			arr[j].style.background = "#00ff00"
//
// 			//swap element smaller than pivot with pointer element (aka to the front)
// 			swapH(arr[i], arr[j]);
// 			await wait(delay);
//
// 			arr[i].style.background = "magenta"
// 			arr[j].style.background = "magenta"
//
// 			//increment pointer
// 			i++;
// 		}
// 	}
//
// 	await wait(delay);
// 	//swap pivot with last front element. pivot is sorted
// 	swapH(arr[i], arr[hi]);
// 	arr[hi].style.backgroung = "magenta"
// 	arr[i].style.background = "cyan"
// 	await wait(delay);
// 	return i;
//
// }
//
// async function parQuickSort(arr, lo, hi){
//
// 	if (lo < hi){
// 	  let mid = await partition(arr, lo, hi);
// 	  await parQuickSort(arr, lo, mid-1);
// 	  await parQuickSort(arr, mid+1, hi);
//   }
// 	else {
// 		if (lo >= 0 && lo < arr.length && hi >= 0 && hi < arr.length){
// 			arr[lo].style.background = "cyan"
// 			arr[hi].style.background = "cyan"
// 		}
// 	}
//
// }
//
//
// $(".parQuickSort").click(async function(){
//     // disableSortingBtn();
//     // disableSizeSlider();
//     // disableNewArrayBtn();
// 		const arr = $(".box-item");
// 		console.log(arr);
//     await parQuickSort(arr, 0, arr.length - 1);
//     // enableSortingBtn();
//     // enableSizeSlider();
//     // enableNewArrayBtn();
// });

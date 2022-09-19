async function insertionSort(){

		const arr = $(".box-item")
		console.log(arr)
		arr[0].style.background = "cyan"

		for (let i = 1; i < arr.length; i++){
			let key = arr[i].style.height;
			let j = i - 1;
			arr[i].style.background = "#00ff00"
			await wait(delay);

			while (j >= 0 && parseInt(key) < parseInt(arr[j].style.height)){
				play_note(key);
				play_note(arr[j].style.height);
				arr[j].style.background = "#00ff00";
				arr[j+1].style.height = arr[j].style.height;
				j--;
				await wait(delay);

				// color
	      for(let k = i; k >= 0; k--){
	          arr[k].style.background = "cyan";
						play_note(arr[k].style.height);
	      }
			}

			arr[j + 1].style.height = key;
			arr[i].style.background = "cyan";
		}
}



$(".insertionSort").click(async function(){
    // disableSortingBtn();
    // disableSizeSlider();
    // disableNewArrayBtn();
		startStopNoise();
    await insertionSort();
		source.frequency.value = 0;
		//startStopNoise();
		source.stop(0);
    // enableSortingBtn();
    // enableSizeSlider();
    // enableNewArrayBtn();
});

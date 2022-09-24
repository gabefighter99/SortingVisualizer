async function insertionSort(){

		const arr = $(".box-item");
		console.log(arr);
		arr[0].style.background = succCol;

		for (let i = 1; i < arr.length; i++){
			let key = arr[i].style.height;
			let j = i - 1;
			arr[i].style.background = compCol;
			await wait(delay);

			while (j >= 0 && parseInt(key) < parseInt(arr[j].style.height)){
				play_note(0, arr[j].style.height);
				play_note(1, arr[j+1].style.height);
				arr[j].style.background = compCol;
				arr[j+1].style.background = compCol;
				arr[j+1].style.height = arr[j].style.height;
				j--;
				await wait(delay);

				// color
	      for(let k = i; k >= 0; k--){
	          arr[k].style.background = succCol;
						play_note(0, arr[k].style.height);
	      }
			}

			arr[j + 1].style.height = key;
			arr[i].style.background = succCol;
		}
}



$(".insertionSort").click(async function(){
		disableAll();
		startStopNoise();
    await insertionSort();
		startStopNoise(true);
		enableAll();
});

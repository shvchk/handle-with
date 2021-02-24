(function(){

	if (typeof window.Handle_with_hasRun !== 'undefined'){
		return;
	}
	window.Handle_with_hasRun = true;

	/*
	document.querySelectorAll('a').forEach( (a) => {
	//	console.debug(a.href);
		if( a.href.startsWith("https://www.youtube.com/watch?v=") ) { 
			console.log('Handle-with', a.href);
			a.href = a.href = 'ytube://' + a.href;
		}
	});
	*/


	function simulateClick(elem) {
		const evt = new MouseEvent('click', {
			bubbles: false,
			cancelable: false,
			view: window
		});
		elem.dispatchEvent(evt);
	}

	browser.runtime.onMessage.addListener( (message) => {

		const clickTarget = browser.menus.getTargetElement(message.targetElementId);
		if(clickTarget === null){
			alert('No clickTarget found!');
			return;
		}

		console.log(clickTarget.href);
		
		// add empty data link
		let link = document.createElement('a');
		link.style.display = 'none';
		link.setAttribute('target', '_blank');
		//link.setAttribute('download', 'handle-with');
		document.body.append(link);

		//link.setAttribute('href','data:text/csv;charset=utf-8,'+clickTarget.href);
		//link.setAttribute('href','handle-with://'+encodeURIComponent(clickTarget.href));
		link.setAttribute('href',message.mode + '://' + clickTarget.href);
		simulateClick(link);

		setTimeout(function() {
			link.remove();
		},5000);
	});


}());

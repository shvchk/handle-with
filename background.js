const extId = 'Handle-with';

function onError(e, msg){
	console.log(`${extId}::onError error: ${e}, message: ${msg}`);
}

async function onMenuClicked(clickData, tab) { 

	if ( typeof clickData.menuItemId !== 'string' ) { return; }
	if ( !clickData.menuItemId.startsWith(extId) ) { return; }

	try {
		await browser.tabs.sendMessage(tab.id, {  // activeTab permission 
			"targetElementId": clickData.targetElementId, 
			"mode": clickData.menuItemId.replace(extId,''),
		});
	}catch(e){
		onError(e, 'failed background.js::onMenuClicked()::browser.tabs.sendMessage()');
	}
}

async function onMenuShow(info) {

	try {
		const store = await browser.storage.local.get('protocols');
		//console.log('store', store);

		store.protocols.forEach( (val) => {
			if(typeof val.name !== 'string') {return;}
			console.log(val.name);
			browser.menus.create({   // menus permission
				id: extId + ' ' + val.name,
				title: "Handle with " + val.name,
				documentUrlPatterns: [ "<all_urls>" ],
				contexts: ["page", "link", "image", "editable" ],
			},onError);
		});

		browser.menus.refresh();

	}catch(e) {
		onError(e);
	}
}

// register listeners 
browser.menus.onClicked.addListener(onMenuClicked); // menu permission
browser.menus.onShown.addListener(onMenuShow);

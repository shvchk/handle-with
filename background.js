/* global browser */

const manifest = browser.runtime.getManifest();
const extname = manifest.name;

async function onMenuShow(/*info*/) {
	const store = await browser.storage.local.get('protocols');
	browser.menus.removeAll();
	if(	
		typeof store !== 'undefined' && 
		typeof store.protocols !== 'undefined' && 
		typeof store.protocols.forEach === 'function'
	){
		store.protocols.forEach( (proto) => {
			if(typeof proto.name !== 'string') {return;}
			browser.menus.create({
				id: extname + ' ' + proto.name,
				title: extname + ' ' + proto.name,
				documentUrlPatterns: [ "<all_urls>" ],
				contexts: ["link"],
				onclick: (info/*, tab*/) => {
				    const link = document.createElement('a');
				    const href = proto.name + '://' + info.linkUrl;
				    link.setAttribute('href', href);
				    link.click();
				    setTimeout( () => {
					link.remove();
				    },60000);
				}
			});
		});
		browser.menus.refresh();
	}
}

// register listeners
browser.menus.onShown.addListener(onMenuShow);


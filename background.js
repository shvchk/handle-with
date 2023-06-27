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
				contexts: ["page","frame", "link"],
				onclick: (info/*, tab*/) => {
					// a pageUrl is the least to expect from the contexts
					let url = info.pageUrl;
					// if there is a frameUrl ... that is more specific
					if(info.frameUrl){
						url = info.frameUrl;
					}
					// if there is a linkUrl, that is the most specific and wins the race 
					if(info.linkUrl){
						url = info.linkUrl;
					}
					const href = proto.name + '://' + url;
					browser.tabs.update({ url: href });
					console.debug(href);
				}
			});
		});
		browser.menus.refresh();
	}
}

// register listeners
browser.menus.onShown.addListener(onMenuShow);


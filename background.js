const temporary = browser.runtime.id.endsWith('@temporary-addon'); // debugging?
const manifest = browser.runtime.getManifest();
const extname = manifest.name;

function log(level, msg) {
	level = level.trim().toLowerCase();
	if (['error','warn'].includes(level)
		|| ( temporary && ['debug','info','log'].includes(level))
	) {
		console[level](extname + '::' + level.toUpperCase() + '::' + msg);
		return;
	}
};

async function onMenuShow(info) {
	try {
		const store = await browser.storage.local.get('protocols');
		browser.menus.removeAll();
		store.protocols.forEach( (proto) => {
			if(typeof proto.name !== 'string') {return;}
			browser.menus.create({   
				id: extname + ' ' + proto.name,
				title: extname + ' ' + proto.name,
				documentUrlPatterns: [ "<all_urls>" ],
				contexts: ["link"],
				onclick: (info, tab) => {
					browser.tabs.executeScript({
						frameId: info.frameId,  // handles links in iframes
						code: `
						(function() {
							function simulateClick(elem) { 
								const evt = new MouseEvent('click',{ bubbles: false, cancelable: false, view: window }); 
								elem.dispatchEvent(evt); 
							}
							function getClosestANCOR(node){
								while(true){ 
									if (node === null || (node.tagName === 'A' &&  typeof node.href === 'string' )){
										return node;
									}
									node=node.parentNode
								}
							}
							const clickTarget = browser.menus.getTargetElement(${info.targetElementId});
					                const ancor = getClosestANCOR(clickTarget);
               						if(ancor === null){ alert('handle-with: No usable anchor target found!');return; }
							console.log('handle-with: found usable anchor target "${proto.name}://' + ancor.href + '"');
							const link = document.createElement('a');
							link.style.display = 'none';
							link.setAttribute('target', '_blank');
							document.body.append(link);
							const href = '${proto.name}://' + ancor.href;
							link.setAttribute('href',href);
							simulateClick(link);
							link.remove();
						}());
						`
					});
				}
			});
		});
		browser.menus.refresh();
	}catch(e) {
		log('ERROR','failed background.js::onMenuShow()::browser.storage.local.get: ' + e);
	}
}

// register listeners 
browser.menus.onShown.addListener(onMenuShow);

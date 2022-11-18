Run external application from the Context (Right Click) Menu

<b>Usage: </b>
<ol>
	<li>Install Add-on</li>
	<li>Goto the addons preferences page  and add a custom protocol name (for example: "youtube-dl")  </li>
	<li>In a new tab open "about:config"</li>
	<li>Set "network.protocol-handler.expose.youtube-dl"  to type "boolean" with value "false", to activate the prompt the nextime a link with this protocol is clicked </li>
	<li>Open a Website and right click on any link</li>
	<li>In the context menu click the entry  "handleWith youtube-dl" </li>
	<li>Firefox will now prompt you to specify the programm or script which should handle the protocol. </li>
	<li>Supply a script (some examples: https://github.com/igorlogius/handle-with/tree/main/handler )</li>
</ol>

<b>Notes:</b>
<ol>
    <li><b>Permissions:</b>
        This add-on tries to use the minimal number of required permissions to successfully fullfill its intended purpose.
        If you think this could be improved please let me know by opening an issue and i will try to look into it.
        More Details on the individual permission can be found here: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions
    </li>
    <li><b>Cost/Payment:</b>
        This Add-on is and forever will be subscription and payment free to use for everyone however they like.
        If you are feeling generous you can send me a tip via my bitcoin address 35WK2GqZHPutywCdbHKa9BQ52GND3Pd6h4
    </li>
    <li><b>Stars/Reviews:</b>
        If you found this add-on useful leave some stars or a review so others have an  easier time finding it.
    </li>
    <li><b>Bugs, Suggestions or Requests:</b>
        If you have any issues (for example a site it does not work but you think it should) or have improvement suggestions or a feature request please open an issue at the Support Site
    </li>
</ol>


/**
* Implements hook_menu().
*/
function zs_ausgaben_menu() 
{
	var items = {};
	items['neu'] = 
	{
		title: 'Neu',
		page_callback: 'zs_ausgaben_neu_page'
	};
	items['alle'] = 
	{
		title: 'Ausgaben',
		page_callback: 'zs_ausgaben_alle_page'
	};
	items['downloads'] = 
	{
		title: 'Downloads',
		page_callback: 'zs_ausgaben_downloads_page'
	};
	items['datenschutz'] = 
	{
		title: 'Datenschutz',
		page_callback: 'zs_ausgaben_datenschutz_page'
	};
	items['impressum'] = 
	{
		title: 'Impressum',
		page_callback: 'zs_ausgaben_impressum_page'
	};
	items['ausgabe/%'] = 
	{
//	        'title': t('Node'),
//	        'page_callback': 'zs_ausgaben_page_view',
//	        'page_arguments': [1],
//	        'pageshow': 'zs_ausgaben_page_view_pageshow',
//	        'title_callback': 'zs_ausgaben_page_title',
//	        'title_arguments': [1]
//	
		title: 'Bergsteiger',
//		title_callback: 'zs_ausgaben_ausgabe_page_title',
//        title_arguments: [1],
		page_callback: 'zs_ausgaben_ausgabe_page',
		page_arguments: [1],
	};
	items['ausgabe/%/leseprobe'] = 
	{
		title: 'Bergsteiger',
		page_callback: 'zs_ausgaben_ausgabe_leseprobe_page',
		page_arguments: [1],
	};
	return items;
}

function zs_ausgaben_get_issues(options) 
{
	try 
	{
	    options.method = 'POST';
	    options.path = 'zs_mobile_service_resources/get_issues.json';
	    options.service = 'zs_mobile_service';
	    options.resource = 'get_issues';
	    Drupal.services.call(options);
	}
	catch (error) { console.log('zs_mobile_service_get_issues - ' + error); }
}	

function zs_ausgaben_get_issue(options) 
{
	try 
	{
	    options.method = 'POST';
	    options.path = 'zs_mobile_service_resources/get_issue.json';
	    options.service = 'zs_mobile_service';
	    options.resource = 'get_issue';
	    Drupal.services.call(options);
	}
	catch (error) { console.log('zs_mobile_service_get_issue - ' + error); }
}	

function zs_ausgaben_get_issue_index(options) 
{
	try 
	{
	    options.method = 'POST';
	    options.path = 'zs_mobile_service_resources/get_issue_index.json';
	    options.service = 'zs_mobile_service';
	    options.resource = 'get_issue_index';
	    Drupal.services.call(options);
	}
	catch (error) { console.log('zs_mobile_service_get_issue - ' + error); }
}	

/**
* The callback for the "Aktuelle Ausgabe" page.
*/
function zs_ausgaben_neu_page() 
{
	var args = {
		limit: 1
	};
	
	zs_ausgaben_get_issues(
	{
		data: JSON.stringify(args),
	    success: function(issues) 
	    {
	    	issues.forEach(function(issue) {
		    	var title = issue.web_headline;
		    	var artikelnr = issue.artikelnr;
		    	var auflageid = issue.auflage_id;
		    	var imgpath = 'http://bergsteiger.de/sites/bergsteiger.de/files/bilder/cover/' + artikelnr + '.jpg';
		    	
		    	$('.issue_img').attr('src', imgpath);
		    	$('.issue_img').attr('alt', title);
		    	$('.issue_img').attr('title', title);
		    	$('.issue_link').attr('onclick', "javascript:drupalgap_goto('ausgabe/" + auflageid + "')");
		    	
		    	$('.issue').fadeIn();	    	    
	    	    
	    	});
	    }
	});	
	
	var currentissue = '<div class="issue neu" style="display: none">' 
		+ '<div class="issue_img_wrap"><a class="issue_link" onclick="javascript:drupalgap_goto(\'alle\');"><img class="issue_img" src="#" alt="aktuelle Ausgabe" title="aktuelle Ausgabe" /></a></div>'
		+ '</div>';
	
	return currentissue;
}

/**
* The callback for the "Aktuelle Ausgabe" page.
*/
function zs_ausgaben_alle_page() 
{
	var args = {
		limit: 0
	};
	
	zs_ausgaben_get_issues(
	{
		data: JSON.stringify(args),
	    success: function(issues) 
	    {
	    	issues.forEach(function(issue) {
		    	var title = issue.web_headline;
		    	var artikelnr = issue.artikelnr;
		    	var auflageid = issue.auflage_id;
		    	var imgpath = 'http://bergsteiger.de/sites/bergsteiger.de/files/bilder/cover/' + artikelnr + '.jpg';
		    	
		    	var issuehtml = '<div class="issue">' 
		    		+ '<div class="issue_img_wrap"><a class="issue_link" onclick="javascript:drupalgap_goto(\'ausgabe/' + auflageid + '\');">'
		    		+ '<img class="issue_img" src="' + imgpath + '" alt="' + title + '" title="' + title + '" /></a></div>'
		    		+ '</div>';		
		    	
	    	    $('.issues_container').append(issuehtml);
	    	});

	    	$('.issues_container').fadeIn();	
	    }
	});	
	
	var currentissue = '<div class="issues_container alle" style="display: none">' 
		+ '</div>';
	
	return currentissue;
}

/**
* The callback for the "Ausgabe" Single page.
*/
function zs_ausgaben_ausgabe_page(ausgabe) 
{
	try {
	    if (ausgabe) 
	    {	
	    	var args = {
	    		auflageid: ausgabe
			};
	    	zs_ausgaben_get_issue({
			    data: JSON.stringify(args),
			    success: function(issue) {
			    	var title = issue.web_headline;
			    	var artikelnr = issue.artikelnr;
			    	var auflageid = issue.auflage_id;
			    	var imgpath = 'http://bergsteiger.de/sites/bergsteiger.de/files/bilder/cover/' + artikelnr + '.jpg';
			    	var issuedate = 'Ausgabe ' + issue.auflagename;
			    	
			    	$('.issue.single .issue_img').attr('src', imgpath);
			    	$('.issue.single .issue_img').attr('alt', title);
			    	$('.issue.single .issue_img').attr('title', title);			    	

			    	$('.issue.single .issue_head').text(title);
			    	$('.issue.single .issue_date').text(issuedate);
			    	$('.issue.single').fadeIn();
			    }
			});	   
	    	
	    	zs_ausgaben_get_issue_index({
			    data: JSON.stringify(args),
			    success: function(index) {
			    	console.log(index);

			    	index.forEach(function(ind) 
			    	{
			    		var title = ind.ititel;
			    		var body = '';
			    		var appstr = '';
			    		
			    		if (ind.irubrik.length > 0)
		    			{
			    			title = ind.irubrik + ": " + title;
		    			}
			    		
			    		if (ind.izeile.length > 0)
		    			{
			    			body = '<div class="index_body">'
				    				+ ind.izeile
				    			+ '</div>';
		    			}
			    		
			    		var appstr = '<div class="index_wrap">'
				    			+ '<div class="index_head">'
				    				+ title
				    			+ '</div>'
				    			+ body
		    				+ '</div>';
			    		
			    		$('.issue_desc_container').append(appstr);
			    	});
			    	

			    	$('.issue_desc_wrap').fadeIn();
			    }
			});	    	
	    	
	    	var issue = '<div class="issue single" style="display: none">' 
	    			+ '<div class="issue_top_left">'
	    				+ '<div class="issue_img_wrap"><img class="issue_img" src="#" alt="aktuelle Ausgabe" title="aktuelle Ausgabe" /></div>'
	    			+ '</div>' 
	    			+ '<div class="issue_top_right">'
			    		+ '<div class="issue_head"></div>'
			    		+ '<div class="issue_date"></div>'
//	    				+ l('DrupalGap', 'http://www.crusoemedia.com/kunden/test.pdf', { InAppBrowser:true })
//			    		+ '<a class="issue_link" onclick="javascript:drupalgap_goto(\'ausgabe/' + auflageid + '\');">'
//			    		+ '<a data-role="button" onclick=\'window.plugins.childBrowser.showWebPage(encodeURI("http://docs.google.com/viewer?url=http://www.crusoemedia.com/kunden/test.pdf"))\' data-theme="b">PDF child + google</a>'
//			    		+ bl('pdf google', 'https://docs.google.com/viewer?url=http://www.crusoemedia.com/kunden/test.pdf&embedded=true', { InAppBrowser: true })
//			    		+ '<a id="full1" data-role="button" onclick="window.plugins.childBrowser.showWebPage(\'http://www.crusoemedia.com/kunden/test.pdf\', { showLocationBar: false });" data-theme="b">PDF child</a>'
//			    		+ '<a id="full2" data-role="button" onclick="window.open(\'http://www.crusoemedia.com/kunden/test.pdf\', \'_system\', \'location=yes\')" data-theme="b">PDF system</a>'
			    		+ bl('Ausgabe kaufen', 'node/456')
			    		+ bl('Leseprobe öffnen', 'ausgabe/' + ausgabe + '/leseprobe')
//			    		+ bl('Leseprobe öffnen', 'pdfjs/web/viewer.html', { InAppBrowser: true })
//			    		+ bl('Leseprobe öffnen', 'https://docs.google.com/viewer?url=http://www.crusoemedia.com/kunden/test.pdf&embedded=true', { InAppBrowser: true })
//			    		+ bl('Leseprobe öffnen1', 'https://docs.google.com/viewer?url=http://www.crusoemedia.com/kunden/test.pdf&embedded=true')
	    			+ '</div>'
	    			+ '<div class="issue_desc_wrap" style="display: none">'
	    				+ '<div class="issue_desc_head">Beschreibung</div>'
	    				+ '<div class="issue_desc_container"></div>'
	    			+ '</div>'
	    		+ '</div>';
	    	
	    	return issue;
    	}
	    else { drupalgap_error(t('No ausgabe id provided!')); }
	}
	catch (error) { console.log('node_page_view - ' + error); }
}

/**
 * Implements hook_install().
 */
function zs_ausgaben_install() {
  try {
//	  var modulepath = drupalgap_get_path('module', 'zs_ausgaben');
//    var css =  modulepath + '/pdfjs/web/viewer.css';
//    drupalgap_add_css(css)
//
//    var js =  modulepath + '/pdfjs/web/compatibility.js';
//    drupalgap_add_js(js);
//    js =  modulepath + '/pdfjs/web/l10n.js';
//    drupalgap_add_js(js);
//    js =  modulepath + '/pdfjs/build/pdf.js';
//    drupalgap_add_js(js);
//    js =  modulepath + '/pdfjs/web/debugger.js';
//    drupalgap_add_js(js);
//    js =  modulepath + '/pdfjs/web/viewer.js';
//    drupalgap_add_js(js);
  }
  catch (error) { console.log('my_module_install - ' + error); }
}

/**
* The callback for the "Ausgabe" Single page.
*/
function zs_ausgaben_ausgabe_leseprobe_page(ausgabe) 
{
	try {
	    if (ausgabe) 
	    {	
	    	var frame = "<iframe src='app/modules/custom/zs_ausgaben/pdfjs/web/viewer.html' width='100%' scrolling='no' frameBorder='0' id='pdframe' onLoad='fixFrame();'></iframe>";
//	    	var fixJS = "<script>function fixFrame () {   if ((android) && (androidVersion > 3)) {    iFrameContentHeight = document.getElementById('pdframe').contentDocument.body.offsetHeight;      document.getElementById('pdframe').style.height = iFrameContentHeight + 'px';   }}</script>";
	    	var fixJS = "<script>function fixFrame () {   " +
//	    		"iFrameContentHeight = document.getElementById('pdframe').contentDocument.body.offsetHeight;" +
    		"iFrameContentHeight = $('.ausgabe___leseprobe.ui-page').height(); " +
//    		"iFrameContentHeight2 = $('.ausgabe___leseprobe.ui-page .ui-content ').height(); " +
    		"iFrameContentHeight = iFrameContentHeight - 88;" +
	    	"console.log(iFrameContentHeight);" +
	    	 
	    		"document.getElementById('pdframe').style.height = iFrameContentHeight + 'px';  " +
	    		" }</script>";
	    	frame = fixJS + frame;
	    	
	    	return frame;
	    	return '<iframe src="pdfjs/web/viewer.html" class="pdfview" width="100%" height="100%" style="width:100%; height:100%;" frameBorder="0">';
	    	
//	    	return '<div id="outerContainer"> <div id="sidebarContainer"> <div id="toolbarSidebar"> <div class="splitToolbarButton toggled"> <button id="viewThumbnail" class="toolbarButton group toggled" title="Show Thumbnails" tabindex="2" data-l10n-id="thumbs"> <span data-l10n-id="thumbs_label">Thumbnails</span> </button> <button id="viewOutline" class="toolbarButton group" title="Show Document Outline" tabindex="3" data-l10n-id="outline"> <span data-l10n-id="outline_label">Document Outline</span> </button> <button id="viewAttachments" class="toolbarButton group" title="Show Attachments" tabindex="4" data-l10n-id="attachments"> <span data-l10n-id="attachments_label">Attachments</span> </button> </div> </div> <div id="sidebarContent"> <div id="thumbnailView"> </div> <div id="outlineView" class="hidden"> </div> <div id="attachmentsView" class="hidden"> </div> </div> </div> <!-- sidebarContainer --> <div id="mainContainer"> <div class="findbar hidden doorHanger hiddenSmallView" id="findbar"> <label for="findInput" class="toolbarLabel" data-l10n-id="find_label">Find:</label> <input id="findInput" class="toolbarField" tabindex="91"> <div class="splitToolbarButton"> <button class="toolbarButton findPrevious" title="" id="findPrevious" tabindex="92" data-l10n-id="find_previous"> <span data-l10n-id="find_previous_label">Previous</span> </button> <div class="splitToolbarButtonSeparator"></div> <button class="toolbarButton findNext" title="" id="findNext" tabindex="93" data-l10n-id="find_next"> <span data-l10n-id="find_next_label">Next</span> </button> </div> <input type="checkbox" id="findHighlightAll" class="toolbarField"> <label for="findHighlightAll" class="toolbarLabel" tabindex="94" data-l10n-id="find_highlight">Highlight all</label> <input type="checkbox" id="findMatchCase" class="toolbarField"> <label for="findMatchCase" class="toolbarLabel" tabindex="95" data-l10n-id="find_match_case_label">Match case</label> <span id="findMsg" class="toolbarLabel"></span> </div> <!-- findbar --> <div id="secondaryToolbar" class="secondaryToolbar hidden doorHangerRight"> <div id="secondaryToolbarButtonContainer"> <button id="secondaryPresentationMode" class="secondaryToolbarButton presentationMode visibleLargeView" title="Switch to Presentation Mode" tabindex="51" data-l10n-id="presentation_mode"> <span data-l10n-id="presentation_mode_label">Presentation Mode</span> </button> <div class="horizontalToolbarSeparator visibleLargeView"></div> <button id="firstPage" class="secondaryToolbarButton firstPage" title="Go to First Page" tabindex="56" data-l10n-id="first_page"> <span data-l10n-id="first_page_label">Go to First Page</span> </button> <button id="lastPage" class="secondaryToolbarButton lastPage" title="Go to Last Page" tabindex="57" data-l10n-id="last_page"> <span data-l10n-id="last_page_label">Go to Last Page</span> </button> <div class="horizontalToolbarSeparator"></div> <button id="pageRotateCw" class="secondaryToolbarButton rotateCw" title="Rotate Clockwise" tabindex="58" data-l10n-id="page_rotate_cw"> <span data-l10n-id="page_rotate_cw_label">Rotate Clockwise</span> </button> <button id="pageRotateCcw" class="secondaryToolbarButton rotateCcw" title="Rotate Counterclockwise" tabindex="59" data-l10n-id="page_rotate_ccw"> <span data-l10n-id="page_rotate_ccw_label">Rotate Counterclockwise</span> </button> <div class="horizontalToolbarSeparator"></div> <button id="toggleHandTool" class="secondaryToolbarButton handTool" title="Enable hand tool" tabindex="60" data-l10n-id="hand_tool_enable"> <span data-l10n-id="hand_tool_enable_label">Enable hand tool</span> </button> <div class="horizontalToolbarSeparator"></div> <button id="documentProperties" class="secondaryToolbarButton documentProperties" title="Document Properties…" tabindex="61" data-l10n-id="document_properties"> <span data-l10n-id="document_properties_label">Document Properties…</span> </button> </div> </div> <!-- secondaryToolbar --> <div class="toolbar"> <div id="toolbarContainer"> <div id="toolbarViewer"> <div id="toolbarViewerLeft"> <button id="sidebarToggle" class="toolbarButton" title="Toggle Sidebar" tabindex="11" data-l10n-id="toggle_sidebar"> <span data-l10n-id="toggle_sidebar_label">Toggle Sidebar</span> </button> <div class="toolbarButtonSpacer"></div> <button id="viewFind" class="toolbarButton group hiddenSmallView" title="Find in Document" tabindex="12" data-l10n-id="findbar"> <span data-l10n-id="findbar_label">Find</span> </button> <div class="splitToolbarButton"> <button class="toolbarButton pageUp" title="Previous Page" id="previous" tabindex="13" data-l10n-id="previous"> <span data-l10n-id="previous_label">Previous</span> </button> <div class="splitToolbarButtonSeparator"></div> <button class="toolbarButton pageDown" title="Next Page" id="next" tabindex="14" data-l10n-id="next"> <span data-l10n-id="next_label">Next</span> </button> </div> <label id="pageNumberLabel" class="toolbarLabel" for="pageNumber" data-l10n-id="page_label">Page: </label> <input type="number" id="pageNumber" class="toolbarField pageNumber" value="1" size="4" min="1" tabindex="15"> <span id="numPages" class="toolbarLabel"></span> </div> <div id="toolbarViewerRight"> <button id="presentationMode" class="toolbarButton presentationMode hiddenLargeView" title="Switch to Presentation Mode" tabindex="31" data-l10n-id="presentation_mode"> <span data-l10n-id="presentation_mode_label">Presentation Mode</span> </button> <div class="verticalToolbarSeparator hiddenSmallView"></div> <button id="secondaryToolbarToggle" class="toolbarButton" title="Tools" tabindex="36" data-l10n-id="tools"> <span data-l10n-id="tools_label">Tools</span> </button> </div> <div class="outerCenter"> <div class="innerCenter" id="toolbarViewerMiddle"> <div class="splitToolbarButton"> <button id="zoomOut" class="toolbarButton zoomOut" title="Zoom Out" tabindex="21" data-l10n-id="zoom_out"> <span data-l10n-id="zoom_out_label">Zoom Out</span> </button> <div class="splitToolbarButtonSeparator"></div> <button id="zoomIn" class="toolbarButton zoomIn" title="Zoom In" tabindex="22" data-l10n-id="zoom_in"> <span data-l10n-id="zoom_in_label">Zoom In</span> </button> </div> <span id="scaleSelectContainer" class="dropdownToolbarButton"> <select id="scaleSelect" title="Zoom" tabindex="23" data-l10n-id="zoom"> <option id="pageAutoOption" title="" value="auto" selected="selected" data-l10n-id="page_scale_auto">Automatic Zoom</option> <option id="pageActualOption" title="" value="page-actual" data-l10n-id="page_scale_actual">Actual Size</option> <option id="pageFitOption" title="" value="page-fit" data-l10n-id="page_scale_fit">Fit Page</option> <option id="pageWidthOption" title="" value="page-width" data-l10n-id="page_scale_width">Full Width</option> <option id="customScaleOption" title="" value="custom"></option> <option title="" value="0.5" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 50 }\'>50%</option> <option title="" value="0.75" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 75 }\'>75%</option> <option title="" value="1" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 100 }\'>100%</option> <option title="" value="1.25" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 125 }\'>125%</option> <option title="" value="1.5" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 150 }\'>150%</option> <option title="" value="2" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 200 }\'>200%</option> <option title="" value="3" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 300 }\'>300%</option> <option title="" value="4" data-l10n-id="page_scale_percent" data-l10n-args=\'{ "scale": 400 }\'>400%</option> </select> </span> </div> </div> </div> <div id="loadingBar"> <div class="progress"> <div class="glimmer"> </div> </div> </div> </div> </div> <menu type="context" id="viewerContextMenu"> <menuitem id="contextFirstPage" label="First Page" data-l10n-id="first_page"></menuitem> <menuitem id="contextLastPage" label="Last Page" data-l10n-id="last_page"></menuitem> <menuitem id="contextPageRotateCw" label="Rotate Clockwise" data-l10n-id="page_rotate_cw"></menuitem> <menuitem id="contextPageRotateCcw" label="Rotate Counter-Clockwise" data-l10n-id="page_rotate_ccw"></menuitem> </menu> <div id="viewerContainer" tabindex="0"> <div id="viewer" class="pdfViewer"></div> </div> <div id="errorWrapper" hidden=\'true\'> <div id="errorMessageLeft"> <span id="errorMessage"></span> <button id="errorShowMore" data-l10n-id="error_more_info"> More Information </button> <button id="errorShowLess" data-l10n-id="error_less_info" hidden=\'true\'> Less Information </button> </div> <div id="errorMessageRight"> <button id="errorClose" data-l10n-id="error_close"> Close </button> </div> <div class="clearBoth"></div> <textarea id="errorMoreInfo" hidden=\'true\' readonly="readonly"></textarea> </div> </div> <!-- mainContainer --> <div id="overlayContainer" class="hidden"> <div id="passwordOverlay" class="container hidden"> <div class="dialog"> <div class="row"> <p id="passwordText" data-l10n-id="password_label">Enter the password to open this PDF file:</p> </div> <div class="row"> <input type="password" id="password" class="toolbarField" /> </div> <div class="buttonRow"> <button id="passwordCancel" class="overlayButton"><span data-l10n-id="password_cancel">Cancel</span></button> <button id="passwordSubmit" class="overlayButton"><span data-l10n-id="password_ok">OK</span></button> </div> </div> </div> <div id="documentPropertiesOverlay" class="container hidden"> <div class="dialog"> <div class="row"> <span data-l10n-id="document_properties_file_name">File name:</span> <p id="fileNameField">-</p> </div> <div class="row"> <span data-l10n-id="document_properties_file_size">File size:</span> <p id="fileSizeField">-</p> </div> <div class="separator"></div> <div class="row"> <span data-l10n-id="document_properties_title">Title:</span> <p id="titleField">-</p> </div> <div class="row"> <span data-l10n-id="document_properties_author">Author:</span> <p id="authorField">-</p> </div> <div class="row"> <span data-l10n-id="document_properties_subject">Subject:</span> <p id="subjectField">-</p> </div> <div class="row"> <span data-l10n-id="document_properties_keywords">Keywords:</span> <p id="keywordsField">-</p> </div> <div class="row"> <span data-l10n-id="document_properties_creation_date">Creation Date:</span> <p id="creationDateField">-</p> </div> <div class="row"> <span data-l10n-id="document_properties_modification_date">Modification Date:</span> <p id="modificationDateField">-</p> </div> <div class="row"> <span data-l10n-id="document_properties_creator">Creator:</span> <p id="creatorField">-</p> </div> <div class="separator"></div> <div class="row"> <span data-l10n-id="document_properties_producer">PDF Producer:</span> <p id="producerField">-</p> </div> <div class="row"> <span data-l10n-id="document_properties_version">PDF Version:</span> <p id="versionField">-</p> </div> <div class="row"> <span data-l10n-id="document_properties_page_count">Page Count:</span> <p id="pageCountField">-</p> </div> <div class="buttonRow"> <button id="documentPropertiesClose" class="overlayButton"><span data-l10n-id="document_properties_close">Close</span></button> </div> </div> </div> </div> <!-- overlayContainer --> </div> <!-- outerContainer --> <div id="printContainer"></div> <div id="mozPrintCallback-shim" hidden> <style> @media print { #printContainer div { page-break-after: always; page-break-inside: avoid; } } </style> <style scoped> #mozPrintCallback-shim { position: fixed; top: 0; left: 0; height: 100%; width: 100%; z-index: 9999999; display: block; text-align: center; background-color: rgba(0, 0, 0, 0.5); } #mozPrintCallback-shim[hidden] { display: none; } @media print { #mozPrintCallback-shim { display: none; } } #mozPrintCallback-shim .mozPrintCallback-dialog-box { display: inline-block; margin: -50px auto 0; position: relative; top: 45%; left: 0; min-width: 220px; max-width: 400px; padding: 9px; border: 1px solid hsla(0, 0%, 0%, .5); border-radius: 2px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3); background-color: #474747; color: hsl(0, 0%, 85%); font-size: 16px; line-height: 20px; } #mozPrintCallback-shim .progress-row { clear: both; padding: 1em 0; } #mozPrintCallback-shim progress { width: 100%; } #mozPrintCallback-shim .relative-progress { clear: both; float: right; } #mozPrintCallback-shim .progress-actions { clear: both; } </style> <div class="mozPrintCallback-dialog-box"> <!-- TODO: Localise the following strings --> Preparing document for printing... <div class="progress-row"> <progress value="0" max="100"></progress> <span class="relative-progress">0%</span> </div> <div class="progress-actions"> <input type="button" value="Cancel" class="mozPrintCallback-cancel"> </div> </div> </div>';
	    	
    	}
	    else { drupalgap_error(t('No ausgabe id provided!')); }
	}
	catch (error) { console.log('leseprobe - ' + error); }
}

/**
* The callback for the "Downloads" page.
*/
function zs_ausgaben_downloads_page() 
{
	var content = {};

	content['downloads'] = 
	{
		markup: 'no downloads'
	};
	
	return content;
}

/**
* The callback for the "Datenschutz" page.
*/
function zs_ausgaben_datenschutz_page() 
{
	return "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,"
	+ "<br><br>sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem"
	+ " ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore"
	+ " magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata"
	+ " sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
	+ " labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,"
	+ " no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie"
	+ " consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum"
	+ " zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy"
	+ " nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper"
	+ " suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse"
	+ " molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent"
	+ " luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil"
	+ " imperdiet doming id quod mazim placerat facer";
}

/**
* The callback for the "Impressum" page.
*/
function zs_ausgaben_impressum_page() 
{
	return "impressum";
}






//function zs_ausgaben_ausgabe_page_title(callback, ausgabe) {
//	try {
//		if (ausgabe) 
//	    {	
//	    	var args = {
//	    		auflageid: ausgabe
//			};
//	    	zs_ausgaben_get_issue({
//			    data: JSON.stringify(args),
//			    success: function(issue) {
//			    	
//			    	var title = issue.web_headline;
//			    	callback.call(null, title);
//			    }
//			});	    	
//  	}
//	    else { drupalgap_error(t('No ausgabe id provided!')); }
//	}
//	catch (error) { console.log('node_page_title - ' + error); }
//}



//
//function zs_ausgaben_page_view(nid) {
//	  try {
//	    if (nid) {
//	      var content = "test"
//	      return content;
//	    }
//	    else { drupalgap_error(t('No node id provided!')); }
//	  }
//	  catch (error) { console.log('node_page_view - ' + error); }
//	}
//
//
///**
// * jQM pageshow handler for node/% pages.
// * @param {Number} nid
// */
//function zs_ausgaben_page_view_pageshow(nid) {
//  try {
//	  return "testsss";
//  }
//  catch (error) { console.log('node_page_view_pageshow - ' + error); }
//}



//
//
//
///**
// * Implements hook_block_info().
// */
//function zs_ausgaben_block_info() {
//  try {
//    var blocks = {};
//    blocks['zs_ausgaben_block'] = {
//      delta: 'zs_ausgaben_block',
//      module: 'zs_ausgaben'
//    };
//    return blocks;
//  }
//  catch (error) { console.log('zs_ausgaben_block_info - ' + error); }
//}
//
///**
// * Implements hook_block_view().
// */
//function zs_ausgaben_block_view(delta, region) {
//  try {
//    var content = '';
//    if (delta == 'zs_ausgaben_block') {
//      // Show today's date for the block's content.
//      var d = new Date();
//      content = '<h2><center>' + d.toDateString() + '</center></h2>';
//    }
//    return content;
//  }
//  catch (error) { console.log('zs_ausgaben_block_view - ' + error); }
//}
/**
* Implements hook_menu().
*/
function zs_ausgaben_menu() 
{
	var items = {};
	items['neu'] = 
	{
		title: 'NEU',
		page_callback: 'zs_ausgaben_neu_page'
	};
	items['alle'] = 
	{
		title: 'Alle Ausgaben',
		page_callback: 'zs_ausgaben_alle_page'
	};
	items['downloads'] = 
	{
		title: 'Meine Downloads',
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
	
	var currentissue = '<div class="issue" style="display: none">' 
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
	
	var currentissue = '<div class="issues_container" style="display: none">' 
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
			    	console.log(issue);
			    	
			    	var title = issue.web_headline;
			    	var artikelnr = issue.artikelnr;
			    	var auflageid = issue.auflage_id;
			    	var imgpath = 'http://bergsteiger.de/sites/bergsteiger.de/files/bilder/cover/' + artikelnr + '.jpg';
			    	var issuedate = 'Ausgabe ' + issue.auflagename;
			    	
			    	$('.issue_img').attr('src', imgpath);
			    	$('.issue_img').attr('alt', title);
			    	$('.issue_img').attr('title', title);			    	

			    	$('.issue_head').text(title);
			    	$('.issue_date').text(issuedate);
			    	$('.issue').fadeIn();
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
	    	
	    	var issue = '<div class="issue" style="display: none">' 
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
//			    		+ bl('Leseprobe öffnen', 'ausgabe/' + ausgabe + '/leseprobe')
			    		+ bl('Leseprobe öffnen', 'pdfjs/web/viewer.html', { InAppBrowser: true })
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
* The callback for the "Ausgabe" Single page.
*/
function zs_ausgaben_ausgabe_leseprobe_page(ausgabe) 
{
	try {
	    if (ausgabe) 
	    {	
	    	
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
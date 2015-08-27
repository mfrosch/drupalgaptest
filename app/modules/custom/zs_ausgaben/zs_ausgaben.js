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
		title: 'Ausgabe',
		page_callback: 'zs_ausgaben_ausgabe_page',
		page_arguments: [1],
	};
	return items;
}

function zs_ausgaben_get_current_issue(options) 
{
	try 
	{
	    options.method = 'POST';
	    options.path = 'zs_mobile_service_resources/get_current_issue.json';
	    options.service = 'zs_mobile_service';
	    options.resource = 'get_current_issue';
	    Drupal.services.call(options);
	}
	catch (error) { console.log('zs_mobile_service_get_current_issue - ' + error); }
}	

/**
* The callback for the "Aktuelle Ausgabe" page.
*/
function zs_ausgaben_neu_page() 
{
	var content = {};
	
	zs_ausgaben_get_current_issue(
	{
	    success: function(issue) 
	    {
	    	var title = issue.web_headline;
	    	var id = issue.artikelnr;
	    	var imgpath = 'http://bergsteiger.de/sites/bergsteiger.de/files/bilder/cover/' + id + '.jpg';
	    	
	    	$('.issue_img').attr('src', imgpath);
	    	$('.issue_img').attr('alt', title);
	    	$('.issue_img').attr('title', title);
	    	$('.issue_link').attr('onclick', "javascript:drupalgap_goto('ausgabe/" + id + "')");
	    }
	});	
	
	var currentissue = '<div class="current_issue">' 
		+ '<div class="issue_img_wrap"><a class="issue_link" onclick="javascript:drupalgap_goto(\'alle\');"><img class="issue_img" src="#" alt="aktuelle Ausgabe" title="aktuelle Ausgabe" /></a></div>'
		+ '</div>';
	
	content['ausgabe_img'] = 
	{
		markup: currentissue
	};
	
	return content;
}


/**
* The callback for the "Aktuelle Ausgabe" page.
*/
function zs_ausgaben_alle_page() 
{
	var content = {};
	
	zs_ausgaben_get_current_issue(
	{
	    success: function(issue) 
	    {
	    	var title = issue.web_headline;
	    	var imgpath = 'http://bergsteiger.de/sites/bergsteiger.de/files/bilder/cover/' + issue.artikelnr + '.jpg';
	    	
//	    	$('.issue_head').text(title);
	    	$('.issue_img').attr('src', imgpath);
	    	$('.issue_img').attr('alt', title);
	    	$('.issue_img').attr('title', title);
	    }
	});	
	
	var currentissue = '<div class="current_issue">' 
//		+ '<div class="issue_head"></div>' 
		+ '<div class="issue_img_wrap"><img class="issue_img" src="#" alt="aktuelle Ausgabe" title="aktuelle Ausgabe" /></div>'
		+ '</div>';
	
	content['ausgabe_img'] = 
	{
		markup: currentissue
	};
	
	console.log(content);
	
	return content;
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

/**
* The callback for the "Ausgabe" Single page.
*/
function zs_ausgaben_ausgabe_page(ausgabe) 
{
	try {
	    if (ausgabe) {
	    	var content = "test"
	    	return content;
    	}
	    else { drupalgap_error(t('No ausgabe id provided!')); }
	}
	catch (error) { console.log('node_page_view - ' + error); }
}

















//
///**
// * The title call back function for the node view page.
// * @param {Function} callback
// * @param {Number} nid
// */
//function zs_ausgaben_page_title(callback, nid) {
//  try {
//    // Try to load the node title, then send it back to the given callback.
//    var title = 'testtitle';
//    callback.call(null, title);
//  }
//  catch (error) { console.log('node_page_title - ' + error); }
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
/**
* Implements hook_menu().
*/
function zs_ausgaben_menu() 
{
	var items = {};
	items['aktuell'] = 
	{
		title: 'Aktuelle Ausgabe',
		page_callback: 'zs_ausgaben_aktuell_page'
	};
	return items;
}

function zs_ausgaben_get_user_count(options) 
{
	try 
	{
	    options.method = 'POST';
	    options.path = 'zs_mobile_service_resources/get_user_count.json';
	    options.service = 'zs_mobile_service';
	    options.resource = 'get_user_count';
	    Drupal.services.call(options);
	}
	catch (error) { console.log('zs_mobile_service_get_user_count - ' + error); }
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
function zs_ausgaben_aktuell_page() 
{
	var content = {};
	
	zs_ausgaben_get_current_issue(
	{
	    success: function(issue) 
	    {
	    	$('.issue_head').text(issue.web_headline);
	    }
	});	
	
	var currentissue = '<div class="current_issue">' 
	+ '<div class="issue_head"></div>'
	+ '</div>';
	content['ausgabe_img'] = 
	{
		markup: currentissue
	};
	
	console.log(content);
	
	return content;
}













/**
 * Implements hook_block_info().
 */
function zs_ausgaben_block_info() {
  try {
    var blocks = {};
    blocks['zs_ausgaben_block'] = {
      delta: 'zs_ausgaben_block',
      module: 'zs_ausgaben'
    };
    return blocks;
  }
  catch (error) { console.log('zs_ausgaben_block_info - ' + error); }
}

/**
 * Implements hook_block_view().
 */
function zs_ausgaben_block_view(delta, region) {
  try {
    var content = '';
    if (delta == 'zs_ausgaben_block') {
      // Show today's date for the block's content.
      var d = new Date();
      content = '<h2><center>' + d.toDateString() + '</center></h2>';
    }
    return content;
  }
  catch (error) { console.log('zs_ausgaben_block_view - ' + error); }
}
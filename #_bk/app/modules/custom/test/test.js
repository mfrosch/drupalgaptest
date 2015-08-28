/**
* Implements hook_menu().
*/
function test_menu() {
  var items = {};
  items['hello_world'] = {
    title: 'DrupalGap',
    page_callback: 'test_hello_world_page'
  };
  return items;
}

/**
* The callback for the "Hello World" page.
*/
function test_hello_world_page() {
	
//	$min = db_query("SELECT max(zeitschrift_artikelnr) as artnr FROM {zs_einzelheft} WHERE  zeitschrift_zsid = :zsid", array('zsid' => variable_get("zeitschrift_id",0))->fetchObject();
//	watchdog('debug $min', '<pre>'. print_r($min, TRUE) .'</pre>');
//	dpm($min);
//	console.log($min);
	
  var content = {};
  content['my_button'] = {
    theme: 'button',
    text: 'Hello World',
    attributes: {
      onclick: "drupalgap_alert('Hi!')"
    }
  };
  return content;
}
/**
 * Implements DrupalGap's template_info() hook.
 */
function easystreet3adapt_info() {
  try {
    var theme = {
      name: 'easystreet3adapt',
      regions: {
        header: {
          attributes: {
            'data-role': 'header',
            'data-theme': 'b',
            'data-position': 'fixed'
          }
        },
        sub_header: {
          attributes: {
            'data-role': 'header'
          }
        },
        navigation: {
          attributes: {
            'data-role': 'navbar'
          }
        },
        content: {
          attributes: {
            'class': 'ui-content',
            'role': 'main'
          }
        }
      }
    };
    return theme;
  }
  catch (error) { drupalgap_error(error); }
}



var setClickoverHandlers = function(id) {
  $( "#new_collab" + id ).submit(function( event ) {
      event.preventDefault(); // prevent page reload

      var input = $('#new_collab_input' + id);
      var new_collab = $(input).val();
      var new_collab_html = "<span class='folder-link'>" +
                               new_collab +
                            "</span>";

      $('#collab' + id).append(new_collab_html); // add new user to list of users
      input.val(''); // clear value of input field
  });
}

var get_acl_content = function(id) {
  var new_collab_form = "<form id='new_collab" + id + "'>" +
                          "<input type='text' class='new_collab' id='new_collab_input" + id +
                            "' placeholder='Add user' autofocus='autofocus'>" +
                        "</form>";
  var current_collabs = "<span class='collaborators' id = 'collab" + id + "'></span>";
  return new_collab_form + current_collabs;
}

  i = 0;
    var acl = $('#acl' + i);
    acl.clickover({
      html: true,
      global_close: true,
      esc_close: true,
      placement: 'bottom',
      content: get_acl_content(i),
      onShown: function() {setClickoverHandlers($(this)[0]['$element'][0]['id'].replace( /^\D+/g, ''))}
    });

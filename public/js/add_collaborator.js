var setClickoverHandlers = function(id) {
  $( "#new_collab" + id ).submit(function( event ) {
      event.preventDefault(); // prevent page reload

      var input = $('#new_collab_input' + id);
      var new_collab = $(input).val();
      var cur_collabs = $('#collab' + id);

      // TODO: get name of username automatically
      if (new_collab == 'leila') {
        new_collab = 'Leila Chan Currie';
      } else if (new_collab == 'alex') {
        new_collab = 'Alexander Biggs';
      } else if (new_collab == 'yana') {
        new_collab = 'Yana Davis';
      }
      var new_collab_html = "<span class='folder-link'>" +
                               new_collab +
                            "</span>";

      if (cur_collabs.html().indexOf('No collaborators') == -1) {
        cur_collabs.append(new_collab_html); // add new user to list of users
      } else {
        cur_collabs.html(new_collab_html); // add new user to list of users
      }
      input.val(''); // clear value of input field
  });
};

var get_collaborators = function() {
  // TODO: return the current collaborators for a given folder
  return "<span class='folder-link'>No collaborators</span>";
};

var get_acl_content = function(id) {
  var new_collab_form = "<form id='new_collab" + id + "'>" +
                          "<input type='text' class='new_folder' id='new_collab_input" + id +
                            "' placeholder='Add collaborator' autofocus='autofocus'>" +
                        "</form>";
  var current_collabs = "<span class='collaborators' id = 'collab" + id + "'>" + 
                          get_collaborators() +
                        "</span>";
  return new_collab_form + current_collabs;
}

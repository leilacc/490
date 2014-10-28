var path = $(location).attr('pathname');
switch(path) {
    case '/search':
        break;
    case '/cases':
        $('#cases').css("color", "#15967d");
        break;
}

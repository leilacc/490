var path = $(location).attr('pathname');
switch(path) {
    case '/search':
        $('#search').css("color", "#15967d");
        break;
    case '/cases':
        $('#cases').css("color", "#15967d");
        break;
    case '/history':
        $('#history').css("color", "#15967d");
        break;
}

function highlightSelection()  {
  var selection;

  //Get the selected stuff
  if(window.getSelection) 
    selection = window.getSelection();
  else if(typeof document.selection!="undefined")
    selection = document.selection;

  if (!selection)
      return;

  //Get a the selected content, in a range object
  var range = selection.getRangeAt(0);

  //If the range spans some text, and inside a tag, set its css class.
  if(range && !selection.isCollapsed)
  {
    if(selection.anchorNode.parentNode == selection.focusNode.parentNode)
    {
      var span = document.createElement('span');
      span.className = 'highlight-green';
      range.surroundContents(span);
    }
  }
}

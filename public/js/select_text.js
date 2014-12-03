
function highlightSelection(element, startOffset, endOffset)  {
  var selection;

  //Get the selected stuff
  if(window.getSelection) 
    selection = window.getSelection();
  else if(typeof document.selection!="undefined")
    selection = document.selection;

  var range;
  if (element !== undefined) {
      range = document.createRange();
      range.setStart(element, startOffset);
      range.setEnd(element, endOffset);
  } else if (selection) {
      //Get the selected content, in a range object
      var range = selection.getRangeAt(0);
  } else {
      return;
  }

  //If the range spans some text, and inside a tag, set its css class.
  // if(range && !selection.isCollapsed)
  // {
    var selectionText;
    if (!element) {
      selectionText = selection.toString();
    }
    if(range && (element || (!selection.isCollapsed && selection.anchorNode.parentNode == selection.focusNode.parentNode)))
    {
      var span = document.createElement('span');
      span.className = 'highlight-green';
      range.surroundContents(span);

      // if an element is specified, we just want to highlight the text.
      // Otherwise we want to cache the highlight.
      if (!element) {
          if (!store.get('highlights'))
              store.set('highlights', [selectionText]);
          else
              store.set('highlights', store.get('highlights').concat([selectionText]));
      }
    }
  // }  
}

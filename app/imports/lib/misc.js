export const autoParagraph = (text, classNames) => {
  if (text) {
    return {
      __html: '<p class="' + classNames + '">' + text.split( /\n+/ ).join( '</p>\n<p class="' + classNames + '">' ) + '</p>',
    }
  }
}

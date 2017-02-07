export const autoParagraph = (text, classNames) => {
  if (text) {
    return '<p class="' + classNames + '">' + text.split( /\n+/ ).join( '</p>\n<p class="' + classNames + '">' ) + '</p>';
  }
}

export const autoParagraphHtml = (text, classNames) => {
  if (text) {
    return {
      __html: autoParagraph(text),
    }
  }
}

export const linkHashtags = (text) => {
  if (text) {
    return text.replace(/#(\w+)/g, '<a class="link-hashtag" href="/hashtag/$1">$&</a>');
  }
}

export const linkHashtagsHtml = (text) => {
  if (text) {
    return {
      __html: linkHashtags(text),
    }
  }
}
import React, { Component } from 'react';

import { autoParagraph, linkHashtagsHtml } from '/imports/lib/text.js';

export const Caption = ({caption}) => {
  if (caption === null || caption === undefined || caption === 'undefined') {
    return null;
  }

  caption = autoParagraph(caption, 'caption font-bold margin-bottom-tiny');
  caption = linkHashtagsHtml(caption);

  return (
    <div className='grid-row post-caption'>
      <div className='grid-item item-s-12' dangerouslySetInnerHTML={caption} ></div>
    </div>
  );
};

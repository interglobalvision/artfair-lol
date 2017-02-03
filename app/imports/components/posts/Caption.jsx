import React, { Component } from 'react';

import { autoParagraph } from '/imports/lib/misc.js';

export const Caption = ({caption}) => {
  if (caption === null) {
    return null;
  }

  return (
    <div className='grid-row post-caption'>
      <div className='grid-item item-s-12' dangerouslySetInnerHTML={autoParagraph(caption, 'caption margin-bottom-tiny')} ></div>
    </div>
  );
};

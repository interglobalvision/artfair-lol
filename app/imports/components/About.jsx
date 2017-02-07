import React, { Component } from 'react';

export const About = () => (
  <div id="about">
    <div className="container padding-top-small padding-bottom-small">
      <div className="grid-row">
        <div className="grid-item item-s-12 item-m-8 font-serif font-size-mid">
          <p>Artfair.lol is an anonymous photogram that allows only contributions made on-site at art fairs.</p>
          <p>This beta is for Material Art Fair and Zona Maco 2017.</p>
          <p>Made by <a href="http://interglobal.vision">interglobal.vision</a> in Mexico City.</p>
        </div>
        <div className="grid-item item-s-12 margin-top-small">
          <a href="http://i-d.vice.com/es_mx" target="_blank" rel="noopener noreferrer"><img src="/icons/i-d-logo-white.svg" className="logo u-inline-block" /></a>
          <a href="http://interglobal.vision" target="_blank" rel="noopener noreferrer"><img src="/icons/globie-logo-white.svg" className="logo u-inline-block" /></a>
        </div>
      </div>
    </div>
  </div>
);

import React, { Component } from 'react';

export const Footer = () => (
  <footer id="footer" className="padding-top-small padding-bottom-small line-height-tighter">
    <div className="container">
      <div className="grid-row loader align-items-center text-align-center justify-between">
        <div className="grid-item item-s-2 item-m-1">
          <img src="/icons/i-d-logo-black.svg" className="logo" />
        </div>
        <div className="grid-item item-s-2 item-m-1 font-size-zero">
          <img id="spinner" src="/icons/globie-spinner.svg" className="logo spin" />
        </div>
      </div>
    </div>
  </footer>
);

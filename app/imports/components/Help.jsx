import React, { Component } from 'react';

export const Help = () => (
  <div id="help">
    <div className="container padding-bottom-basic padding-top-small">
      <div className="grid-row">
        <div className="grid-item item-s-12">
          <h2 className="font-size-large margin-bottom-tiny font-bold border-bottom-grey">Help</h2>
          <h3 className="font-size-mid margin-bottom-micro">Enable Your Location</h3>
          <div className="margin-bottom-tiny">
            <h4 className="font-bold">iOS</h4>
            <ol className="list-decimal">
              <li>Open Settings</li>
              <li>Go to <strong>Privacy</strong> > <strong>Location Services</strong></li>
              <li>Toggle <strong>Location Services</strong> on</li>
              <li>Scroll down and select your browser (Safari, Chrome, etc.)</li>
              <li>Select <strong>While Using the App</strong></li>
            </ol>
          </div>
          <div className="margin-bottom-tiny">
            <h4 className="font-bold">Android</h4>
            <ol className="list-decimal">
              <li>Open Settings</li>
              <li>Go to <strong>Location</strong></li>
              <li>Toggle location <strong>On</strong></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
);

import React from 'react';

import { Header } from '/imports/components/base/Header.jsx';
import { Footer } from '/imports/components/base/Footer.jsx';

export const MainLayout = ({ content }) => (
  <div id="main-container">
    <Header />
    <div id="main-content">
      <div className="container">
        {content}
      </div>
    </div>
    <Footer />
  </div>
);

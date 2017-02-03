import React from 'react';

import { About } from '/imports/components/About.jsx';
import { Header } from '/imports/components/base/Header.jsx';
// import { Footer } from '/imports/components/footer.jsx';

export const MainLayout = ({ content }) => (
  <div id="main-container">
    <About />
    <Header />
    <div id="main-content">
      <div className="container">
        {content}
      </div>
    </div>
    { /* <Footer /> */}
  </div>
);

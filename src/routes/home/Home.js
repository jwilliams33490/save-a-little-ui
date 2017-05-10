/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

function Home({ news }) {
  return (
    <div className={s.root}>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"></link>
{/*<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.30.1/react.min.js"></script>*/}
{/*<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.30.1/react-dom.min.js"></script>*/}
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.30.1/react-bootstrap.min.js"></script>
      <div className={s.container}>
        <h1 className={s.title}>React.js News</h1>
        <ul className={s.news}>
          {news.map((item, index) => (
            <li key={index} className={s.newsItem}>
              <a href={item.link} className={s.newsTitle}>{item.title}</a>
              <span
                className={s.newsDesc}
                dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};

export default withStyles(Home, s);

import * as React from 'react';
import './HomeView.scss';
const DuckImage = require('../assets/Duck.jpg');

export class HomeView extends React.Component<any, {}> {

  render() {
    return (
      <div>
        <h4>Welcome!</h4>
        <img
          alt='This is a duck, because Redux!'
          className='duck'
          src={DuckImage} />
      </div>
    );
  }
}

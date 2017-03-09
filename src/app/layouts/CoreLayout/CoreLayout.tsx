import * as React from 'react';
import { Header } from '../../components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import '../../styles/core.scss';

export class CoreLayout extends React.Component<{ children: any }, {}> {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  };

  render() {
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <Header />
        <div className='core-layout__viewport' style={{ margin: '48px 72px' }}>
          {this.props.children}
        </div>
      </div>
    </MuiThemeProvider>;
  }
}

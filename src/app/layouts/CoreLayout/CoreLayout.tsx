import * as React from 'react';
import { Header } from '../../components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import '../../styles/core.scss';

export class CoreLayout extends React.Component<{}, { dark: boolean }> {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  };
  constructor(props: {}, ctx: any) {
    super(props, ctx);

    this.state = { dark: false };
  }

  toggleTheme = () => {
    this.setState({ dark: !this.state.dark });
  }

  render() {
    return <MuiThemeProvider muiTheme={getMuiTheme(this.state.dark ? darkBaseTheme : lightBaseTheme)}>
      <div>
        <Header />
        <div className='core-layout__viewport' style={{ margin: '48px 72px' }}>
          {this.props.children}
        </div>
        <RaisedButton onTouchTap={() => this.toggleTheme()}>Toggle theme</RaisedButton>
      </div>
    </MuiThemeProvider>;
  }
}

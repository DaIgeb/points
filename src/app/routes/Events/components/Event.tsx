import * as React from 'react';
import { TEventsState } from '../modules/types';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export class Event extends React.Component<TEventsState & { push: (args: string) => void, params: { id: string } }, {}> {
  static propTypes = {
    events: React.PropTypes.array.isRequired,
    loadEvents: React.PropTypes.func.isRequired
  };

  render() {
    const props = this.props;
    const event = props.events.find(e => e._id === parseInt(props.params.id, 10));
    if (!event) {
      return <div style={{ margin: '0 auto' }} >
        <Toolbar>
          <ToolbarGroup>Unbekanntes Event</ToolbarGroup>
          <ToolbarGroup>X</ToolbarGroup>
        </Toolbar>
      </div>;
    }

    // <AppBar title={event.name} onTitleTouchTap={() => browserHistory.push(`/events`)}/>
    return <div style={{ margin: '0 auto' }} >
      <Toolbar>
        <ToolbarGroup><ToolbarTitle text={event.name} /></ToolbarGroup>
        <ToolbarGroup><IconButton onTouchTap={() => props.push(`/events`)}><NavigationClose /></IconButton ></ToolbarGroup>
      </Toolbar>

      <div style={{ margin: '48px 72px' }} >
        {event.date.toDateString()}
        <DatePicker name='Date' value={event.date} />
      </div>
    </div>;
  }
}

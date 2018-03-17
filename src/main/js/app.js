'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ConstructionObject from './ConstructionObject'
import Dictionaries from './Dictionaries'
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'constrObj',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <MuiThemeProvider>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Объект" value="constrObj">
                        <ConstructionObject/>
                    </Tab>
                    <Tab label="Словари" value="dicts">
                        <Dictionaries/>
                    </Tab>
                </Tabs>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);
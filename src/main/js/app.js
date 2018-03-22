'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ConstructionObject from './ConstructionObject'
import Dictionaries from './Dictionaries'
import {Tabs, Tab} from 'material-ui/Tabs';
import $ from 'jquery';

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
            allOrganizations: [],
            customers: [],
            developers: [],
            executors: [],
            allEmployees: [],
            authors: [],
            customerRepresentatives: [],
            developerRepresentatives: [],
            executorRepresentatives: [],
            otherRepresentatives: [],
        };

        this.loadOrganizations = this.loadOrganizations.bind(this);
        this.loadEmployees = this.loadEmployees.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadOrganizations();
        this.loadEmployees();
    }

    loadOrganizations() {
        const self = this;
        $.ajax({
            url: "/rest/AllOrganizations"
        }).then(function (data) {
            self.setState({
                allOrganizations: data,
                customers: data,
                developers: data,
                executors: data
            });
        });
    }

    loadEmployees() {
        const self = this;
        $.ajax({
            url: "/rest/AllEmployees"
        }).then(function (data) {
            self.setState({
                allEmployees: data,
                authors: data,
                customerRepresentatives: data,
                developerRepresentatives: data,
                executorRepresentatives: data,
                otherRepresentatives: data,
            });
        });
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
                        <ConstructionObject
                            customers={this.state.customers}
                            developers={this.state.developers}
                            executors={this.state.executors}
                            authors={this.state.authors}
                            customerRepresentatives={this.state.customerRepresentatives}
                            developerRepresentatives={this.state.developerRepresentatives}
                            executorRepresentatives={this.state.executorRepresentatives}
                            otherRepresentatives={this.state.otherRepresentatives}
                        />
                    </Tab>
                    <Tab label="Словари" value="dicts">
                        <Dictionaries
                            allOrganizations={this.state.allOrganizations}
                            allEmployees={this.state.allEmployees}
                        />
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
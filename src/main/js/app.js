'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
import SplitPane from 'react-split-pane/lib/SplitPane';
import $ from 'jquery';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectConstructionObject from './components/SelectConstructionObject'
import ConstrObjectDlg from './components/itemDialogs/ConstrObjectDlg'
import ConstrObjBasicInfo from './components/ConstrObjBasicInfo'
import ConstrObjPartitionList from './components/ConstrObjPartitionList'
import ListItemData from './components/ListItemData'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constrObjs: [],
            selectedConstrObjId: null,
            selectedConstrObj: {},
            typeListItem: null,
            idListItem: null,
            selectedItem: null,
            customers: [],
            developers: []
        };

        this.loadConstrObjsFromServer = this.loadConstrObjsFromServer.bind(this);
        this.loadConstrObjFromServer = this.loadConstrObjFromServer.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.chooseListItem = this.chooseListItem.bind(this);
    }

    componentDidMount() {
        this.loadConstrObjsFromServer();
        this.loadCustomers();
        this.loadDevelopers();
    }

    loadConstrObjsFromServer() {
        const self = this;
        $.ajax({
            url: "/rest/AllConstructionObjects"
        }).then(function (data) {
            self.setState({
                constrObjs: data
            });
        });
    }

    loadCustomers() {
        const self = this;
        $.ajax({
            url: "/rest/AllOrganizations"
        }).then(function (data) {
            self.setState({
                customers: data
            });
        });
    }

    loadDevelopers() {
        const self = this;
        $.ajax({
            url: "/rest/AllOrganizations"
        }).then(function (data) {
            self.setState({
                developers: data
            });
        });
    }

    loadConstrObjFromServer(id) {
        const self = this;
        $.ajax({
            url: "/rest/constructionObject/" + id
        }).then(function (data) {
            self.setState({
                selectedConstrObj: data
            });
        });
    }

    handleChoice(value) {
        this.setState({
            selectedConstrObjId: value
        });

        this.loadConstrObjFromServer(value);
    }

    chooseListItem(type, id) {
        const self = this;

        if (this.state.typeListItem !== type || this.state.idListItem !== id) {
            $.ajax({
                url: "/rest/" + type + "/" + id
            }).then(function (data) {
                self.setState({
                    idListItem: id,
                    typeListItem: type,
                    selectedItem: data
                });
            });
        }
    }


    render() {
        const floatLeftStyle = {
            float: "left",
            width: "50%",
        };
        const floatRightStyle = {
            float: "right",
            width: "50%",
        };
        const clearBothStyle = {
            clear: "both ",
        };
        return (
            <MuiThemeProvider>
                <div>
                    <div style={floatLeftStyle}>
                        <SelectConstructionObject
                            value={this.state.selectedConstrObjId}
                            constrObjs={this.state.constrObjs}
                            onConstrObjSelect={this.handleChoice}/>
                    </div>
                    <div style={floatRightStyle}>
                        <ConstrObjectDlg
                            customers={this.state.customers}
                            developers={this.state.developers}
                            updateConstrObjs={this.loadConstrObjsFromServer}
                        />
                    </div>
                    <div style={clearBothStyle}>
                        <ConstrObjBasicInfo constrObj={this.state.selectedConstrObj}/>
                    </div>
                    <SplitPane defaultSize="50%" split="vertical">
                        <div>
                            <ConstrObjPartitionList
                                constrObj={this.state.selectedConstrObj}
                                onClick={this.chooseListItem}
                                updateConstrObj={this.loadConstrObjFromServer}
                            />
                        </div>
                        <div>
                            <ListItemData idListItem={this.state.idListItem}
                                          typeListItem={this.state.typeListItem}
                                          selectedItem={this.state.selectedItem}/>
                        </div>
                    </SplitPane>
                </div>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);
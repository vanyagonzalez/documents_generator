'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
import SplitPane from 'react-split-pane/lib/SplitPane';
import $ from 'jquery';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectConstructionObject from './components/SelectConstructionObject'
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
            selectedItem: null
        };

        this.handleChoice = this.handleChoice.bind(this);
        this.chooseListItem = this.chooseListItem.bind(this);
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

    componentDidMount() {
        this.loadConstrObjsFromServer();
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
        return (
            <MuiThemeProvider>
                <div>
                    <div>
                        <SelectConstructionObject
                            value={this.state.selectedConstrObjId}
                            constrObjs={this.state.constrObjs}
                            onConstrObjSelect={this.handleChoice}/>
                        <br/>
                        <ConstrObjBasicInfo constrObj={this.state.selectedConstrObj}/>
                    </div>
                    <SplitPane defaultSize="50%" split="vertical">
                        <div>
                            <ConstrObjPartitionList constrObj={this.state.selectedConstrObj} onClick={this.chooseListItem}/>
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
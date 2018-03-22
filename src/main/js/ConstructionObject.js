const React = require('react');

import SplitPane from 'react-split-pane/lib/SplitPane';
import SelectConstructionObject from './components/constructionObject/SelectConstructionObject'
import ConstrObjectDlg from './components/constructionObject/itemDialogs/ConstrObjectDlg'
import ConstrObjBasicInfo from './components/constructionObject/ConstrObjBasicInfo'
import ConstrObjPartitionList from './components/constructionObject/ConstrObjPartitionList'
import ListItemData from './components/constructionObject/ListItemData'
import $ from 'jquery';

class ConstructionObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constrObjs: [],
            selectedConstrObjId: null,
            selectedConstrObj: {},
            typeListItem: null,
            idListItem: null,
            selectedItem: null,
            confirmations: [],
        };

        this.loadConstrObjsFromServer = this.loadConstrObjsFromServer.bind(this);
        this.loadConstrObjFromServer = this.loadConstrObjFromServer.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.chooseListItem = this.chooseListItem.bind(this);
        this.loadCertificates = this.loadCertificates.bind(this);
        this.loadConfirmations = this.loadConfirmations.bind(this);
    }

    componentDidMount() {
        this.loadConstrObjsFromServer();
        this.loadCertificates();
        this.loadConfirmations();
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

    loadCertificates() {
        const self = this;
        $.ajax({
            url: "/rest/AllCertificates"
        }).then(function (data) {
            self.setState({
                certificates: data,
            });
        });
    }

    loadConfirmations() {
        const self = this;
        $.ajax({
            url: "/rest/AllConfirmations"
        }).then(function (data) {
            self.setState({
                confirmations: data,
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
        const splitPaneStyle = {
            height: "80vh"
        };

        return (
            <div>
                <div style={floatLeftStyle}>
                    <SelectConstructionObject
                        value={this.state.selectedConstrObjId}
                        constrObjs={this.state.constrObjs}
                        onConstrObjSelect={this.handleChoice}/>
                </div>
                <div style={floatRightStyle}>
                    <ConstrObjectDlg
                        customers={this.props.customers}
                        developers={this.props.developers}
                        updateConstrObjs={this.loadConstrObjsFromServer}
                    />
                </div>
                <div style={clearBothStyle}>
                    <ConstrObjBasicInfo constrObj={this.state.selectedConstrObj}/>
                </div>
                <SplitPane defaultSize="50%" split="vertical" style={splitPaneStyle}>
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
                                      selectedItem={this.state.selectedItem}
                                      constrObjId={this.state.selectedConstrObj.id}
                                      updateConstrObj={this.loadConstrObjFromServer}
                                      authors={this.props.authors}
                                      customerRepresentatives={this.props.customerRepresentatives}
                                      developerRepresentatives={this.props.developerRepresentatives}
                                      executors={this.props.executors}
                                      executorRepresentatives={this.props.executorRepresentatives}
                                      otherRepresentatives={this.props.otherRepresentatives}
                                      certificates={this.state.certificates}
                                      confirmations={this.state.confirmations}
                        />
                    </div>
                </SplitPane>
            </div>
        );
    }
}

export default ConstructionObject;
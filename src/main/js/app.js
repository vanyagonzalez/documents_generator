'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import SplitPane from 'react-split-pane/lib/SplitPane';

import $ from 'jquery';

const projectPartitionType = "projectPartition";
const projectDocumentType = "projectDocument";
const documentationSheetType = "documentationSheet";
const kindOfWorkType = "kindOfWork";

class SelectConstructionObject extends React.Component {
    render() {
        var rows = [];
        this.props.constrObjs.forEach(function(constructionObject) {
            rows.push(<MenuItem key={constructionObject.id} value={constructionObject.id} primaryText={constructionObject.code} />);
        });

        return (
            <div>
                <SelectField
                    floatingLabelText="Выбор объекта строительства"
                    value={this.props.value}
                    onChange={(event, index, value) => this.props.onConstrObjSelect(value)}
                >
                    {rows}
                </SelectField>

            </div>
        );
    }
}

class ConstrObjBasicInfo extends React.Component {
    render() {
        let objName = this.props.constrObj.name ? this.props.constrObj.name : "";
        let customerName = this.props.constrObj.customer ? this.props.constrObj.customer.name : "";
        let developerName = this.props.constrObj.developer ? this.props.constrObj.developer.name : "";
        return (
            <div>
                <TextField
                    floatingLabelText="Название"
                    value={objName}
                    disabled={true}
                />
                <TextField
                    floatingLabelText="Заказчик"
                    value={customerName}
                    disabled={true}
                    />
                <TextField
                    floatingLabelText="Застройщик"
                    value={developerName}
                    disabled={true}
                />
            </div>
        )

    }
}

class ConstrObjPartitionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(){
        this.setState({
            open: !this.state.open,
        });
    };

    render() {
        let projectPartitions = [];
        let open = this.state.open;
        let onClickFunction = this.props.onClick;

        if (this.props.constrObj.projectPartitions) {
            this.props.constrObj.projectPartitions.forEach(function (projectPartition) {
                let projectDocuments = [];

                if (projectPartition.projectDocuments) {
                    projectPartition.projectDocuments.forEach(function (projectDocument) {
                        let documentationSheets = [];

                        if (projectDocument.documentationSheets) {
                            projectDocument.documentationSheets.forEach(function (documentationSheet) {
                                let kindOfWorks = [];

                                if (documentationSheet.kindOfWorks) {
                                    documentationSheet.kindOfWorks.forEach(function (kindOfWork) {
                                        kindOfWorks.push(
                                            <ListItem
                                                key={kindOfWorkType + kindOfWork.id}
                                                primaryText={kindOfWork.name}
                                                //primaryTogglesNestedList={true}
                                                onClick={() => onClickFunction(kindOfWorkType, kindOfWork.id)}
                                            />
                                        );

                                    });
                                }

                                documentationSheets.push(
                                    <ListItem
                                        key={documentationSheetType + documentationSheet.id}
                                        primaryText={documentationSheet.name}
                                        //primaryTogglesNestedList={true}
                                        open={open}
                                        nestedItems={kindOfWorks}
                                        onClick={() => onClickFunction(documentationSheetType, documentationSheet.id)}
                                    />
                                );
                            });
                        }

                        projectDocuments.push(
                            <ListItem
                                key={projectDocumentType + projectDocument.id}
                                primaryText={projectDocument.name}
                                //primaryTogglesNestedList={true}
                                open={open}
                                nestedItems={documentationSheets}
                                onClick={() => onClickFunction(projectDocumentType, projectDocument.id)}
                            />
                        );
                    });
                }

                projectPartitions.push(
                    <ListItem
                        key={projectPartitionType + projectPartition.id}
                        primaryText={projectPartition.name}
                        //primaryTogglesNestedList={true}
                        open={open}
                        nestedItems={projectDocuments}
                        onClick={() => onClickFunction(projectPartitionType, projectPartition.id)}
                    />
                );
            });
        }
        return (
            <div>
                <Toggle
                    toggled={this.state.open}
                    onToggle={this.handleToggle}
                    labelPosition="right"
                    label="Развернуть дерево"
                />
                <br/>
                <List>
                    {projectPartitions}
                </List>
            </div>
        )
    }
}

class ListItemData extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constrObjs: [],
            selectedConstrObjId: null,
            selectedConstrObj: {}
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
        this.setState({
            //selectedConstrObjId: value
        });
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
                            <ListItemData/>
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
const React = require('react');
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import ProjectPartitionDlg from './itemDialogs/ProjectPartitionDlg'
import RaisedButton from 'material-ui/RaisedButton';

const projectPartitionType = "projectPartition";
const projectDocumentType = "projectDocument";
const documentationSheetType = "documentationSheet";
const kindOfWorkType = "kindOfWork";

class ConstrObjPartitionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openByKey: [],
            openProjectPartitionDlg: false,
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleNestedListToggle = this.handleNestedListToggle.bind(this);
        this.onOpenProjectPartitionDlg = this.onOpenProjectPartitionDlg.bind(this);
        this.onCloseProjectPartitionDlg = this.onCloseProjectPartitionDlg.bind(this);
    }

    handleToggle(){
        let state = this.state;
        for(let key in state.openByKey) {
            state.openByKey[key] = !state.open;
        }
        state.open = !state.open;

        this.setState(state);
    };

    handleNestedListToggle(key) {
        let state = this.state;
        if (typeof state.openByKey[key] === 'undefined') {
            state.openByKey[key] = !state.open;
        } else {
            state.openByKey[key] = !state.openByKey[key];
        }
        this.setState(state);
    };

    onOpenProjectPartitionDlg() {
        this.setState({openProjectPartitionDlg: true});
    }
    onCloseProjectPartitionDlg() {
        this.setState({openProjectPartitionDlg: false});
    }

    render() {
        let projectPartitions = [];
        let open = this.state.open;
        let openByKey = this.state.openByKey;
        let onClickFunction = this.props.onClick;
        let handleNestedListToggle = this.handleNestedListToggle;
        let selectedId = this.props.selectedItemId;
        let selectedType = this.props.selectedItemType;
        // let selectedItemStyle = {backgroundColor: "#eeeee"};
        let selectedItemStyle = {fontWeight: "bold", fontStyle: "italic"};

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
                                        let style;
                                        if (selectedType === kindOfWorkType && selectedId === kindOfWork.id) {
                                            style = selectedItemStyle;
                                        }
                                        kindOfWorks.push(
                                            <ListItem
                                                key={kindOfWorkType + kindOfWork.id}
                                                primaryText={kindOfWork.name}
                                                style={style}
                                                //primaryTogglesNestedList={true}
                                                onClick={() => onClickFunction(kindOfWorkType, kindOfWork.id)}
                                            />
                                        );

                                    });
                                }

                                const dsKey = documentationSheetType + documentationSheet.id;
                                let dsKeyOpen = openByKey[dsKey];
                                if (typeof dsKeyOpen === 'undefined') {
                                    dsKeyOpen = open;
                                }
                                let style;
                                if (selectedType === documentationSheetType && selectedId === documentationSheet.id) {
                                    style = selectedItemStyle;
                                }
                                documentationSheets.push(
                                    <ListItem
                                        key={dsKey}
                                        primaryText={documentationSheet.name}
                                        style={style}
                                        //primaryTogglesNestedList={true}
                                        open={dsKeyOpen}
                                        nestedItems={kindOfWorks}
                                        onClick={() => onClickFunction(documentationSheetType, documentationSheet.id)}
                                        onNestedListToggle={() => handleNestedListToggle(dsKey)}
                                    />
                                );
                            });
                        }

                        const pdKey = projectDocumentType + projectDocument.id;
                        let pdKeyOpen = openByKey[pdKey];
                        if (typeof pdKeyOpen === 'undefined') {
                            pdKeyOpen = open;
                        }
                        let style;
                        if (selectedType === projectDocumentType && selectedId === projectDocument.id) {
                            style = selectedItemStyle;
                        }
                        projectDocuments.push(
                            <ListItem
                                key={pdKey}
                                primaryText={projectDocument.name}
                                style={style}
                                //primaryTogglesNestedList={true}
                                open={pdKeyOpen}
                                nestedItems={documentationSheets}
                                onClick={() => onClickFunction(projectDocumentType, projectDocument.id)}
                                onNestedListToggle={() => handleNestedListToggle(pdKey)}
                            />
                        );
                    });
                }

                const ppKey = projectPartitionType + projectPartition.id;
                let ppKeyOpen = openByKey[ppKey];
                if (typeof ppKeyOpen === 'undefined') {
                    ppKeyOpen = open;
                }
                let style;
                if (selectedType === projectPartitionType && selectedId === projectPartition.id) {
                    style = selectedItemStyle;
                }
                projectPartitions.push(
                    <ListItem
                        key={ppKey}
                        primaryText={projectPartition.name}
                        style={style}
                        //primaryTogglesNestedList={true}
                        open={ppKeyOpen}
                        nestedItems={projectDocuments}
                        onClick={() => onClickFunction(projectPartitionType, projectPartition.id)}
                        onNestedListToggle={() => handleNestedListToggle(ppKey)}
                    />
                );
            });
        }

        const floatLeftStyle = {
            float: "left",
            width: "50%",
        };
        const floatRightStyle = {
            float: "right",
            width: "50%",
        };
        let bodyHeight = parseInt(this.props.bodyHeight.replace('vh',''));

        const clearBothStyle = {
            clear: "both",
            height: bodyHeight * 0.95 + 'vh',
            overflow: 'auto',
        };

        return (
            <div>
                <div style={{height:bodyHeight * 0.05 + 'vh', margin:'10px'}}>
                    <div style={floatLeftStyle}>
                        <RaisedButton label="Новый раздел проекта" onClick={this.onOpenProjectPartitionDlg} />
                        <ProjectPartitionDlg
                            open={this.state.openProjectPartitionDlg}
                            constrObjId={this.props.constrObj.id}
                            updateConstrObj={this.props.updateConstrObj}
                            updateSelectedItem={this.props.updateSelectedItem}
                            onClose={this.onCloseProjectPartitionDlg}
                        />
                    </div>
                    <div style={floatRightStyle}>
                        <Toggle
                            toggled={this.state.open}
                            onToggle={this.handleToggle}
                            labelPosition="right"
                            label="Развернуть дерево"
                        />
                    </div>
                </div>
                <div style={clearBothStyle}>
                    <List>
                        {projectPartitions}
                    </List>
                </div>
            </div>
        )
    }
}

export default ConstrObjPartitionList;
const React = require('react');
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import ProjectPartitionDlg from './itemDialogs/ProjectPartitionDlg'

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
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleNestedListToggle = this.handleNestedListToggle.bind(this);
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

    render() {
        let projectPartitions = [];
        let open = this.state.open;
        let openByKey = this.state.openByKey;
        let onClickFunction = this.props.onClick;
        let handleNestedListToggle = this.handleNestedListToggle;

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

                                const dsKey = documentationSheetType + documentationSheet.id;
                                let dsKeyOpen = openByKey[dsKey];
                                if (typeof dsKeyOpen === 'undefined') {
                                    dsKeyOpen = open;
                                }
                                documentationSheets.push(
                                    <ListItem
                                        key={dsKey}
                                        primaryText={documentationSheet.name}
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
                        projectDocuments.push(
                            <ListItem
                                key={pdKey}
                                primaryText={projectDocument.name}
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
                projectPartitions.push(
                    <ListItem
                        key={ppKey}
                        primaryText={projectPartition.name}
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
                        <ProjectPartitionDlg
                            constrObjId={this.props.constrObj.id}
                            updateConstrObj={this.props.updateConstrObj}
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
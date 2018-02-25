const React = require('react');
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

const projectPartitionType = "projectPartition";
const projectDocumentType = "projectDocument";
const documentationSheetType = "documentationSheet";
const kindOfWorkType = "kindOfWork";

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

export default ConstrObjPartitionList;
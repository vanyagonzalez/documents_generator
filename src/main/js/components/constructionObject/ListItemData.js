const React = require('react');

import ProjectPartition from './itemViews/ProjectPartition'
import ProjectDocument from './itemViews/ProjectDocument'
import DocumentationSheet from './itemViews/DocumentationSheet'
import KindOfWork from './itemViews/KindOfWork'

const projectPartitionType = "projectPartition";
const projectDocumentType = "projectDocument";
const documentationSheetType = "documentationSheet";
const kindOfWorkType = "kindOfWork";

class ListItemData extends React.Component {

    render() {
        let content = <div style={{padding: '70px 0', textAlign: 'center'}}><h2>Элемент не выбран</h2></div>;
        let item = this.props.selectedItem;
        let updateConstrObj = this.props.updateConstrObj;
        let updateSelectedItem = this.props.updateSelectedItem;
        let constrObjId = this.props.constrObjId;

        if (this.props.selectedItemId && this.props.selectedItemType) {
            if (this.props.selectedItemType === projectPartitionType) {
                content = <ProjectPartition
                    item={item}
                    updateConstrObj={updateConstrObj}
                    updateSelectedItem={updateSelectedItem}
                    constrObjId={constrObjId}
                    authors={this.props.authors}
                    customerRepresentatives={this.props.customerRepresentatives}
                    developerRepresentatives={this.props.developerRepresentatives}
                />
            } else if (this.props.selectedItemType === projectDocumentType) {
                content = <ProjectDocument
                    item={item}
                    updateConstrObj={updateConstrObj}
                    updateSelectedItem={updateSelectedItem}
                    constrObjId={constrObjId}
                />
            } else if (this.props.selectedItemType === documentationSheetType) {
                content = <DocumentationSheet
                    item={item}
                    updateConstrObj={updateConstrObj}
                    updateSelectedItem={updateSelectedItem}
                    constrObjId={constrObjId}
                    executors={this.props.executors}
                    executorRepresentatives={this.props.executorRepresentatives}
                    otherRepresentatives={this.props.otherRepresentatives}
                    allCertificates={this.props.allCertificates}
                    allConfirmations={this.props.allConfirmations}
                />
            } else if (this.props.selectedItemType === kindOfWorkType) {
                content = <KindOfWork
                    item={item}
                    updateConstrObj={updateConstrObj}
                    updateSelectedItem={updateSelectedItem}
                    constrObjId={constrObjId}
                />
            }
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default ListItemData;
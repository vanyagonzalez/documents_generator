const React = require('react');

import ProjectPartitionType from './itemViews/ProjectPartition'
import ProjectDocumentType from './itemViews/ProjectDocument'
import DocumentationSheetType from './itemViews/DocumentationSheet'
import KindOfWorkType from './itemViews/KindOfWork'

const projectPartitionType = "projectPartition";
const projectDocumentType = "projectDocument";
const documentationSheetType = "documentationSheet";
const kindOfWorkType = "kindOfWork";

class ListItemData extends React.Component {

    render() {
        let content = <div style={{padding: '70px 0', textAlign: 'center'}}><h2>Элемент не выбран</h2></div>;
        let item = this.props.selectedItem;
        let updateConstrObj = this.props.updateConstrObj;
        let constrObjId = this.props.constrObjId;

        if (this.props.idListItem && this.props.typeListItem) {
            if (this.props.typeListItem === projectPartitionType) {
                content = <ProjectPartitionType
                    item={item}
                    updateConstrObj={updateConstrObj}
                    constrObjId={constrObjId}
                    authors={this.props.authors}
                    customerRepresentatives={this.props.customerRepresentatives}
                    developerRepresentatives={this.props.developerRepresentatives}
                />
            } else if (this.props.typeListItem === projectDocumentType) {
                content = <ProjectDocumentType
                    item={item}
                    updateConstrObj={updateConstrObj}
                    constrObjId={constrObjId}
                />
            } else if (this.props.typeListItem === documentationSheetType) {
                content = <DocumentationSheetType
                    item={item}
                    updateConstrObj={updateConstrObj}
                    constrObjId={constrObjId}
                    executors={this.props.executors}
                    executorRepresentatives={this.props.executorRepresentatives}
                    otherRepresentatives={this.props.otherRepresentatives}
                    allCertificates={this.props.allCertificates}
                    allConfirmations={this.props.allConfirmations}
                />
            } else if (this.props.typeListItem === kindOfWorkType) {
                content = <KindOfWorkType
                    item={item}
                    updateConstrObj={updateConstrObj}
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
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
        let content = <h2>Элемент не выбран</h2>
        if (this.props.idListItem && this.props.typeListItem) {
            if (this.props.typeListItem === projectPartitionType) {
                content = <ProjectPartitionType
                    item={this.props.selectedItem}/>
            } else if (this.props.typeListItem === projectDocumentType) {
                content = <ProjectDocumentType
                    item={this.props.selectedItem}/>
            } else if (this.props.typeListItem === documentationSheetType) {
                content = <DocumentationSheetType
                    item={this.props.selectedItem}/>
            } else if (this.props.typeListItem === kindOfWorkType) {
                content = <KindOfWorkType
                    item={this.props.selectedItem}/>
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
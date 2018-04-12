const React = require('react');

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import ProjectPartitionDlg from "../itemDialogs/ProjectPartitionDlg"
import ProjectDocumentDlg from "../itemDialogs/ProjectDocumentDlg"
import ButtonsBlock from '../../ButtonsBlock';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle'

class ProjectPartition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openProjectPartitionDlg: false,
            openProjectDocumentDlg: false,
        };
        this.onOpenProjectPartitionDlg = this.onOpenProjectPartitionDlg.bind(this);
        this.onCloseProjectPartitionDlg = this.onCloseProjectPartitionDlg.bind(this);
        this.onOpenProjectDocumentDlg = this.onOpenProjectDocumentDlg.bind(this);
        this.onCloseProjectDocumentDlg = this.onCloseProjectDocumentDlg.bind(this);
    }

    onOpenProjectPartitionDlg() {
        this.setState({openProjectPartitionDlg: true});
    }
    onCloseProjectPartitionDlg() {
        this.setState({openProjectPartitionDlg: false});
    }
    onOpenProjectDocumentDlg() {
        this.setState({openProjectDocumentDlg: true});
    }
    onCloseProjectDocumentDlg() {
        this.setState({openProjectDocumentDlg: false});
    }

    render() {
        const otherButtons =
            <IconButton tooltip="Добавить проектную документацию" onClick={this.onOpenProjectDocumentDlg}>
                <Add/>
            </IconButton>;

        return (
            <div>
                <ButtonsBlock
                    onCreate={() => this.onOpenProjectPartitionDlg()}
                    onUpdate={() => this.onOpenProjectPartitionDlg()}
                    onDelete={() => this.onOpenProjectPartitionDlg()}
                    otherButtons={otherButtons}
                />
                <ProjectPartitionDlg
                    open={this.state.openProjectPartitionDlg}
                    constrObjId={this.props.constrObjId}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    onClose={this.onCloseProjectPartitionDlg}
                />
                <ProjectDocumentDlg
                    open={this.state.openProjectDocumentDlg}
                    parentId={this.props.item.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    constrObjId={this.props.constrObjId}
                    authors={this.props.authors}
                    customerRepresentatives={this.props.customerRepresentatives}
                    developerRepresentatives={this.props.developerRepresentatives}
                    onClose={this.onCloseProjectDocumentDlg}
                />
                <br/>
                <Table>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Наименование раздела проектной документации</TableRowColumn>
                            <TableRowColumn>{this.props.item.name}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Шифр раздела проектной документации</TableRowColumn>
                            <TableRowColumn>{this.props.item.code}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default ProjectPartition;
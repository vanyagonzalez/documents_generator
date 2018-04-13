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
            openParentDlg: false,
            openChildDlg: false,
            operation: null
        };
        this.onOpenDlg = this.onOpenDlg.bind(this);
        this.onCloseDlg = this.onCloseDlg.bind(this);
    }

    onOpenDlg(isParent, operation) {
        if (isParent) {
            this.setState({
                openParentDlg: true,
                operation: operation
            });
        } else {
            this.setState({
                openChildDlg: true,
                operation: operation
            });
        }
    }
    onCloseDlg(isParent) {
        if (isParent) {
            this.setState({
                openParentDlg: false,
                operation: null
            });
        } else {
            this.setState({
                openChildDlg: false,
                operation: null
            });
        }
    }

    render() {
        const otherButtons =
            <IconButton tooltip="Добавить проектную документацию" onClick={() => this.onOpenDlg(false, "create")}>
                <Add/>
            </IconButton>;

        return (
            <div>
                <ButtonsBlock
                    onCreate={() => this.onOpenDlg(true, "create")}
                    onCopy={() => this.onOpenDlg(true, "copy")}
                    onUpdate={() => this.onOpenDlg(true, "update")}
                    onDelete={() => this.onOpenDlg(true, "delete")}
                    otherButtons={otherButtons}
                />
                <ProjectPartitionDlg
                    open={this.state.openParentDlg}
                    operation={this.state.operation}
                    item={this.props.item}
                    parentId={this.props.item.constructionObject.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    onClose={() => this.onCloseDlg(true)}
                />
                <ProjectDocumentDlg
                    open={this.state.openChildDlg}
                    operation={this.state.operation}
                    parentId={this.props.item.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    authors={this.props.authors}
                    customerRepresentatives={this.props.customerRepresentatives}
                    developerRepresentatives={this.props.developerRepresentatives}
                    onClose={() => this.onCloseDlg(false)}
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
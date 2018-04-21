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

import * as Constants from '../../../AppConstants';

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
            <IconButton tooltip="Добавить проектную документацию" onClick={() => this.onOpenDlg(false, Constants.CREATE)}>
                <Add/>
            </IconButton>;

        let projectPartitionDlg = "";
        if (this.state.openParentDlg) {
            projectPartitionDlg =
                <ProjectPartitionDlg
                    open={this.state.openParentDlg}
                    operation={this.state.operation}
                    item={this.props.item}
                    parentId={this.props.item.constructionObject.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    onClose={() => this.onCloseDlg(true)}
                />
        }

        let projectDocumentDlg = "";
        if(this.state.openChildDlg) {
            projectDocumentDlg =
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
        }

        let data =
            <div>
                <ButtonsBlock
                    onCreate={() => this.onOpenDlg(true, Constants.CREATE)}
                    onCopy={() => this.onOpenDlg(true, Constants.COPY)}
                    onUpdate={() => this.onOpenDlg(true, Constants.UPDATE)}
                    onDelete={() => this.onOpenDlg(true, Constants.DELETE)}
                    otherButtons={otherButtons}
                />
                {projectPartitionDlg}
                {projectDocumentDlg}
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
            </div>;

        return (
            <div>
                {data}
            </div>
        )
    }
}

export default ProjectPartition;
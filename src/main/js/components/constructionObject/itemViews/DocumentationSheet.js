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

import DocumentationSheetDlg from "../itemDialogs/DocumentationSheetDlg"
import KindOfWorkDlg from "../itemDialogs/KindOfWorkDlg"
import ButtonsBlock from '../../ButtonsBlock';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle'

class DocumentationSheet extends React.Component {
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
            <IconButton tooltip="Добавить вид работы" onClick={() => this.onOpenDlg(false, "create")}>
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
                <DocumentationSheetDlg
                    open={this.state.openParentDlg}
                    parentId={this.props.item.projectDocument.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    constrObjId={this.props.constrObjId}
                    onClose={() => this.onCloseDlg(true)}
                />
                <KindOfWorkDlg
                    open={this.state.openChildDlg}
                    parentId={this.props.item.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    constrObjId={this.props.constrObjId}
                    executors={this.props.executors}
                    executorRepresentatives={this.props.executorRepresentatives}
                    otherRepresentatives={this.props.otherRepresentatives}
                    certificates={this.props.allCertificates}
                    confirmations={this.props.allConfirmations}
                    onClose={() => this.onCloseDlg(false)}
                />
                <br/>
                <Table>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Наименование листа проектной документации</TableRowColumn>
                            <TableRowColumn>{this.props.item.name}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Номер листа проектной документации</TableRowColumn>
                            <TableRowColumn>{this.props.item.number}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Номер изменения листа проектной документации</TableRowColumn>
                            <TableRowColumn>{this.props.item.change}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default DocumentationSheet;
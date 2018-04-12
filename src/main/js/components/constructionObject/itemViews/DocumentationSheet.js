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
            openDocumentationSheetDlg: false,
            openKindOfWorkDlg: false,
        };
        this.onOpenDocumentationSheetDlg = this.onOpenDocumentationSheetDlg.bind(this);
        this.onCloseDocumentationSheetDlg = this.onCloseDocumentationSheetDlg.bind(this);
        this.onOpenKindOfWorkDlg = this.onOpenKindOfWorkDlg.bind(this);
        this.onCloseKindOfWorkDlg = this.onCloseKindOfWorkDlg.bind(this);
    }

    onOpenDocumentationSheetDlg() {
        this.setState({openDocumentationSheetDlg: true});
    }
    onCloseDocumentationSheetDlg() {
        this.setState({openDocumentationSheetDlg: false});
    }
    onOpenKindOfWorkDlg() {
        this.setState({openKindOfWorkDlg: true});
    }
    onCloseKindOfWorkDlg() {
        this.setState({openKindOfWorkDlg: false});
    }

    render() {
        const otherButtons =
            <IconButton tooltip="Добавить вид работы" onClick={this.onOpenKindOfWorkDlg}>
                <Add/>
            </IconButton>;

        return (
            <div>
                <ButtonsBlock
                    onCreate={() => this.onOpenDocumentationSheetDlg()}
                    onUpdate={() => this.onOpenDocumentationSheetDlg()}
                    onDelete={() => this.onOpenDocumentationSheetDlg()}
                    otherButtons={otherButtons}
                />
                <DocumentationSheetDlg
                    open={this.state.openDocumentationSheetDlg}
                    parentId={this.props.item.projectDocument.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    constrObjId={this.props.constrObjId}
                    onClose={this.onCloseDocumentationSheetDlg}
                />
                <KindOfWorkDlg
                    open={this.state.openKindOfWorkDlg}
                    parentId={this.props.item.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    constrObjId={this.props.constrObjId}
                    executors={this.props.executors}
                    executorRepresentatives={this.props.executorRepresentatives}
                    otherRepresentatives={this.props.otherRepresentatives}
                    certificates={this.props.allCertificates}
                    confirmations={this.props.allConfirmations}
                    onClose={this.onCloseKindOfWorkDlg}
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
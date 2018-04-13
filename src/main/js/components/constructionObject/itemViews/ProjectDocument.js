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

import ProjectDocumentDlg from "../itemDialogs/ProjectDocumentDlg"
import DocumentationSheetDlg from "../itemDialogs/DocumentationSheetDlg"
import ButtonsBlock from '../../ButtonsBlock';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle'

class ProjectDocument extends React.Component {
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
        let authorFio = "";
        if (this.props.item.author) {
            authorFio = this.props.item.author.fio;
        }
        let customerRepresentativeFio = "";
        if (this.props.item.customerRepresentative) {
            customerRepresentativeFio = this.props.item.customerRepresentative.fio;
        }
        let developerRepresentativeFio = "";
        if (this.props.item.developerRepresentative) {
            developerRepresentativeFio = this.props.item.developerRepresentative.fio;
        }

        const otherButtons =
            <IconButton tooltip="Добавить лист проектной документации" onClick={() => this.onOpenDlg(false, "create")}>
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
                <ProjectDocumentDlg
                    open={this.state.openParentDlg}
                    parentId={this.props.item.projectPartition.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    authors={this.props.authors}
                    customerRepresentatives={this.props.customerRepresentatives}
                    developerRepresentatives={this.props.developerRepresentatives}
                    onClose={() => this.onCloseDlg(true)}
                />
                <DocumentationSheetDlg
                    open={this.state.openChildDlg}
                    parentId={this.props.item.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    onClose={() => this.onCloseDlg(false)}
                />
                <br/>
                <Table>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Наименование проектной документации</TableRowColumn>
                            <TableRowColumn>{this.props.item.name}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Шифр проектной документации</TableRowColumn>
                            <TableRowColumn>{this.props.item.code}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Стадия проектирования</TableRowColumn>
                            <TableRowColumn>{this.props.item.phase}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Автор проектной документации</TableRowColumn>
                            <TableRowColumn>{authorFio}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Ответственный представитель Заказчика</TableRowColumn>
                            <TableRowColumn>{customerRepresentativeFio}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Ответственный представитель Застройщика</TableRowColumn>
                            <TableRowColumn>{developerRepresentativeFio}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default ProjectDocument;
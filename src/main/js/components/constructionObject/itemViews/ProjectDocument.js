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
            openProjectDocumentDlg: false,
            openDocumentationSheetDlg: false,
        };
        this.onOpenProjectDocumentDlg = this.onOpenProjectDocumentDlg.bind(this);
        this.onCloseProjectDocumentDlg = this.onCloseProjectDocumentDlg.bind(this);
        this.onOpenDocumentationSheetDlg = this.onOpenDocumentationSheetDlg.bind(this);
        this.onCloseDocumentationSheetDlg = this.onCloseDocumentationSheetDlg.bind(this);
    }

    onOpenProjectDocumentDlg() {
        this.setState({openProjectDocumentDlg: true});
    }
    onCloseProjectDocumentDlg() {
        this.setState({openProjectDocumentDlg: false});
    }
    onOpenDocumentationSheetDlg() {
        this.setState({openDocumentationSheetDlg: true});
    }
    onCloseDocumentationSheetDlg() {
        this.setState({openDocumentationSheetDlg: false});
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
            <IconButton tooltip="Добавить лист проектной документации" onClick={this.onOpenDocumentationSheetDlg}>
                <Add/>
            </IconButton>;

        return (
            <div>
                <ButtonsBlock
                    onCreate={() => this.onOpenProjectDocumentDlg()}
                    onUpdate={() => this.onOpenProjectDocumentDlg()}
                    onDelete={() => this.onOpenProjectDocumentDlg()}
                    otherButtons={otherButtons}
                />
                <ProjectDocumentDlg
                    open={this.state.openProjectDocumentDlg}
                    parentId={this.props.item.projectPartition.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    constrObjId={this.props.constrObjId}
                    authors={this.props.authors}
                    customerRepresentatives={this.props.customerRepresentatives}
                    developerRepresentatives={this.props.developerRepresentatives}
                    onClose={this.onCloseProjectDocumentDlg}
                />
                <DocumentationSheetDlg
                    open={this.state.openDocumentationSheetDlg}
                    parentId={this.props.item.id}
                    updateConstrObj={this.props.updateConstrObj}
                    updateSelectedItem={this.props.updateSelectedItem}
                    constrObjId={this.props.constrObjId}
                    onClose={this.onCloseDocumentationSheetDlg}
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
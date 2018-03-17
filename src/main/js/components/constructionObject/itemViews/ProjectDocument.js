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

class ProjectDocument extends React.Component {

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

        return (
            <div>
                <DocumentationSheetDlg
                    itemId={this.props.item.id}
                    updateConstrObj={this.props.updateConstrObj}
                    constrObjId={this.props.constrObjId}
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
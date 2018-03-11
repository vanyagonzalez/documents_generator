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

import KindOfWorkDlg from "./../itemDialogs/KindOfWorkDlg"

class DocumentationSheet extends React.Component {

    render() {
        return (
            <div>
                <KindOfWorkDlg
                    itemId={this.props.item.id}
                    updateConstrObj={this.props.updateConstrObj}
                    constrObjId={this.props.constrObjId}
                    executors={this.props.executors}
                    executorRepresentatives={this.props.executorRepresentatives}
                    otherRepresentatives={this.props.otherRepresentatives}
                    certificates={this.props.certificates}
                    confirmations={this.props.confirmations}
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
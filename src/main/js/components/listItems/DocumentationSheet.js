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

class DocumentationSheet extends React.Component {

    render() {
        return (
            <div>
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
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

class ProjectPartition extends React.Component {

    render() {
        return (
            <div>
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
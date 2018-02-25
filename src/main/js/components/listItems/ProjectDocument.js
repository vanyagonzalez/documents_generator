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

class ProjectDocument extends React.Component {

    render() {
        return (
            <div>
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
                            <TableRowColumn>{this.props.item.author.fio}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Ответственный представитель Заказчика</TableRowColumn>
                            <TableRowColumn>{this.props.item.customerRepresentative.fio}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Ответственный представитель Застройщика</TableRowColumn>
                            <TableRowColumn>{this.props.item.developerRepresentative.fio}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default ProjectDocument;
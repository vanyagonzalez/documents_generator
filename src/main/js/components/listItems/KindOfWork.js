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

class KindOfWork extends React.Component {

    render() {
        return (
            <div>
                <Table>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Наименование работы</TableRowColumn>
                            <TableRowColumn>{this.props.item.name}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Объем выполненной работы</TableRowColumn>
                            <TableRowColumn>{this.props.item.amountOfWork}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Единица измерения выполненного объема</TableRowColumn>
                            <TableRowColumn>{this.props.item.measureUnit}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Организация - фактически выполнившая работу</TableRowColumn>
                            <TableRowColumn>{this.props.item.executor}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Представитель исполнителя работы</TableRowColumn>
                            <TableRowColumn>{this.props.item.executorRepresentative}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Дополнительные нормативные документы согласно которых выполнены работы</TableRowColumn>
                            <TableRowColumn>{this.props.item.additionalReason}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Дата начала производства работ</TableRowColumn>
                            <TableRowColumn>{this.props.item.beginDate}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Дата окончания производства работ</TableRowColumn>
                            <TableRowColumn>{this.props.item.endDate}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Дата проведения комиссии по приемке работ</TableRowColumn>
                            <TableRowColumn>{this.props.item.presentationDate}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default KindOfWork;
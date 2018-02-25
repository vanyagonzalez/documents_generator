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
        let otherRepresentatives = [];
        if (this.props.item.otherRepresentatives) {
            this.props.item.otherRepresentatives.forEach(function (otherRepresentative) {
                otherRepresentatives.push(
                    <li>{otherRepresentative.name}</li>
                );
            });
        }

        let certificates = [];
        if (this.props.item.certificates) {
            this.props.item.certificates.forEach(function (certificate) {
                certificates.push(
                    <li>{certificate.material}</li>
                );
            });
        }

        let confirmations = [];
        if (this.props.item.confirmations) {
            this.props.item.confirmations.forEach(function (confirmation) {
                confirmations.push(
                    <li>{confirmation.name}</li>
                );
            });
        }

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
                            <TableRowColumn>{this.props.item.executor.name}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Представитель исполнителя работы</TableRowColumn>
                            <TableRowColumn>{this.props.item.executorRepresentative.fio}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Представители иных лиц, участвующих в освидетельствовании</TableRowColumn>
                            <TableRowColumn><ul>{otherRepresentatives}</ul></TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Материалы, примененные для выполнения данных работ</TableRowColumn>
                            <TableRowColumn><ul>{certificates}</ul></TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Документы, подтверждающие качество выполенных работ</TableRowColumn>
                            <TableRowColumn><ul>{confirmations}</ul></TableRowColumn>
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
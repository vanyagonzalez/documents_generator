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
import FlatButton from 'material-ui/FlatButton';
import KindOfWorkDlg from "../itemDialogs/KindOfWorkDlg"
import ButtonsBlock from '../../ButtonsBlock';

class KindOfWork extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKindOfWorkDlg: false,
        };
        this.onOpenKindOfWorkDlg = this.onOpenKindOfWorkDlg.bind(this);
        this.onCloseKindOfWorkDlg = this.onCloseKindOfWorkDlg.bind(this);
    }

    onOpenKindOfWorkDlg() {
        this.setState({openKindOfWorkDlg: true});
    }
    onCloseKindOfWorkDlg() {
        this.setState({openKindOfWorkDlg: false});
    }

    generateDocument(id, type) {
        window.location="/rest/kindOfWork/" + id + "/document/" + type;
    }

    render() {
        let otherRepresentatives = [];
        if (this.props.item.otherRepresentatives) {
            this.props.item.otherRepresentatives.forEach(function (otherRepresentative) {
                let personFio = "Персона не задана";
                if (otherRepresentative.person) {
                    personFio = otherRepresentative.person.fio;
                }
                otherRepresentatives.push(
                    <li key={otherRepresentative.id}>{otherRepresentative.organization.name + "; " + personFio}</li>
                );
            });
        }

        let certificates = [];
        if (this.props.item.certificates) {
            this.props.item.certificates.forEach(function (certificate) {
                certificates.push(
                    <li key={certificate.id}>{certificate.material}</li>
                );
            });
        }

        let confirmations = [];
        if (this.props.item.confirmations) {
            this.props.item.confirmations.forEach(function (confirmation) {
                confirmations.push(
                    <li key={confirmation.id}>{confirmation.name}</li>
                );
            });
        }

        let executorName = "";
        if (this.props.item.executor) {
            executorName = this.props.item.executor.name;
        }
        let executorRepresentativeFio = "";
        if (this.props.item.executorRepresentative) {
            executorRepresentativeFio = this.props.item.executorRepresentative.person.fio;
        }

        let beginDate;
        if (this.props.item.beginDate) {
            beginDate = new Date(this.props.item.beginDate);
            beginDate = beginDate.toLocaleDateString();
        }
        let endDate;
        if (this.props.item.endDate) {
            endDate = new Date(this.props.item.endDate);
            endDate = endDate.toLocaleDateString();
        }
        let presentationDate;
        if (this.props.item.presentationDate) {
            presentationDate = new Date(this.props.item.presentationDate);
            presentationDate = presentationDate.toLocaleDateString();
        }

        return (
            <div>
                <ButtonsBlock
                    onCreate={() => this.onOpenKindOfWorkDlg()}
                    onUpdate={() => this.onOpenKindOfWorkDlg()}
                    onDelete={() => this.onOpenKindOfWorkDlg()}
                    otherButtons={<FlatButton label="Форма АОСР1" primary={true} onClick={() => this.generateDocument(this.props.item.id, "aosr1")}/>}
                />
                <KindOfWorkDlg
                    open={this.state.openKindOfWorkDlg}
                    parentId={this.props.item.documentationSheet.id}
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
                            <TableRowColumn>{executorName}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Представитель исполнителя работы</TableRowColumn>
                            <TableRowColumn>{executorRepresentativeFio}</TableRowColumn>
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
                            <TableRowColumn>{beginDate}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Дата окончания производства работ</TableRowColumn>
                            <TableRowColumn>{endDate}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Дата проведения комиссии по приемке работ</TableRowColumn>
                            <TableRowColumn>{presentationDate}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default KindOfWork;
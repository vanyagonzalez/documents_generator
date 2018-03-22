import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import $ from 'jquery';

const dialogStyle = {
    width: '60%',
    maxWidth: 'none',
};

const marginRight = {
    marginRight: '50px',
};

const floatLeftStyle = {
    float: "left",
    width: "50%",
};

const floatDateLeftStyle = {
    float: "left",
    width: "22%",
};

const floatRightStyle = {
    float: "right",
    width: "50%",
};
const clearBothStyle = {
    clear: "both ",
};

class KindOfWorkDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newKindOfWork: {
                documentationSheet: {},
                executor: {},
                executorRepresentative: {},
                otherRepresentatives: [],
                certificates: [],
                confirmations: [],
            },
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRowSelection = this.onRowSelection.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    handleOpen(){
        const state = this.state;
        state.open=true;
        state.newKindOfWork.documentationSheet.id = this.props.itemId;
        this.setState(state);
    };

    handleClose(){
        this.setState({open: false});
    };

    handleSubmit(e){
        e.preventDefault();
        let updateConstrObj = this.props.updateConstrObj;
        let constrObjId = this.props.constrObjId;
        let otherRepresentatives = this.props.otherRepresentatives;
        let certificates = this.props.certificates;
        let confirmations = this.props.confirmations;

        $.ajax({
            url: '/rest/kindOfWork',
            type: 'POST',
            data: JSON.stringify(this.state.newKindOfWork),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                otherRepresentatives.forEach((obj) => {
                    obj.selected = false;
                });
                certificates.forEach((obj) => {
                    obj.selected = false;
                });
                confirmations.forEach((obj) => {
                    obj.selected = false;
                });
                updateConstrObj(constrObjId);
            }
        });

        this.handleClose();
    };

    onChange(e){
        const state = this.state;
        state.newKindOfWork[e.target.name] = e.target.value;
        this.setState(state);
    }

    onChangeSelect(name, value){
        const state = this.state;
        state.newKindOfWork[name].id = value;
        this.setState(state);
    }

    onRowSelection(rows, type) {
        let state = this.state;

        const selected = [];
        this.props[type].forEach((obj, i) => {
            if (rows.indexOf(i) > -1) {
                selected.push(obj);
            }
            obj.selected = rows.indexOf(i) > -1;
        });

        state.newKindOfWork[type] = selected;
        this.setState(state);
    };

    onChangeDate(date, name){
        const state = this.state;
        state.newKindOfWork[name] = date.getTime();
        this.setState(state);
    }

    render() {
        let executors = [];
        this.props.executors.forEach(function(executor) {
            executors.push(<MenuItem key={"executor_" + executor.id} value={executor.id} primaryText={executor.name} />);
        });

        let executorRepresentatives = [];
        this.props.executorRepresentatives.forEach(function(executorRepresentative) {
            executorRepresentatives.push(<MenuItem key={"executorRepresentative_" + executorRepresentative.id} value={executorRepresentative.id} primaryText={executorRepresentative.fio} />);
        });

        let otherRepresentatives = [];
        this.props.otherRepresentatives.forEach(function(otherRepresentative) {
            otherRepresentatives.push(
            <TableRow key={"otherRepresentative_" + otherRepresentative.id} selected={otherRepresentative.selected}>
                <TableRowColumn>{otherRepresentative.fio}</TableRowColumn>
            </TableRow>
            );
        });

        let selectedOtherRepresentatives = [];
        this.state.newKindOfWork.otherRepresentatives.forEach(function(otherRepresentative) {
            selectedOtherRepresentatives.push(
                <TableRow key={"selectedOtherRepresentatives_" + otherRepresentative.id}>
                    <TableRowColumn>{otherRepresentative.fio}</TableRowColumn>
                </TableRow>
            );
        });

        let certificates = [];
        this.props.allCertificates.forEach(function(certificate) {
            certificates.push(
            <TableRow key={"certificates_" + certificate.id} selected={certificate.selected}>
                <TableRowColumn>{certificate.material}</TableRowColumn>
            </TableRow>
            );
        });

        let selectedCertificates = [];
        this.state.newKindOfWork.certificates.forEach(function(certificate) {
            selectedCertificates.push(
                <TableRow key={"selectedCertificates_" + certificate.id}>
                    <TableRowColumn>{certificate.material}</TableRowColumn>
                </TableRow>
            );
        });

        let confirmations = [];
        this.props.allConfirmations.forEach(function(confirmation) {
            confirmations.push(
            <TableRow key={"confirmation_" + confirmation.id} selected={confirmation.selected}>
                <TableRowColumn>{confirmation.name}</TableRowColumn>
            </TableRow>
            );
        });

        let selectedConfirmations = [];
        this.state.newKindOfWork.confirmations.forEach(function(confirmation) {
            selectedConfirmations.push(
                <TableRow key={"selectedConfirmations_" + confirmation.id}>
                    <TableRowColumn>{confirmation.name}</TableRowColumn>
                </TableRow>
            );
        });

        const actions = [
            <FlatButton label="Отмена" onClick={this.handleClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        const tableHeight = '150px';

        return (
            <div>
                <RaisedButton label="Добавить вид работы" onClick={this.handleOpen} />
                <Dialog
                    title="Новый вид работы"
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={dialogStyle}
                    autoScrollBodyContent={true}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование работы" onChange={this.onChange} style={marginRight} />
                        <TextField name="amountOfWork" floatingLabelText="Объем выполненной работы" onChange={this.onChange} style={marginRight} />
                        <TextField name="measureUnit" floatingLabelText="Единица измерения" onChange={this.onChange} style={marginRight} />
                        <TextField name="additionalReason" floatingLabelText="Дополнительные нормативные документы" onChange={this.onChange}/>
                        <br/>
                        <SelectField value={this.state.newKindOfWork.executor.id} floatingLabelText="Организация фактически выполнившая работу"
                                     onChange={(event, index, value) => this.onChangeSelect("executor", value)}
                                     style={marginRight} >
                            {executors}
                        </SelectField>
                        <SelectField value={this.state.newKindOfWork.executorRepresentative.id} floatingLabelText="Представитель исполнителя работы"
                                     onChange={(event, index, value) => this.onChangeSelect("executorRepresentative", value)}>
                            {executorRepresentatives}
                        </SelectField>
                        <br/>
                        <div style={floatDateLeftStyle}>
                            <DatePicker
                                floatingLabelText="Дата начала производства работ"
                                locale="ru"
                                onChange={(e, date) => this.onChangeDate(date, "beginDate")}
                            />
                        </div>
                        <div style={floatDateLeftStyle}>
                            <DatePicker
                                floatingLabelText="Дата окончания производства работ"
                                locale="ru"
                                onChange={(e, date) => this.onChangeDate(date, "endDate")}
                            />
                        </div>
                        <div style={floatDateLeftStyle}>
                            <DatePicker
                                floatingLabelText="Дата проведения комиссии по приемке работ"
                                locale="ru"
                                onChange={(e, date) => this.onChangeDate(date, "presentationDate")}
                            />
                        </div>
                        <br/>
                        <div style={floatLeftStyle}>
                            <Table
                                height={tableHeight}
                                selectable={true}
                                fixedHeader={true}
                                multiSelectable={true}
                                className={"tableForSelecting"}
                                onRowSelection={(rows) => this.onRowSelection(rows, "otherRepresentatives")}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                                            Возможные представители иных лиц
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={true}
                                    className={"tableBodyForSelecting"}
                                    deselectOnClickaway={false}>
                                    {otherRepresentatives}
                                </TableBody>
                            </Table>
                        </div>
                        <div style={floatRightStyle}>
                            <Table
                                height={tableHeight}
                                fixedHeader={true}
                                className={"tableForSelecting"}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                                            Выбранные представители иных лиц
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} className={"tableBodyForSelecting"}>
                                    {selectedOtherRepresentatives}
                                </TableBody>
                            </Table>
                        </div>
                        <br/>
                        <div style={floatLeftStyle}>
                            <Table
                                height={tableHeight}
                                selectable={true}
                                fixedHeader={true}
                                multiSelectable={true}
                                className={"tableForSelecting"}
                                onRowSelection={(rows) => this.onRowSelection(rows, "certificates")}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                                            Возможные материалы
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={true}
                                    className={"tableBodyForSelecting"}
                                    deselectOnClickaway={false}>
                                    {certificates}
                                </TableBody>
                            </Table>
                        </div>
                        <div style={floatRightStyle}>
                            <Table
                                height={tableHeight}
                                fixedHeader={true}
                                className={"tableForSelecting"}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                                            Выбранные материалы
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} className={"tableBodyForSelecting"}>
                                    {selectedCertificates}
                                </TableBody>
                            </Table>
                        </div>
                        <br/>
                        <div style={floatLeftStyle}>
                            <Table
                                height={tableHeight}
                                selectable={true}
                                fixedHeader={true}
                                multiSelectable={true}
                                className={"tableForSelecting"}
                                onRowSelection={(rows) => this.onRowSelection(rows, "confirmations")}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                                            Возможные документы, подтверждающие качество выполенных работ
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={true}
                                    className={"tableBodyForSelecting"}
                                    deselectOnClickaway={false}>
                                    {confirmations}
                                </TableBody>
                            </Table>
                        </div>
                        <div style={floatRightStyle}>
                            <Table
                                height={tableHeight}
                                fixedHeader={true}
                                className={"tableForSelecting"}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                                            Выбранные документы, подтверждающие качество выполенных работ
                                        </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false} className={"tableBodyForSelecting"}>
                                    {selectedConfirmations}
                                </TableBody>
                            </Table>
                        </div>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default KindOfWorkDlg;
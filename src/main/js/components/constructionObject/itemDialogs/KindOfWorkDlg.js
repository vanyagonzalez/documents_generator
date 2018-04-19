import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
import {Tabs, Tab} from 'material-ui/Tabs';
import * as Constants from '../../../AppConstants';

import $ from 'jquery';

const dialogStyle = {
    width: '40%',
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
    width: "33%",
};

const floatRightStyle = {
    float: "right",
    width: "50%",
};

class KindOfWorkDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'basicInfo',
            restMethod: null,
            dlgTitle: null,
            btnLabel: "кнопка",
            newKindOfWork: {
                documentationSheet: {},
                executor: {},
                executorRepresentative: {},
                otherRepresentatives: [],
                certificates: [],
                confirmations: [],
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRowSelection = this.onRowSelection.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            const operation = nextProps.operation;
            let state = this.state;
            state.newKindOfWork={
                documentationSheet: {
                    id: nextProps.parentId,
                },
                executor: {},
                executorRepresentative: {},
                otherRepresentatives: [],
                certificates: [],
                confirmations: [],
            };

            if (operation === Constants.CREATE) {
                state.restMethod = "POST";
                state.dlgTitle = "Новый вид работы";
                state.btnLabel = "Создать";
            } else if (operation === Constants.COPY || operation === Constants.UPDATE || operation === Constants.DELETE) {
                const item = nextProps.item;
                state.newKindOfWork.name=item.name;
                state.newKindOfWork.amountOfWork=item.amountOfWork;
                state.newKindOfWork.measureUnit=item.measureUnit;
                state.newKindOfWork.executor=item.executor;
                state.newKindOfWork.executorRepresentative=item.executorRepresentative;
                state.newKindOfWork.otherRepresentatives=item.otherRepresentatives;
                state.newKindOfWork.certificates=item.certificates;
                state.newKindOfWork.confirmations=item.confirmations;
                state.newKindOfWork.additionalReason=item.additionalReason;
                state.newKindOfWork.beginDate=item.beginDate;
                state.newKindOfWork.endDate=item.endDate;
                state.newKindOfWork.presentationDate=item.presentationDate;

                if (operation === Constants.COPY) {
                    state.restMethod = "POST";
                    state.dlgTitle = "Новый вид работы";
                    state.btnLabel = "Создать";
                } else if (operation === Constants.UPDATE) {
                    state.newKindOfWork.id=item.id;
                    state.restMethod = "PUT";
                    state.dlgTitle = "Изменение вида работы: " + item.name;
                    state.btnLabel = "Редактировать";
                } else {
                    state.newKindOfWork.id=item.id;
                    state.restMethod = "DELETE";
                    state.dlgTitle = "Удаление вида работы: " + item.name;
                    state.btnLabel = "Удалить";
                }
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const newKindOfWork = this.state.newKindOfWork;
        const updateConstrObj = this.props.updateConstrObj;
        const updateSelectedItem = this.props.updateSelectedItem;
        const operation = this.props.operation;

        $.ajax({
            url: '/rest/kindOfWork',
            type: this.state.restMethod,
            data: JSON.stringify(newKindOfWork),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                updateConstrObj();
                if (operation !== Constants.DELETE) {
                    updateSelectedItem(Constants.KIND_OF_WORK_TYPE, msg.id, true);
                } else {
                    updateSelectedItem(Constants.KIND_OF_WORK_TYPE, null);
                }
            }
        });

        this.props.onClose();
    };

    onChange(e){
        const state = this.state;
        state.newKindOfWork[e.target.name] = e.target.value;
        // this.setState(state);
    }

    onChangeSelect(name, value){
        const state = this.state;
        if (typeof state.newKindOfWork[name] === 'undefined' || typeof state.newKindOfWork[name]) {
            state.newKindOfWork[name] = {};
        }
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
        // this.setState(state);
    }

    handleChange(value) {
        this.setState({
            value: value,
        });
    };

    render() {
        let dialog;
        if (this.props.open) {
            const executors = [];
            this.props.executors.forEach(function(executor) {
                executors.push(<MenuItem key={"executor_" + executor.id} value={executor.id} primaryText={executor.name} />);
            });

            const executorRepresentatives = [];
            this.props.executorRepresentatives.forEach(function(executorRepresentative) {
                executorRepresentatives.push(<MenuItem key={"executorRepresentative_" + executorRepresentative.id} value={executorRepresentative.id} primaryText={executorRepresentative.person.fio} />);
            });

            const selectedOtherRepresentatives = [];
            const selectedOtherRepresentativesIds = [];
            this.state.newKindOfWork.otherRepresentatives.forEach(function(otherRepresentative) {
                selectedOtherRepresentatives.push(
                    <TableRow key={"selectedOtherRepresentatives_" + otherRepresentative.id}>
                        <TableRowColumn>{otherRepresentative.person.fio}</TableRowColumn>
                    </TableRow>
                );
                selectedOtherRepresentativesIds.push(otherRepresentative.id);
            });

            const otherRepresentatives = [];
            this.props.otherRepresentatives.forEach(function(otherRepresentative) {
                const selected = selectedOtherRepresentativesIds.includes(otherRepresentative.id);
                otherRepresentatives.push(
                    <TableRow key={"otherRepresentative_" + otherRepresentative.id} selected={selected}>
                        <TableRowColumn>{otherRepresentative.person.fio}</TableRowColumn>
                    </TableRow>
                );
            });

            const selectedCertificates = [];
            const selectedCertificatesIds = [];
            this.state.newKindOfWork.certificates.forEach(function(certificate) {
                selectedCertificates.push(
                    <TableRow key={"selectedCertificates_" + certificate.id}>
                        <TableRowColumn>{certificate.material}</TableRowColumn>
                    </TableRow>
                );
                selectedCertificatesIds.push(certificate.id);
            });

            const certificates = [];
            this.props.certificates.forEach(function(certificate) {
                const selected = selectedCertificatesIds.includes(certificate.id);
                certificates.push(
                <TableRow key={"certificates_" + certificate.id} selected={selected}>
                    <TableRowColumn>{certificate.material}</TableRowColumn>
                </TableRow>
                );
            });

            const selectedConfirmations = [];
            const selectedConfirmationsIds = [];
            this.state.newKindOfWork.confirmations.forEach(function(confirmation) {
                selectedConfirmations.push(
                    <TableRow key={"selectedConfirmations_" + confirmation.id}>
                        <TableRowColumn>{confirmation.name}</TableRowColumn>
                    </TableRow>
                );
                selectedConfirmationsIds.push(confirmation.id);
            });

            const confirmations = [];
            this.props.confirmations.forEach(function(confirmation) {
                const selected = selectedConfirmationsIds.includes(confirmation.id);
                confirmations.push(
                <TableRow key={"confirmation_" + confirmation.id} selected={selected}>
                    <TableRowColumn>{confirmation.name}</TableRowColumn>
                </TableRow>
                );
            });

            const actions = [
                <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
                <FlatButton type="submit" label={this.state.btnLabel} primary={true} key="submit"/>,
            ];

            const tableHeight = '150px';
            const tabStyle = {height: '40vh'};
            const isDisabled = this.props.operation === Constants.DELETE;

            let beginDate;
            if (this.state.newKindOfWork.beginDate) {
                beginDate = new Date(this.state.newKindOfWork.beginDate);
            }

            let endDate;
            if (this.state.newKindOfWork.endDate) {
                endDate = new Date(this.state.newKindOfWork.endDate);
            }

            let presentationDate;
            if (this.state.newKindOfWork.presentationDate) {
                presentationDate = new Date(this.state.newKindOfWork.presentationDate);
            }

            let executorId;
            if (this.state.newKindOfWork.executor) {
                executorId = this.state.newKindOfWork.executor.id;
            }

            let executorRepresentativeId;
            if (this.state.newKindOfWork.executorRepresentative) {
                executorRepresentativeId = this.state.newKindOfWork.executorRepresentative.id;
            }

            dialog =
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                    contentStyle={dialogStyle}
                    autoScrollBodyContent={true}
                >
                    <form onSubmit={this.handleSubmit}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            style={tabStyle}
                        >
                            <Tab label="Основная информация" value="basicInfo">
                                <TextField name="name" floatingLabelText="Наименование работы" disabled={isDisabled} defaultValue={this.state.newKindOfWork.name} onChange={this.onChange} style={marginRight} />
                                <br/>
                                <TextField name="amountOfWork" floatingLabelText="Объем выполненной работы" disabled={isDisabled} defaultValue={this.state.newKindOfWork.amountOfWork} onChange={this.onChange} style={marginRight} />
                                <TextField name="measureUnit" floatingLabelText="Единица измерения" disabled={isDisabled} defaultValue={this.state.newKindOfWork.measureUnit} onChange={this.onChange} style={marginRight} />
                                <br/>
                                <TextField name="additionalReason" floatingLabelText="Дополнительные нормативные документы" disabled={isDisabled} defaultValue={this.state.newKindOfWork.additionalReason} onChange={this.onChange}/>
                                <br/>

                                <div style={floatDateLeftStyle}>
                                    <DatePicker
                                        floatingLabelText="Дата начала производства работ"
                                        disabled={isDisabled}
                                        defaultDate={beginDate}
                                        onChange={(e, date) => this.onChangeDate(date, "beginDate")}
                                    />
                                </div>
                                <div style={floatDateLeftStyle}>
                                    <DatePicker
                                        floatingLabelText="Дата окончания производства работ"
                                        disabled={isDisabled}
                                        defaultDate={endDate}
                                        onChange={(e, date) => this.onChangeDate(date, "endDate")}
                                    />
                                </div>
                                <div style={floatDateLeftStyle}>
                                    <DatePicker
                                        floatingLabelText="Дата проведения комиссии по приемке работ"
                                        disabled={isDisabled}
                                        defaultDate={presentationDate}
                                        onChange={(e, date) => this.onChangeDate(date, "presentationDate")}
                                    />
                                </div>
                            </Tab>
                            <Tab label="Представители" value="representatives">
                                <SelectField value={executorId} floatingLabelText="Организация фактически выполнившая работу"
                                             onChange={(event, index, value) => this.onChangeSelect("executor", value)}
                                             disabled={isDisabled}
                                             style={marginRight} >
                                    {executors}
                                </SelectField>
                                <SelectField value={executorRepresentativeId} floatingLabelText="Представитель исполнителя работы"
                                             onChange={(event, index, value) => this.onChangeSelect("executorRepresentative", value)}
                                             disabled={isDisabled}>
                                    {executorRepresentatives}
                                </SelectField>
                                <br/>
                                <div style={floatLeftStyle}>
                                    <Table
                                        height={tableHeight}
                                        selectable={!isDisabled}
                                        fixedHeader={true}
                                        multiSelectable={true}
                                        className={"tableForSelecting"}
                                        onRowSelection={(rows) => this.onRowSelection(rows, "otherRepresentatives")}
                                    >
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
                                        className={"tableForSelecting"}
                                        disabled={isDisabled}
                                    >
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
                            </Tab>
                            <Tab label="Материалы" value="certificates">
                                <div style={floatLeftStyle}>
                                    <Table
                                        height={tableHeight}
                                        selectable={!isDisabled}
                                        fixedHeader={true}
                                        multiSelectable={true}
                                        className={"tableForSelecting"}
                                        onRowSelection={(rows) => this.onRowSelection(rows, "certificates")}
                                    >
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
                                        className={"tableForSelecting"}
                                        disabled={isDisabled}
                                    >
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
                                        selectable={!isDisabled}
                                        fixedHeader={true}
                                        multiSelectable={true}
                                        className={"tableForSelecting"}
                                        onRowSelection={(rows) => this.onRowSelection(rows, "confirmations")}
                                    >
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
                                        className={"tableForSelecting"}
                                        disabled={isDisabled}
                                    >
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
                            </Tab>
                        </Tabs>

                        <br/>
                        {actions}
                    </form>
                </Dialog>
        }

        return (
            <div>
                {dialog}
            </div>
        );
    }
}

export default KindOfWorkDlg;
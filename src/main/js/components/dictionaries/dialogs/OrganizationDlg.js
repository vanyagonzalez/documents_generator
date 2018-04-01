const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import $ from 'jquery';

const create = "creacte";
const update = "update";
const del = "delete";

class OrganizationDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restMethod: null,
            dlgTitle: null,
            btnLabel: "Не задан",
            newOrganization: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const operation = nextProps.operation;

        let state = this.state;
        state.newOrganization={};
        if (operation === create) {
            state.restMethod = "POST";
            state.dlgTitle = "Новая организация";
            state.btnLabel = "Создать";
            state.sroIssuedDate = null;
        } else if (operation === update || operation === del){
            const dlgData = nextProps.dlgData;

            if (dlgData.sroIssuedDate) {
                state.sroIssuedDate = new Date(dlgData.sroIssuedDate);
            }
            state.newOrganization.id=dlgData.id;
            state.newOrganization.name=dlgData.name;
            state.newOrganization.ogrn=dlgData.ogrn;
            state.newOrganization.inn=dlgData.inn;
            state.newOrganization.sroNumber=dlgData.sroNumber;
            state.newOrganization.organizationIssuingSro=dlgData.organizationIssuingSro;
            state.newOrganization.sroIssuedDate=dlgData.sroIssuedDate;
            state.newOrganization.address=dlgData.address;
            state.newOrganization.phoneNumber=dlgData.phoneNumber;
            state.newOrganization.faxNumber=dlgData.faxNumber;

            if (operation === update) {
                state.restMethod = "PUT";
                state.dlgTitle = "Редактирование организации: " + dlgData.name;
                state.btnLabel = "Редактировать";
            } else {
                state.restMethod = "DELETE";
                state.dlgTitle = "Удаление организации: " + dlgData.name;
                state.btnLabel = "Удалить";
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const loadOrganizations = this.props.loadOrganizations;
        const loadEmployees = this.props.loadEmployees;
        const onDataUpdate = this.props.onDataUpdate;
        const operation = this.props.operation;

        $.ajax({
            url: '/rest/organization',
            type: this.state.restMethod,
            data: JSON.stringify(this.state.newOrganization),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadOrganizations();
                if (operation !== create) {
                    loadEmployees();
                }
                if (operation !== del) {
                    onDataUpdate("organization", msg.id);
                } else {
                    onDataUpdate("organization", null);
                }
            }
        });

        this.props.onClose();
    };

    onChange(e){
        const state = this.state;
        state.newOrganization[e.target.name] = e.target.value;
    }

    onChangeDate(date, name){
        const state = this.state;
        state.newOrganization[name] = date.getTime();
    }

    render() {
        const actions = [
            <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label={this.state.btnLabel} primary={true} key="submit"/>,
        ];

        const isDisabled = this.props.operation === del;

        return (
            <div>
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование" disabled={isDisabled} defaultValue={this.state.newOrganization.name} onChange={this.onChange}/>
                        <br/>
                        <TextField name="ogrn" floatingLabelText="ОГРН" disabled={isDisabled} defaultValue={this.state.newOrganization.ogrn} onChange={this.onChange}/>
                        <br/>
                        <TextField name="inn" floatingLabelText="ИНН" disabled={isDisabled} defaultValue={this.state.newOrganization.inn} onChange={this.onChange}/>
                        <br/>
                        <TextField name="sroNumber" floatingLabelText="Номер СРО" disabled={isDisabled} defaultValue={this.state.newOrganization.sroNumber} onChange={this.onChange}/>
                        <br/>
                        <TextField name="organizationIssuingSro" floatingLabelText="СР выдавшая СРО" disabled={isDisabled} defaultValue={this.state.newOrganization.organizationIssuingSro} onChange={this.onChange}/>
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата выдачи СРО"
                            disabled={isDisabled}
                            defaultDate={this.state.sroIssuedDate}
                            onChange={(e, date) => this.onChangeDate(date, "sroIssuedDate")}
                        />
                        <br/>
                        <TextField name="address" floatingLabelText="Юридический адрес организации" disabled={isDisabled} defaultValue={this.state.newOrganization.address} onChange={this.onChange}/>
                        <br/>
                        <TextField name="phoneNumber" floatingLabelText="Номер телефона организации" disabled={isDisabled} defaultValue={this.state.newOrganization.phoneNumber} onChange={this.onChange}/>
                        <br/>
                        <TextField name="faxNumber" floatingLabelText="Номер факса организации" disabled={isDisabled} defaultValue={this.state.newOrganization.faxNumber} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default OrganizationDlg;
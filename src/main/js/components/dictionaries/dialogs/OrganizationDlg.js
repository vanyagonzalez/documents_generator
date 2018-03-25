const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import $ from 'jquery';

class OrganizationDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreate: null,
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
        const updatingOrganization = nextProps.updatingOrganization;

        let state = this.state;
        if (updatingOrganization !== null) {
            state.isCreate = false;
            state.restMethod = "PUT";
            state.dlgTitle = "Изменение организации: " + updatingOrganization.name;
            state.btnLabel = "Редактировать";
            if (updatingOrganization.sroIssuedDate) {
                state.sroIssuedDate = new Date(updatingOrganization.sroIssuedDate);
            }

            state.newOrganization.id=updatingOrganization.id;
            state.newOrganization.name=updatingOrganization.name;
            state.newOrganization.ogrn=updatingOrganization.ogrn;
            state.newOrganization.inn=updatingOrganization.inn;
            state.newOrganization.sroNumber=updatingOrganization.sroNumber;
            state.newOrganization.organizationIssuingSro=updatingOrganization.organizationIssuingSro;
            state.newOrganization.sroIssuedDate=updatingOrganization.sroIssuedDate;
            state.newOrganization.address=updatingOrganization.address;
            state.newOrganization.phoneNumber=updatingOrganization.phoneNumber;
            state.newOrganization.faxNumber=updatingOrganization.faxNumber;
        } else {
            state.isCreate = true;
            state.restMethod = "POST";
            state.dlgTitle = "Новая организация";
            state.btnLabel = "Создать";
            state.sroIssuedDate = null;
            Object.keys(state.newOrganization).forEach(function(key,index) {
                state.newOrganization[key] = null;
            });
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let loadOrganizations = this.props.loadOrganizations;
        let onDataUpdate = this.props.onDataUpdate;
        let isCreate = this.state.isCreate;
        //нужен клон, чтоб не менялись поля у выбранного объекта
        let newOrganization = $.extend({}, this.state.newOrganization);

        $.ajax({
            url: '/rest/organization',
            type: this.state.restMethod,
            data: JSON.stringify(newOrganization),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadOrganizations();
                if (!isCreate) {
                    onDataUpdate("organization", newOrganization);
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

        return (
            <div>
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование" defaultValue={this.state.newOrganization.name} onChange={this.onChange}/>
                        <br/>
                        <TextField name="ogrn" floatingLabelText="ОГРН" defaultValue={this.state.newOrganization.ogrn} onChange={this.onChange}/>
                        <br/>
                        <TextField name="inn" floatingLabelText="ИНН" defaultValue={this.state.newOrganization.inn} onChange={this.onChange}/>
                        <br/>
                        <TextField name="sroNumber" floatingLabelText="Номер СРО" defaultValue={this.state.newOrganization.sroNumber} onChange={this.onChange}/>
                        <br/>
                        <TextField name="organizationIssuingSro" floatingLabelText="СР выдавшая СРО" defaultValue={this.state.newOrganization.organizationIssuingSro} onChange={this.onChange}/>
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата выдачи СРО"
                            defaultDate={this.state.sroIssuedDate}
                            onChange={(e, date) => this.onChangeDate(date, "sroIssuedDate")}
                        />
                        <br/>
                        <TextField name="address" floatingLabelText="Юридический адрес организации" defaultValue={this.state.newOrganization.address} onChange={this.onChange}/>
                        <br/>
                        <TextField name="phoneNumber" floatingLabelText="Номер телефона организации" defaultValue={this.state.newOrganization.phoneNumber} onChange={this.onChange}/>
                        <br/>
                        <TextField name="faxNumber" floatingLabelText="Номер факса организации" defaultValue={this.state.newOrganization.faxNumber} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default OrganizationDlg;
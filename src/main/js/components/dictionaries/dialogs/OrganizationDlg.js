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
            newOrganization: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let loadOrganizations = this.props.loadOrganizations;

        $.ajax({
            url: '/rest/organization',
            type: 'POST',
            data: JSON.stringify(this.state.newOrganization),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadOrganizations();
            }
        });

        this.props.onClose();
    };

    onChange(e){
        const state = this.state;
        state.newOrganization[e.target.name] = e.target.value;
        this.setState(state);
    }

    onChangeDate(date, name){
        const state = this.state;
        state.newOrganization[name] = date.getTime();
        this.setState(state);
    }

    render() {
        const actions = [
            <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        return (
            <div>
                <Dialog
                    title="Новая организация"
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование" onChange={this.onChange}/>
                        <br/>
                        <TextField name="ogrn" floatingLabelText="ОГРН" onChange={this.onChange}/>
                        <br/>
                        <TextField name="inn" floatingLabelText="ИНН" onChange={this.onChange}/>
                        <br/>
                        <TextField name="sroNumber" floatingLabelText="Номер СРО" onChange={this.onChange}/>
                        <br/>
                        <TextField name="organizationIssuingSro" floatingLabelText="СР выдавшая СРО" onChange={this.onChange}/>
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата выдачи СРО"
                            locale="ru"
                            onChange={(e, date) => this.onChangeDate(date, "sroIssuedDate")}
                        />
                        <br/>
                        <TextField name="address" floatingLabelText="Юридический адрес организации" onChange={this.onChange}/>
                        <br/>
                        <TextField name="phoneNumber" floatingLabelText="Номер телефона организации" onChange={this.onChange}/>
                        <br/>
                        <TextField name="faxNumber" floatingLabelText="Номер факса организации" onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default OrganizationDlg;
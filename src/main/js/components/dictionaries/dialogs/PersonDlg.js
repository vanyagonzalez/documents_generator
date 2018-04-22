const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as Constants from '../../../AppConstants';
import $ from 'jquery';

class PersonDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restMethod: null,
            dlgTitle: null,
            btnLabel: "Не задан",
            newPerson: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const operation = nextProps.operation;

        let state = this.state;
        state.newPerson={};
        if (operation === Constants.CREATE) {
            state.restMethod = "POST";
            state.dlgTitle = "Новая персона";
            state.btnLabel = "Создать";
        } else if (operation === Constants.COPY || operation === Constants.UPDATE || operation === Constants.DELETE) {
            const dlgData = nextProps.dlgData;
            state.newPerson.surname=dlgData.surname;
            state.newPerson.name=dlgData.name;
            state.newPerson.middleName=dlgData.middleName;

            if (operation === Constants.COPY) {
                state.restMethod = "POST";
                state.dlgTitle = "Новая персона";
                state.btnLabel = "Создать";
            } else if (operation === Constants.UPDATE) {
                state.newPerson.id=dlgData.id;
                state.restMethod = "PUT";
                state.dlgTitle = "Изменение персоны: " + dlgData.fio;
                state.btnLabel = "Редактировать";
            } else {
                state.newPerson.id=dlgData.id;
                state.restMethod = "DELETE";
                state.dlgTitle = "Удаление персоны: " + dlgData.fio;
                state.btnLabel = "Удалить";
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let loadPersons = this.props.loadPersons;
        let loadEmployees = this.props.loadEmployees;
        let onDataUpdate = this.props.onDataUpdate;
        const operation = this.props.operation;

        $.ajax({
            url: '/rest/person',
            type: this.state.restMethod,
            data: JSON.stringify(this.state.newPerson),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadPersons();
                if (operation !== Constants.CREATE) {
                    loadEmployees();
                }
                if (operation !== Constants.DELETE) {
                    onDataUpdate("person", msg.id);
                } else {
                    onDataUpdate("person", null);
                }
            }
        });

        this.props.onClose();
    };

    onChange(e){
        const state = this.state;
        state.newPerson[e.target.name] = e.target.value;
    }

    onChangeDate(date, name){
        const state = this.state;
        state.newPerson[name] = date.getTime();
    }

    render() {
        const actions = [
            <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label={this.state.btnLabel} primary={true} key="submit"/>,
        ];

        const isDisabled = this.props.operation === Constants.DELETE;

        return (
            <div>
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="surname" floatingLabelText="Фамилия" disabled={isDisabled} defaultValue={this.state.newPerson.surname} onChange={this.onChange}/>
                        <br/>
                        <TextField name="name" floatingLabelText="Имя" disabled={isDisabled} defaultValue={this.state.newPerson.name} onChange={this.onChange}/>
                        <br/>
                        <TextField name="middleName" floatingLabelText="Отчество" disabled={isDisabled} defaultValue={this.state.newPerson.middleName} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default PersonDlg;
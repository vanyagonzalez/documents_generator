const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import $ from 'jquery';

class PersonDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreate: null,
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
        const updatingPerson = nextProps.updatingPerson;

        let state = this.state;
        if (updatingPerson !== null) {
            state.isCreate = false;
            state.restMethod = "PUT";
            state.dlgTitle = "Изменение персоны: " + updatingPerson.fio;
            state.btnLabel = "Редактировать";

            state.newPerson.id=updatingPerson.id;
            state.newPerson.surname=updatingPerson.surname;
            state.newPerson.name=updatingPerson.name;
            state.newPerson.middleName=updatingPerson.middleName;
        } else {
            state.isCreate = true;
            state.restMethod = "POST";
            state.dlgTitle = "Новая персона";
            state.btnLabel = "Создать";
            Object.keys(state.newPerson).forEach(function(key, index) {
                state.newPerson[key] = null;
            });
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let loadPersons = this.props.loadPersons;
        let onDataUpdate = this.props.onDataUpdate;
        let isCreate = this.state.isCreate;
        //нужен клон, чтоб не менялись поля у выбранного объекта
        let newPerson = $.extend({}, this.state.newPerson);

        $.ajax({
            url: '/rest/person',
            type: this.state.restMethod,
            data: JSON.stringify(newPerson),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadPersons();
                if (!isCreate) {
                    onDataUpdate("person", newPerson);
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

        return (
            <div>
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="surname" floatingLabelText="Фамилия" defaultValue={this.state.newPerson.surname} onChange={this.onChange}/>
                        <br/>
                        <TextField name="name" floatingLabelText="Имя" defaultValue={this.state.newPerson.name} onChange={this.onChange}/>
                        <br/>
                        <TextField name="middleName" floatingLabelText="Отчество" defaultValue={this.state.newPerson.middleName} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default PersonDlg;
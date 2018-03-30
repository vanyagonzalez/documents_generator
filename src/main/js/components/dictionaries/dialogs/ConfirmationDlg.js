const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import $ from 'jquery';

class ConfirmationDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restMethod: null,
            dlgTitle: null,
            btnLabel: "Не задан",
            newConfirmation: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const updatingConfirmation = nextProps.updatingConfirmation;

        let state = this.state;
        state.newCertificate={};
        if (updatingConfirmation !== null) {
            state.restMethod = "PUT";
            state.dlgTitle = "Изменение подтверждения: " + updatingConfirmation.name;
            state.btnLabel = "Редактировать";

            state.newConfirmation.id=updatingConfirmation.id;
            state.newConfirmation.name=updatingConfirmation.name;
            state.newConfirmation.number=updatingConfirmation.number;
            state.newConfirmation.issueDate=updatingConfirmation.issueDate;
            state.newConfirmation.copy=updatingConfirmation.copy;
        } else {
            state.restMethod = "POST";
            state.dlgTitle = "Новое подтверждение";
            state.btnLabel = "Создать";
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let loadConfirmations = this.props.loadConfirmations;
        let onDataUpdate = this.props.onDataUpdate;

        $.ajax({
            url: '/rest/confirmation',
            type: this.state.restMethod,
            data: JSON.stringify(this.state.newConfirmation),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadConfirmations();
                onDataUpdate("confirmation", msg.id);
            }
        });

        this.props.onClose();
    };

    onChange(e){
        const state = this.state;
        state.newConfirmation[e.target.name] = e.target.value;
        this.setState(state);
    }

    onChangeDate(date, name){
        const state = this.state;
        state.newConfirmation[name] = date.getTime();
        this.setState(state);
    }

    render() {
        const actions = [
            <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label={this.state.btnLabel} primary={true} key="submit"/>,
        ];

        let issueDate;
        if (this.state.newConfirmation.issueDate) {
            issueDate = new Date(this.state.newConfirmation.issueDate);
        }

        return (
            <div>
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование документа" defaultValue={this.state.newConfirmation.name} onChange={this.onChange}/>
                        <br/>
                        <TextField name="number" floatingLabelText="Номер документа" defaultValue={this.state.newConfirmation.number} onChange={this.onChange}/>
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата выдачи документа"
                            defaultDate={issueDate}
                            onChange={(e, date) => this.onChangeDate(date, "issueDate")}
                        />
                        <br/>
                        <TextField name="copy" floatingLabelText="Скан-копия документа" defaultValue={this.state.newConfirmation.copy} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmationDlg;
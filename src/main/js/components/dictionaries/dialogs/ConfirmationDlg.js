const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import $ from 'jquery';

const create = "create";
const update = "update";
const del = "delete";

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
        const operation = nextProps.operation;
        let state = this.state;
        state.newCertificate={};
        if (operation === create) {
            state.restMethod = "POST";
            state.dlgTitle = "Новое подтверждение";
            state.btnLabel = "Создать";
        } else if (operation === update || operation === del) {
            const dlgData = nextProps.dlgData;
            state.newConfirmation.id=dlgData.id;
            state.newConfirmation.name=dlgData.name;
            state.newConfirmation.number=dlgData.number;
            state.newConfirmation.issueDate=dlgData.issueDate;
            state.newConfirmation.copy=dlgData.copy;

            if (operation === update) {
                state.restMethod = "PUT";
                state.dlgTitle = "Изменение подтверждения: " + dlgData.name;
                state.btnLabel = "Редактировать";
            } else {
                state.restMethod = "DELETE";
                state.dlgTitle = "Удаление подтверждения: " + dlgData.name;
                state.btnLabel = "Удалить";
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const loadConfirmations = this.props.loadConfirmations;
        const onDataUpdate = this.props.onDataUpdate;
        const operation = this.props.operation;

        $.ajax({
            url: '/rest/confirmation',
            type: this.state.restMethod,
            data: JSON.stringify(this.state.newConfirmation),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadConfirmations();
                if (operation !== del) {
                    onDataUpdate("confirmation", msg.id);
                } else {
                    onDataUpdate("confirmation", null);
                }
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
                        <TextField name="name" floatingLabelText="Наименование документа" disabled={isDisabled} defaultValue={this.state.newConfirmation.name} onChange={this.onChange}/>
                        <br/>
                        <TextField name="number" floatingLabelText="Номер документа" disabled={isDisabled} defaultValue={this.state.newConfirmation.number} onChange={this.onChange}/>
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата выдачи документа"
                            disabled={isDisabled}
                            defaultDate={issueDate}
                            onChange={(e, date) => this.onChangeDate(date, "issueDate")}
                        />
                        <br/>
                        <TextField name="copy" floatingLabelText="Скан-копия документа" disabled={isDisabled} defaultValue={this.state.newConfirmation.copy} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmationDlg;
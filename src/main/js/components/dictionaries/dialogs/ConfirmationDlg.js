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
            newConfirmation: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let loadConfirmations = this.props.loadConfirmations;

        $.ajax({
            url: '/rest/confirmation',
            type: 'POST',
            data: JSON.stringify(this.state.newConfirmation),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadConfirmations();
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
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        return (
            <div>
                <Dialog
                    title="Новая сертификат"
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование документа" onChange={this.onChange}/>
                        <br/>
                        <TextField name="number" floatingLabelText="Номер документа" onChange={this.onChange}/>
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата выдачи документа"
                            onChange={(e, date) => this.onChangeDate(date, "issueDate")}
                        />
                        <br/>
                        <TextField name="copy" floatingLabelText="Скан-копия документа" onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmationDlg;
const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import $ from 'jquery';

class CertificateDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCertificate: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let loadCertificates = this.props.loadCertificates;

        $.ajax({
            url: '/rest/certificate',
            type: 'POST',
            data: JSON.stringify(this.state.newCertificate),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadCertificates();
            }
        });

        this.props.onClose();
    };

    onChange(e){
        const state = this.state;
        state.newCertificate[e.target.name] = e.target.value;
        this.setState(state);
    }

    onChangeDate(date, name){
        const state = this.state;
        state.newCertificate[name] = date.getTime();
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
                        <TextField name="material" floatingLabelText="Наименование сертифицируемого материала" onChange={this.onChange}/>
                        <br/>
                        <TextField name="standardDocument" floatingLabelText="Нормативный документ" onChange={this.onChange}/>
                        <br/>
                        <TextField name="documentKind" floatingLabelText="Вид документа" onChange={this.onChange}/>
                        <br/>
                        <TextField name="documentNumber" floatingLabelText="Нормер документа" onChange={this.onChange}/>
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата выдачи документа"
                            onChange={(e, date) => this.onChangeDate(date, "documentDate")}
                        />
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата окончания срока действия документа"
                            onChange={(e, date) => this.onChangeDate(date, "documentEndDate")}
                        />
                        <br/>
                        <TextField name="materialVolume" floatingLabelText="Объем материала" onChange={this.onChange}/>
                        <br/>
                        <TextField name="measureUnit" floatingLabelText="Единица измерения объема материала" onChange={this.onChange}/>
                        <br/>
                        <TextField name="documentCopy" floatingLabelText="Скан-копия документа" onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default CertificateDlg;
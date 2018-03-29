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
            restMethod: null,
            dlgTitle: null,
            btnLabel: "Не задан",
            newCertificate: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const updatingCertificate = nextProps.updatingCertificate;

        let state = this.state;
        state.newCertificate={};
        if (updatingCertificate !== null) {
            state.restMethod = "PUT";
            state.dlgTitle = "Изменение сертификата: " + updatingCertificate.material;
            state.btnLabel = "Редактировать";

            state.newCertificate.id=updatingCertificate.id;
            state.newCertificate.material=updatingCertificate.material;
            state.newCertificate.standardDocument=updatingCertificate.standardDocument;
            state.newCertificate.documentKind=updatingCertificate.documentKind;
            state.newCertificate.documentNumber=updatingCertificate.documentNumber;
            state.newCertificate.documentDate=updatingCertificate.documentDate;
            state.newCertificate.documentEndDate=updatingCertificate.documentEndDate;
            state.newCertificate.materialVolume=updatingCertificate.materialVolume;
            state.newCertificate.measureUnit=updatingCertificate.measureUnit;
            state.newCertificate.documentCopy=updatingCertificate.documentCopy;
        } else {
            state.restMethod = "POST";
            state.dlgTitle = "Новый сертификат";
            state.btnLabel = "Создать";
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let loadCertificates = this.props.loadCertificates;
        let onDataUpdate = this.props.onDataUpdate;

        $.ajax({
            url: '/rest/certificate',
            type: this.state.restMethod,
            data: JSON.stringify(this.state.newCertificate),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadCertificates();
                onDataUpdate("certificate", msg);
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
            <FlatButton type="submit" label={this.state.btnLabel} primary={true} key="submit"/>,
        ];

        let documentDate;
        if (this.state.newCertificate.documentDate) {
            documentDate = new Date(this.state.newCertificate.documentDate);
        }
        let documentEndDate;
        if (this.state.newCertificate.documentEndDate) {
            documentEndDate = new Date(this.state.newCertificate.documentEndDate);
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
                        <TextField name="material" floatingLabelText="Наименование сертифицируемого материала" defaultValue={this.state.newCertificate.material} onChange={this.onChange}/>
                        <br/>
                        <TextField name="standardDocument" floatingLabelText="Нормативный документ" defaultValue={this.state.newCertificate.standardDocument} onChange={this.onChange}/>
                        <br/>
                        <TextField name="documentKind" floatingLabelText="Вид документа" defaultValue={this.state.newCertificate.documentKind} onChange={this.onChange}/>
                        <br/>
                        <TextField name="documentNumber" floatingLabelText="Нормер документа" defaultValue={this.state.newCertificate.documentNumber} onChange={this.onChange}/>
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата выдачи документа"
                            defaultDate={documentDate}
                            onChange={(e, date) => this.onChangeDate(date, "documentDate")}
                        />
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата окончания срока действия документа"
                            defaultDate={documentEndDate}
                            onChange={(e, date) => this.onChangeDate(date, "documentEndDate")}
                        />
                        <br/>
                        <TextField name="materialVolume" floatingLabelText="Объем материала" defaultValue={this.state.newCertificate.materialVolume} onChange={this.onChange}/>
                        <br/>
                        <TextField name="measureUnit" floatingLabelText="Единица измерения объема материала" defaultValue={this.state.newCertificate.measureUnit} onChange={this.onChange}/>
                        <br/>
                        <TextField name="documentCopy" floatingLabelText="Скан-копия документа" defaultValue={this.state.newCertificate.documentCopy} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default CertificateDlg;
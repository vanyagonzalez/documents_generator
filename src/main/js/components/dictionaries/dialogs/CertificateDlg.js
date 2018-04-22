const React = require('react');

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import * as Constants from '../../../AppConstants';
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
        const operation = nextProps.operation;
        let state = this.state;
        state.newCertificate={};
        if (operation === Constants.CREATE) {
            state.restMethod = "POST";
            state.dlgTitle = "Новый сертификат";
            state.btnLabel = "Создать";
        } else if (operation === Constants.COPY || operation === Constants.UPDATE || operation === Constants.DELETE) {
            const dlgData = nextProps.dlgData;
            state.newCertificate.material=dlgData.material;
            state.newCertificate.standardDocument=dlgData.standardDocument;
            state.newCertificate.documentKind=dlgData.documentKind;
            state.newCertificate.documentNumber=dlgData.documentNumber;
            state.newCertificate.documentDate=dlgData.documentDate;
            state.newCertificate.documentEndDate=dlgData.documentEndDate;
            state.newCertificate.materialVolume=dlgData.materialVolume;
            state.newCertificate.measureUnit=dlgData.measureUnit;
            state.newCertificate.documentCopy=dlgData.documentCopy;

            if (operation === Constants.COPY) {
                state.restMethod = "POST";
                state.dlgTitle = "Новый сертификат";
                state.btnLabel = "Создать";
            } else if (operation === Constants.UPDATE) {
                state.newCertificate.id=dlgData.id;
                state.restMethod = "PUT";
                state.dlgTitle = "Изменение сертификата: " + dlgData.material;
                state.btnLabel = "Редактировать";
            } else {
                state.newCertificate.id=dlgData.id;
                state.restMethod = "DELETE";
                state.dlgTitle = "Удаление сертификата: " + dlgData.material;
                state.btnLabel = "Удалить";
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const loadCertificates = this.props.loadCertificates;
        const onDataUpdate = this.props.onDataUpdate;
        const operation = this.props.operation;

        $.ajax({
            url: '/rest/certificate',
            type: this.state.restMethod,
            data: JSON.stringify(this.state.newCertificate),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                loadCertificates();
                if (operation !== Constants.DELETE) {
                    onDataUpdate("certificate", msg.id);
                } else {
                    onDataUpdate("certificate", null);
                }
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
                        <TextField name="material" floatingLabelText="Наименование сертифицируемого материала" disabled={isDisabled} defaultValue={this.state.newCertificate.material} onChange={this.onChange}/>
                        <br/>
                        <TextField name="standardDocument" floatingLabelText="Нормативный документ" disabled={isDisabled} defaultValue={this.state.newCertificate.standardDocument} onChange={this.onChange}/>
                        <br/>
                        <TextField name="documentKind" floatingLabelText="Вид документа" disabled={isDisabled} defaultValue={this.state.newCertificate.documentKind} onChange={this.onChange}/>
                        <br/>
                        <TextField name="documentNumber" floatingLabelText="Нормер документа" disabled={isDisabled} defaultValue={this.state.newCertificate.documentNumber} onChange={this.onChange}/>
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата выдачи документа"
                            disabled={isDisabled}
                            defaultDate={documentDate}
                            onChange={(e, date) => this.onChangeDate(date, "documentDate")}
                        />
                        <br/>
                        <DatePicker
                            floatingLabelText="Дата окончания срока действия документа"
                            disabled={isDisabled}
                            defaultDate={documentEndDate}
                            onChange={(e, date) => this.onChangeDate(date, "documentEndDate")}
                        />
                        <br/>
                        <TextField name="materialVolume" floatingLabelText="Объем материала" disabled={isDisabled} defaultValue={this.state.newCertificate.materialVolume} onChange={this.onChange}/>
                        <br/>
                        <TextField name="measureUnit" floatingLabelText="Единица измерения объема материала" disabled={isDisabled} defaultValue={this.state.newCertificate.measureUnit} onChange={this.onChange}/>
                        <br/>
                        <TextField name="documentCopy" floatingLabelText="Скан-копия документа" disabled={isDisabled} defaultValue={this.state.newCertificate.documentCopy} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default CertificateDlg;
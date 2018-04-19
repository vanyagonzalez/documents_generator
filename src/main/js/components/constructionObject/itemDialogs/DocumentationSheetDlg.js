import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as Constants from '../../../AppConstants';
import $ from 'jquery';

class DocumentationSheetDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restMethod: null,
            dlgTitle: null,
            btnLabel: "кнопка",
            newDocumentationSheet: {
                projectDocument: {
                    id: null,
                },
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            const operation = nextProps.operation;
            let state = this.state;
            state.newDocumentationSheet={
                projectDocument: {
                    id: nextProps.parentId,
                },
            };

            if (operation === Constants.CREATE) {
                state.restMethod = "POST";
                state.dlgTitle = "Новый лист проектной документации";
                state.btnLabel = "Создать";
            } else if (operation === Constants.COPY || operation === Constants.UPDATE || operation === Constants.DELETE) {
                const item = nextProps.item;
                state.newDocumentationSheet.name=item.name;
                state.newDocumentationSheet.number=item.number;
                state.newDocumentationSheet.change=item.change;

                if (operation === Constants.COPY) {
                    state.restMethod = "POST";
                    state.dlgTitle = "Новый лист проектной документации";
                    state.btnLabel = "Создать";
                } else if (operation === Constants.UPDATE) {
                    state.newDocumentationSheet.id=item.id;
                    state.restMethod = "PUT";
                    state.dlgTitle = "Изменение листа проектной документации: " + item.name;
                    state.btnLabel = "Редактировать";
                } else {
                    state.newDocumentationSheet.id=item.id;
                    state.restMethod = "DELETE";
                    state.dlgTitle = "Удаление листа проектной документации: " + item.name;
                    state.btnLabel = "Удалить";
                }
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const newDocumentationSheet = this.state.newDocumentationSheet;
        const updateConstrObj = this.props.updateConstrObj;
        const updateSelectedItem = this.props.updateSelectedItem;
        const operation = this.props.operation;

        $.ajax({
            url: '/rest/documentationSheet',
            type: this.state.restMethod,
            data: JSON.stringify(newDocumentationSheet),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                updateConstrObj();
                if (operation !== Constants.DELETE) {
                    updateSelectedItem(Constants.DOCUMENTATION_SHEET_TYPE, msg.id, true);
                } else {
                    updateSelectedItem(Constants.DOCUMENTATION_SHEET_TYPE, null);
                }
            }
        });

        this.props.onClose();
    };

    onChange(e){
        const state = this.state;
        state.newDocumentationSheet[e.target.name] = e.target.value;
        this.setState(state);
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
                        <TextField name="name" floatingLabelText="Наименование листа" disabled={isDisabled} defaultValue={this.state.newDocumentationSheet.name} onChange={this.onChange}/>
                        <br/>
                        <TextField name="number" floatingLabelText="Номер листа" disabled={isDisabled} defaultValue={this.state.newDocumentationSheet.number} onChange={this.onChange}/>
                        <br/>
                        <TextField name="change" floatingLabelText="Номер изменения листа" disabled={isDisabled} defaultValue={this.state.newDocumentationSheet.change} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default DocumentationSheetDlg;
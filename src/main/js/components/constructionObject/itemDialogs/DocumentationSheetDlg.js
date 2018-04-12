import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ButtonsBlock from '../../ButtonsBlock';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle'
import $ from 'jquery';

const documentationSheetType = "documentationSheet";

class DocumentationSheetDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newDocumentationSheet: {
                projectDocument: {
                    id: null,
                },
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let newDocumentationSheet = this.state.newDocumentationSheet;
        newDocumentationSheet.projectDocument.id = this.props.parentId;

        let updateConstrObj = this.props.updateConstrObj;
        let updateSelectedItem = this.props.updateSelectedItem;
        let constrObjId = this.props.constrObjId;

        $.ajax({
            url: '/rest/documentationSheet',
            type: 'POST',
            data: JSON.stringify(newDocumentationSheet),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                updateConstrObj(constrObjId);
                updateSelectedItem(documentationSheetType, msg.id);
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
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        const otherButtons =
            <IconButton tooltip="Добавить лист проектной документации" onClick={this.handleOpen}>
                <Add/>
            </IconButton>;

        return (
            <div>
                <Dialog
                    title="Новый лист проектной документации"
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование листа" onChange={this.onChange}/>
                        <br/>
                        <TextField name="number" floatingLabelText="Номер листа" onChange={this.onChange}/>
                        <br/>
                        <TextField name="change" floatingLabelText="Номер изменения листа" onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default DocumentationSheetDlg;
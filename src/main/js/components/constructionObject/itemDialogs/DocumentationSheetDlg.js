import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';

class DocumentationSheetDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newDocumentationSheet: {
                projectDocument: {},
            },
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleOpen(){
        const state = this.state;
        state.open=true;
        state.newDocumentationSheet.projectDocument.id = this.props.itemId;
        this.setState(state);
    };

    handleClose(){
        this.setState({open: false});
    };

    handleSubmit(e){
        e.preventDefault();
        let updateConstrObj = this.props.updateConstrObj;
        let constrObjId = this.props.constrObjId;

        $.ajax({
            url: '/rest/documentationSheet',
            type: 'POST',
            data: JSON.stringify(this.state.newDocumentationSheet),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                updateConstrObj(constrObjId);
            }
        });

        this.handleClose();
    };

    onChange(e){
        const state = this.state;
        state.newDocumentationSheet[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        const actions = [
            <FlatButton label="Отмена" onClick={this.handleClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        return (
            <div>
                <RaisedButton label="Добавить лист проектной документации" onClick={this.handleOpen} />
                <Dialog
                    title="Новый лист проектной документации"
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
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
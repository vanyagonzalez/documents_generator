import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as Constants from '../../../AppConstants';
import $ from 'jquery';

class ProjectPartitionDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restMethod: null,
            dlgTitle: null,
            btnLabel: "кнопка",
            newProjectPartition: {
                constructionObject: {
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
            state.newProjectPartition={
                constructionObject: {
                    id: nextProps.parentId,
                },
            };

            if (operation === Constants.CREATE) {
                state.restMethod = "POST";
                state.dlgTitle = "Новый раздел проекта";
                state.btnLabel = "Создать";
            } else if (operation === Constants.COPY || operation === Constants.UPDATE || operation === Constants.DELETE) {
                const item = nextProps.item;
                state.newProjectPartition.name=item.name;
                state.newProjectPartition.code=item.code;

                if (operation === Constants.COPY) {
                    state.restMethod = "POST";
                    state.dlgTitle = "Новый раздел проекта";
                    state.btnLabel = "Создать";
                } else if (operation === Constants.UPDATE) {
                    state.newProjectPartition.id=item.id;
                    state.restMethod = "PUT";
                    state.dlgTitle = "Изменение раздела проекта: " + item.name;
                    state.btnLabel = "Редактировать";
                } else {
                    state.newProjectPartition.id=item.id;
                    state.restMethod = "DELETE";
                    state.dlgTitle = "Удаление раздела проекта: " + item.name;
                    state.btnLabel = "Удалить";
                }
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const newProjectPartition = this.state.newProjectPartition;
        const updateConstrObj = this.props.updateConstrObj;
        const updateSelectedItem = this.props.updateSelectedItem;
        const operation = this.props.operation;

        $.ajax({
            url: '/rest/projectPartition',
            type: this.state.restMethod,
            data: JSON.stringify(newProjectPartition),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                updateConstrObj();
                if (operation !== Constants.DELETE) {
                    updateSelectedItem(Constants.PROJECT_PARTITION_TYPE, msg.id, true);
                } else {
                    updateSelectedItem(Constants.PROJECT_PARTITION_TYPE, null);
                }
            }
        });

        this.props.onClose();
    };

    onChange(e){
        const state = this.state;
        state["newProjectPartition"][e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        let dialog;
        if (this.props.open) {
            const actions = [
                <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
                <FlatButton type="submit" label={this.state.btnLabel} primary={true} key="submit"/>,
            ];

            const isDisabled = this.props.operation === Constants.DELETE;

            dialog =
                <Dialog
                    title={this.state.dlgTitle}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование раздела" disabled={isDisabled} defaultValue={this.state.newProjectPartition.name} onChange={this.onChange}/>
                        <br/>
                        <TextField name="code" floatingLabelText="Шифр раздела" disabled={isDisabled} defaultValue={this.state.newProjectPartition.code} onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>;
        }

        return (
            <div>
                {dialog}
            </div>
        );
    }
}

export default ProjectPartitionDlg;
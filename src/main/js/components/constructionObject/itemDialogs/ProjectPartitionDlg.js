import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import $ from 'jquery';

const projectPartitionType = "projectPartition";

class ProjectPartitionDlg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newProjectPartition: {
                constructionObject: {
                    id: null,
                },
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let newProjectPartition = this.state.newProjectPartition;
        newProjectPartition.constructionObject.id = this.props.constrObjId;
        let updateConstrObj = this.props.updateConstrObj;
        let updateSelectedItem = this.props.updateSelectedItem;
        let constrObjId = this.props.constrObjId;

        $.ajax({
            url: '/rest/projectPartition',
            type: 'POST',
            data: JSON.stringify(newProjectPartition),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(msg) {
                updateConstrObj(constrObjId);
                updateSelectedItem(projectPartitionType, msg.id);
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

        const actions = [
            <FlatButton label="Отмена" onClick={this.props.onClose} primary={true} key="cancel"/>,
            <FlatButton type="submit" label="Создать" primary={true} key="submit"/>,
        ];

        return (
            <div>
                <Dialog
                    title="Новый раздел проекта"
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.onClose}
                >
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="name" floatingLabelText="Наименование раздела" onChange={this.onChange}/>
                        <br/>
                        <TextField name="code" floatingLabelText="Шифр раздела" onChange={this.onChange}/>
                        <br/>
                        {actions}
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default ProjectPartitionDlg;
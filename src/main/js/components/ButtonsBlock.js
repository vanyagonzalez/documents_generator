const React = require('react');
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Copy from 'material-ui/svg-icons/content/content-copy'
import Create from 'material-ui/svg-icons/content/create'
import Delete from 'material-ui/svg-icons/content/delete-sweep'

const buttonsBlockStyle = {
    height: "10%",
};
const btnStyle = {
    margin: '10px 0px 10px 10px',
};

class ButtonsBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {

    }
    render() {
        return (
            <div style={buttonsBlockStyle}>
                <IconButton tooltip="Создать" onClick={this.props.onCreate}>
                    <Add/>
                </IconButton>
                <IconButton tooltip="Копия" onClick={this.onClick}>
                    <Copy/>
                </IconButton>
                <IconButton tooltip="Редактировать" onClick={this.props.onUpdate}>
                    <Create/>
                </IconButton>
                <IconButton tooltip="Удалить" onClick={this.props.onDelete}>
                    <Delete/>
                </IconButton>
            </div>
        );
    }
}

export default ButtonsBlock;
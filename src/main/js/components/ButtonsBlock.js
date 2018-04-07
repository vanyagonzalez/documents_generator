const React = require('react');
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Copy from 'material-ui/svg-icons/content/content-copy'
import Create from 'material-ui/svg-icons/content/create'
import Delete from 'material-ui/svg-icons/content/delete-sweep'

const buttonsBlockStyle = {
    height: "10%",
};
const btnStyle = {
    margin: '2px',
};

class ButtonsBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {

    }
    render() {
        const lastBtnStyle = {};
        lastBtnStyle.margin = btnStyle.margin;
        if (this.props.otherButtons) {
            lastBtnStyle.borderRight='1px solid #bbbbbbbb';
            lastBtnStyle.borderWith='';
        }

        return (
            <div style={buttonsBlockStyle}>
                <IconButton tooltip="Создать" style={btnStyle} onClick={this.props.onCreate}>
                    <Add/>
                </IconButton>
                <IconButton tooltip="Копия" style={btnStyle} onClick={this.onClick}>
                    <Copy/>
                </IconButton>
                <IconButton tooltip="Редактировать" style={btnStyle} onClick={this.props.onUpdate}>
                    <Create/>
                </IconButton>
                <IconButton tooltip="Удалить" style={lastBtnStyle} onClick={this.props.onDelete}>
                    <Delete/>
                </IconButton>
                {this.props.otherButtons}
            </div>
        );
    }
}

export default ButtonsBlock;
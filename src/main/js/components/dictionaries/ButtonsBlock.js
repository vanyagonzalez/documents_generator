const React = require('react');
import RaisedButton from 'material-ui/RaisedButton';

const btnStyle = {
    margin: '10px',
};

class ButtonsBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {

    }
    render() {
        return (
            <div style={this.props.style}>
                <RaisedButton label="Создать" style={btnStyle} onClick={this.onClick}/>
                <RaisedButton label="Редактировать" style={btnStyle} onClick={this.onClick}/>
                <RaisedButton label="Удалить" style={btnStyle} onClick={this.onClick}/>
            </div>
        );
    }
}

export default ButtonsBlock;
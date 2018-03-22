const React = require('react');

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import DictionarySelector from './components/dictionaries/DictionarySelector';

class Dictionaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dictionary: null
        };

        this.onMenuItemClick = this.onMenuItemClick.bind(this);
    }

    onMenuItemClick(item) {
        this.setState({
            dictionary: item
        });
    }

    render() {
        const paperStyle = {
            display: 'inline-block',
            height: '80vh',
            float: "left",
            //margin: '16px 32px 16px 0',
        };

        const floatLeftStyle = {
            float: "left",
            width: "50%",
        };

        return (
            <div>
                <Paper style={paperStyle}>
                    <Menu>
                        <MenuItem onClick={(e) => this.onMenuItemClick("organizations")}>Организации</MenuItem>
                        <MenuItem onClick={(e) => this.onMenuItemClick("employees")}>Сотрудники</MenuItem>
                        <MenuItem onClick={(e) => this.onMenuItemClick("certificates")}>Сертификаты</MenuItem>
                        <MenuItem onClick={(e) => this.onMenuItemClick("confirmations")}>Подтверждения</MenuItem>
                    </Menu>
                </Paper>
                <div>
                    <DictionarySelector
                        dictionary={this.state.dictionary}
                        allOrganizations={this.props.allOrganizations}
                    />
                </div>
            </div>
        );
    }

}

export default Dictionaries;
const React = require('react');

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import DictionarySelector from './components/dictionaries/DictionarySelector';

const divHeight = '90vh';

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
            float: "left",
            marginRight: "10px",
            //margin: '16px 32px 16px 0',
        };

        paperStyle.height = divHeight;

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
                        allEmployees={this.props.allEmployees}
                        allCertificates={this.props.allCertificates}
                        allConfirmations={this.props.allConfirmations}
                        divHeight={divHeight}
                    />
                </div>
            </div>
        );
    }

}

export default Dictionaries;
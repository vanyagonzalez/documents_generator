const React = require('react');

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import DictionarySelector from './components/dictionaries/DictionarySelector';

const paperStyle = {
    display: 'inline-block',
    float: "left",
    marginRight: "10px",
    //margin: '16px 32px 16px 0',
};

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
        paperStyle.height = this.props.bodyHeight;

        return (
            <div>
                <Paper style={paperStyle}>
                    <Menu>
                        <MenuItem onClick={(e) => this.onMenuItemClick("organizations")}>Организации</MenuItem>
                        <MenuItem onClick={(e) => this.onMenuItemClick("persons")}>Персоны</MenuItem>
                        <MenuItem onClick={(e) => this.onMenuItemClick("employees")}>Сотрудники</MenuItem>
                        <MenuItem onClick={(e) => this.onMenuItemClick("certificates")}>Сертификаты</MenuItem>
                        <MenuItem onClick={(e) => this.onMenuItemClick("confirmations")}>Подтверждения</MenuItem>
                    </Menu>
                </Paper>
                <div>
                    <DictionarySelector
                        dictionary={this.state.dictionary}
                        allOrganizations={this.props.allOrganizations}
                        allPersons={this.props.allPersons}
                        allEmployees={this.props.allEmployees}
                        allCertificates={this.props.allCertificates}
                        allConfirmations={this.props.allConfirmations}
                        divHeight={this.props.bodyHeight}
                        loadOrganizations={this.props.loadOrganizations}
                        loadPersons={this.props.loadPersons}
                        loadEmployees={this.props.loadEmployees}
                        loadCertificates={this.props.loadCertificates}
                        loadConfirmations={this.props.loadConfirmations}
                    />
                </div>
            </div>
        );
    }

}

export default Dictionaries;
const React = require('react');

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

class Dictionaries extends React.Component {

    render() {
        const style = {
            display: 'inline-block',
            height: '100vh',
            //margin: '16px 32px 16px 0',
        };

        return (
            <div>
                <Paper style={style}>
                    <Menu>
                        <MenuItem>Организации</MenuItem>
                        <MenuItem>Сотрудники</MenuItem>
                        <MenuItem>Сертификаты</MenuItem>
                        <MenuItem>Подтверждения</MenuItem>
                    </Menu>
                </Paper>
            </div>
        );
    }

}

export default Dictionaries;
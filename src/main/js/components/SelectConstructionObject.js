const React = require('react');
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SelectConstructionObject extends React.Component {
    render() {
        var rows = [];
        this.props.constrObjs.forEach(function(constructionObject) {
            rows.push(<MenuItem key={constructionObject.id} value={constructionObject.id} primaryText={constructionObject.code} />);
        });

        return (
            <div>
                <SelectField
                    floatingLabelText="Выбор объекта строительства"
                    value={this.props.value}
                    onChange={(event, index, value) => this.props.onConstrObjSelect(value)}
                >
                    {rows}
                </SelectField>

            </div>
        );
    }
}

export default SelectConstructionObject;
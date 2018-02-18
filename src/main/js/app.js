'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import $ from 'jquery';

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

class ConstrObjBasicInfo extends React.Component {
    render() {
        let objName = this.props.constrObj.name ? this.props.constrObj.name : "";
        let customerName = this.props.constrObj.customer ? this.props.constrObj.customer.name : "";
        let developerName = this.props.constrObj.developer ? this.props.constrObj.developer.name : "";
        return (

            <div>
                <TextField
                    floatingLabelText="Название"
                    value={objName}
                    disabled={true}
                />
                <TextField
                    floatingLabelText="Заказчик"
                    value={customerName}
                    disabled={true}
                    />
                <TextField
                    floatingLabelText="Застройщик"
                    value={developerName}
                    disabled={true}
                />
            </div>
        )

    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constrObjs: [],
            selectedConstrObjId: null,
            selectedConstrObj: {}
        };

        this.handleChoice = this.handleChoice.bind(this);
    }

    loadConstrObjsFromServer() {
        const self = this;
        $.ajax({
            url: "/rest/AllConstructionObjects"
        }).then(function (data) {
            self.setState({
                constrObjs: data
            });
        });
    }

    loadConstrObjFromServer(id) {
        const self = this;
        $.ajax({
            url: "/rest/constructionObject/" + id
        }).then(function (data) {
            self.setState({
                selectedConstrObj: data
            });
        });
    }

    componentDidMount() {
        this.loadConstrObjsFromServer();
    }

    handleChoice(value) {
        this.setState({
            selectedConstrObjId: value
        });

        this.loadConstrObjFromServer(value);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <SelectConstructionObject
                        value={this.state.selectedConstrObjId}
                        constrObjs={this.state.constrObjs}
                        onConstrObjSelect={i => this.handleChoice(i)}/>
                    <br/>
                    <ConstrObjBasicInfo constrObj={this.state.selectedConstrObj}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)
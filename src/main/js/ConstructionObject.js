const React = require('react');

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import SplitPane from 'react-split-pane/lib/SplitPane';
import Divider from 'material-ui/Divider';
import ConstrObjectDlg from './components/constructionObject/itemDialogs/ConstrObjectDlg'
import ConstrObjBasicInfo from './components/constructionObject/ConstrObjBasicInfo'
import ConstrObjPartitionList from './components/constructionObject/ConstrObjPartitionList'
import ListItemData from './components/constructionObject/ListItemData'
import $ from 'jquery';

const paperStyle = {
    display: 'inline-block',
    float: "left",
    marginRight: "10px",
    // width: "170px",
};

class ConstructionObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constrObjs: [],
            selectedConstrObjId: null,
            selectedConstrObj: {},
            typeListItem: null,
            idListItem: null,
            selectedItem: null,
        };

        this.loadConstrObjsFromServer = this.loadConstrObjsFromServer.bind(this);
        this.loadConstrObjFromServer = this.loadConstrObjFromServer.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.chooseListItem = this.chooseListItem.bind(this);
    }

    componentDidMount() {
        this.loadConstrObjsFromServer();
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

    handleChoice(value) {
        this.setState({
            selectedConstrObjId: value
        });

        this.loadConstrObjFromServer(value);
    }

    chooseListItem(type, id) {
        const self = this;

        if (this.state.typeListItem !== type || this.state.idListItem !== id) {
            $.ajax({
                url: "/rest/" + type + "/" + id
            }).then(function (data) {
                self.setState({
                    idListItem: id,
                    typeListItem: type,
                    selectedItem: data
                });
            });
        }
    }

    render() {
        let bodyHeight = parseInt(this.props.bodyHeight.replace('vh',''));
        paperStyle.height = this.props.bodyHeight;
        let constrObjStyle = {};
        constrObjStyle.height = this.props.bodyHeight;
        const constrObjInfoStyle = {
            height: bodyHeight * 0.15 + 'vh',
        };
        const splitPaneStyle = {
            height: bodyHeight * 0.85 + 'vh',
            position: "relative",
        };

        const constructionObjects = [];
        const handleChoice = this.handleChoice;
        this.state.constrObjs.forEach(function(constructionObject) {
            constructionObjects.push(<MenuItem key={constructionObject.id} onClick={(e) => handleChoice(constructionObject.id)}>{constructionObject.code}</MenuItem>);
        });

        return (
            <div>
                <Paper style={paperStyle}>
                    <Menu width={'100px'}>
                        {constructionObjects}
                    </Menu>
                </Paper>

                <div style={constrObjStyle}>
                    <div style={constrObjInfoStyle}>
                        <div>
                            <ConstrObjectDlg
                                customers={this.props.customers}
                                developers={this.props.developers}
                                updateConstrObjs={this.loadConstrObjsFromServer}
                            />
                        </div>
                        <div>
                            <ConstrObjBasicInfo constrObj={this.state.selectedConstrObj}/>
                        </div>
                    </div>
                    <Divider />
                    <SplitPane defaultSize="50%" split="vertical" style={splitPaneStyle}>
                        <div>
                            <ConstrObjPartitionList
                                constrObj={this.state.selectedConstrObj}
                                onClick={this.chooseListItem}
                                updateConstrObj={this.loadConstrObjFromServer}
                                bodyHeight={splitPaneStyle.height}
                            />
                        </div>
                        <div>
                            <ListItemData idListItem={this.state.idListItem}
                                          typeListItem={this.state.typeListItem}
                                          selectedItem={this.state.selectedItem}
                                          constrObjId={this.state.selectedConstrObj.id}
                                          updateConstrObj={this.loadConstrObjFromServer}
                                          authors={this.props.authors}
                                          customerRepresentatives={this.props.customerRepresentatives}
                                          developerRepresentatives={this.props.developerRepresentatives}
                                          executors={this.props.executors}
                                          executorRepresentatives={this.props.executorRepresentatives}
                                          otherRepresentatives={this.props.otherRepresentatives}
                                          allCertificates={this.props.allCertificates}
                                          allConfirmations={this.props.allConfirmations}
                            />
                        </div>
                    </SplitPane>
                </div>
            </div>
        );
    }
}

export default ConstructionObject;
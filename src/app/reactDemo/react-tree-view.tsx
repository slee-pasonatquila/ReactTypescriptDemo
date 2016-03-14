import {CountryViewModelFactory} from './country-view-model';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

//declare var Dispatcher: any;
//declare var EventEmitter: any;
declare var _ : any;

/*var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action){
    this.dispatch({
                source: 'VIEW_ACTION',
                action: action
    });
};

AppDispatcher.register( function( payload ) {

    switch( payload.eventName ) {

        case 'expand-collapse':
            NodeStore.toggleNode(payload.node);
            break;

    }

    return true;

});*/

/*var NodeStore = _.extend({}, EventEmitter.prototype, {

    _nodes : new CountryViewModelFactory().createModel(),

    getNodes: function(){
        return this._nodes;
    },

    toggleNode:function(node){
        for(var i = 0; i < node.children.length; i++){
            node.children[i].visible = !node.children[i].visible;
        }

        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});*/

interface TreeNodeProps{
   children:Array<any>,
   node:any
}

var TreeNode = React.createClass<TreeNodeProps,any>({

    toggle: function(e){
        /*AppDispatcher.dispatch({
            eventName: 'expand-collapse',
            node: this.props.node
        });*/
    },

    render: function(){

        var nodes = this.props.children.map(function(n){

            if(n.visible){
                return <TreeNode node={n} children={n.children}  />
            }
        });
        return (
            <li>
                <span onClick={this.toggle}>{this.props.node.getIcon()}</span>
                <span>{this.props.node.text}</span>
                <ul>{nodes}</ul>
            </li>
        );
    }

});

interface TreeViewProps{
   title:String
}

var TreeView = React.createClass<TreeViewProps,any>({

    getInitialState: function(){
      //return {countries:NodeStore.getNodes()};
      return null;
    },

    onChange: function(){
        //this.setState({countries:NodeStore.getNodes()});
        return null;
    },

    componentDidMount: function() {
        //NodeStore.addChangeListener(this.onChange);
        return null;
    },

    componentWillUnmount: function() {
        //NodeStore.removeChangeListener(this.onChange);
        return null;
    },

    render: function(){

        var countries = this.state.countries;

        var nodes = countries.map(function(n){
            return <TreeNode node={n} children={n.children} />
        });

        return(
           <div>
           <h2>{this.props.title}</h2>
           <ul>
            {nodes}
           </ul>
           </div>
        );

    }

});

export class ReactTreeView{

    static initialize(title){
        ReactDOM.render(<TreeView title={title} />, document.getElementById('react-tree-view'));
    }

}

import {CountryViewModelFactory} from './country-view-model';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface TreeViewProps{
   title:String
}

var TreeView = React.createClass<TreeViewProps,any>({

    render: function(){

        return(
           <div>
           <h2>{this.props.title}</h2>
           <ul>
            <li>
                This is a test.
            </li>
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

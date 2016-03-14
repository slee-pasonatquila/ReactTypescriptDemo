import {Component, View, OnInit} from 'angular2/core';
import {ReactTreeView} from './react-tree-view.tsx';

@Component({
    selector: 'reactDemo'
})

@View({
   templateUrl:'./app/reactDemo/reactDemo.html'
})

export class ReactDemo implements OnInit {

    ngOnInit(){
        ReactTreeView.initialize('Locations');
    }

}

import React, { Component } from "react";
import { connect } from 'react-redux';
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
// import { robots } from './robots';
import Scroll from '../components/Scroll';
import './App.css';

import { requestRobots, setSearchField } from "../actions";

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component{
    // constructor(){
    //     super()
    //     this.state = {
    //         robots: [],
    //         // searchfield: ''
    //     }
    // }

    // API
    componentDidMount() {
        // console.log(this.props.store.getState())
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then(response=> response.json())
        // .then(users=> this.setState({ robots: users }));
        this.props.onRequestRobots();
    }

    // onSearchChange = (event) => {
    //     this.setState({searchfield: event.target.value})
    // }

    render(){
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filterRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        // if(!robots.length) can be written
        if(isPending === 0){
            return <h1>Loading</h1>
        }
        else{
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <CardList robots={filterRobots} />
                    </Scroll>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {

    constructor() {
        super();
        this.state = {
            txt: 'this is the state text',
            cat: 0
        }
    }

    update(e) {
        this.setState({txt: e.target.value})
    }

    render() {
        // let txt = this.props.txt;
        // return (
        //     <div>
        //         <h1>{this.state.txt}</h1>
        //         <input type="text" onChange={this.update.bind(this)} />
        //         <Widget update={this.update.bind(this)} />
        //         <Widget update={this.update.bind(this)} />
        //         <Widget update={this.update.bind(this)} />
        //     </div>
        // ) 

        return (
            <div>
                <Button>I <Heart /> React</Button>
                <Title text="123456" />
            </div>
        ) 
    }
}

App.propTypes = {
    txt: PropTypes.string,
    cat: PropTypes.number.isRequired,
}

App.defaultProps = {
    txt: "this is the default text",
}

const Widget = (props) =>
    <input type="text" onChange={props.update.bind(this)} />

const Button = (props) => <button>{props.children}</button>

class Heart extends Component {
    render() {
        return <span>&hearts;</span>
    }
}

const Title = (props) => <h1>Title: {props.text}</h1>

Title.propTypes = {
    text(props, propName, component) {
        if(!(propName in props)) {
            return new Error(`missing ${propName}`);
        }
        if(props[propName].length < 6) {
            return new Error(`${propName} was too short`)
        }
    }
}

export default App;
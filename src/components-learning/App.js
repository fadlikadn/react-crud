import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {

    constructor() {
        super();
        this.state = {
            txt: 'this is the state text',
            cat: 0,
            currentEvent: '---'
        }
        this.update = this.update.bind(this);
    }

    update(e) {
        this.setState({
            txt: e.target.value,
            currentEvent: e.type,
        })
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
                <h1>{this.state.txt}</h1>
                <input type="text" onChange={this.update.bind(this)} />
                <textarea 
                    onKeyPress={this.update} 
                    onCopy={this.update} 
                    onCut={this.update}
                    onPaste={this.update} 
                    onFocus={this.update} 
                    onBlur={this.update} 
                    onDoubleClick={this.update} 
                    onTouchStart={this.update} 
                    onTouchMove={this.update} 
                    onTouchEnd={this.update} 
                    
                    cols="30" rows="10"/>
                <h1>{this.state.currentEvent}</h1>
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
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const HOC = (InnerComponent) => class extends React.Component {
    constructor() {
        super();
        this.state = {count: 0}
    }

    update() {
        this.setState({count: this.state.count + 1})
    }
    
    componentWillMount() {
        console.log('will mount')
    }
    
    render() {
        return (
            <InnerComponent
                {...this.props}
                {...this.state}
                update={this.update.bind(this)}
            />
        )
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            txt: 'this is the state text',
            cat: 0,
            currentEvent: '---',
            a: '',
            val: 0,
            increasing: false,
            items: [],
        }
        this.update = this.update.bind(this);
    }

    update(e) {
        this.setState({
            txt: e.target.value,
            currentEvent: e.type,
            // a: ReactDOM.findDOMNode(this.a).value,
            a: this.a.refs.input.value,
            b: this.refs.b.value,
            val: this.state.val + 1
        });
        ReactDOM.render(
            <App cat={10} val={this.props.val + 1} />,
            document.getElementById('root')
        )
    }

    tick() {
        console.log('tick');
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.setState({ m: 2 });

        fetch('https://swapi.co/api/people/?format=json')
            .then(response => response.json())
            .then( ({results: items}) => this.setState({items}));
    }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(ReactDOM.findDOMNode(this));
        // this.inc = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        // clearInterval(this.inc);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({increasing: nextProps.val > this.props.val})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.val % 5 == 0;
    }

    filter(e) {
        // console.log(e.target.value);
        this.setState({filter: e.target.value});
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
        let items = this.state.items;
        if (this.state.filter) {
            items = items.filter(item =>
                item.name.toLowerCase()
                .includes(this.state.filter.toLowerCase()))
        }

        console.log(this.state.increasing);
        console.log('render');
        return (
            <div>
                <div>
                    <Button>button</Button>
                    <hr/>
                    <LabelHOC>label</LabelHOC>
                </div>
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

                    <Input
                        ref={ component => this.a = component }
                        update={this.update.bind(this)}
                    /> {this.state.a}
                    <hr/>
                    <input
                        ref="b"
                        type="text"
                        onChange={this.update.bind(this)}
                    /> {this.state.b}
                    <br/>
                    <hr/>
                    <button onClick={this.update}>{this.state.val}</button>
                    <button onClick={this.update}>{this.state.val * this.state.m}</button>
                    <br/><br/><hr/>
                    <button onClick={this.update.bind(this)}>
                        {this.props.val}
                    </button>
                </div>

                <div>
                    <input type="text" onChange={this.filter.bind(this)} />
                    {items.map(item => 
                        // <h4 key={item.name}>{item.name}</h4>
                        <Person key={item.name} person={item} />
                    )}
                </div>
            </div>
        ) 
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(`prevProps: ${prevProps.val}`);
    }
}

const Person = (props) => <h4>{props.person.name}</h4>

App.propTypes = {
    txt: PropTypes.string,
    cat: PropTypes.number.isRequired,
}

App.defaultProps = {
    txt: "this is the default text",
    val: 0
}

const Widget = (props) =>
    <input type="text" onChange={props.update.bind(this)} />

const Button = HOC((props) => 
    <button onClick={props.update}>{props.children} - {props.count}</button>
)

class Label extends React.Component {
    componentWillMount() {
        console.log('label will mount')
    }
    render() {
        return (
            <label onMouseMove={this.props.update}>{this.props.children} - {this.props.count}</label>
        )
    }
}

const LabelHOC = HOC(Label)

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

class Input extends Component {
    render() {
        return <div><input ref="input" type="text" onChange={this.props.update}/></div>
    }
}

class Wrapper extends Component {
    mount() {
        ReactDOM.render(<App cat={10} />, document.getElementById('a'))
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('a'))
    }

    render() {
        return (
            <div>
                <button onClick={this.mount.bind(this)}>Mount</button>
                <button onClick={this.unmount.bind(this)}>UnMount</button>
                <div id="a"></div>
            </div>
        )
    }
}

export default App;
import React, { Component } from 'react';

class Square extends Component {
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: null,
    //     };
    // }
    
    render() {
        return (
            <button className="square" 
                    // onClick={() => this.setState({value: 'X'}) }>
                    onClick={() => this.props.onClick() }>
                {this.props.value}
                {/* {this.state.value} */}
            </button>
        );
    }
}

export default Square;
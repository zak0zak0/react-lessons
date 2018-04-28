import React from 'react';

export default class Sticker extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);        
        this.change = this.change.bind(this);        
        this.onMouseUp = this.onMouseUp.bind(this);               
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        
        this.state = {
            edit: false,
            move: false,
            x: props.x,
            y: props.y,
            message: ''
        }
    }

    click() {
        this.setState({
            edit: !this.state.edit,
            move: false
        });
    }

    change(e) {
        var text = e.target.value;
        this.setState({
            message: text
        })
    }

    onMouseUp(e) {        
        this.setState({
            move: false
        });
    }

    onMouseDown(e) {
        this.setState({
            move: true
        });
    }

    onMouseMove(e) {
        if (this.state.move) {
            // var [mX, mY] = [e.clientX, e.clientY];
            // var [x, y] = [this.state.x, this.state.y];
            // var [dX, dY] = [mX - x, mY -]

            this.setState({
                x: e.clientX - 50,
                y: e.clientY - 50
            })
        }
    }

    render() {

        let [x,y] = [this.state.x + 'px', this.state.y + 'px'];

        return(
            <div className="sticker" 
                 onDoubleClick={this.click}
                 onMouseDown={this.onMouseDown}
                 onMouseMove={this.onMouseMove}
                 onMouseUp={this.onMouseUp}
                 style={{ left: x, top: y}}>
                {
                    this.state.edit 
                    ? <input type="text" onChange={this.change} value={this.state.message}/>
                    : <span>{this.state.message}</span> 
                }
            </div>
        );
    }
}
import React from 'react';

export default class Sticker extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);        
        this.change = this.change.bind(this);                     
        this.onMoveCallback = this.onMoveCallback.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.delete = props.delete;
        this.beginDrag = props.beginDrag;
        this.state = {
            edit: false,
            move: false,
            message: '',
            index: props.index,
            transform: {
                x: props.x,
                y: props.y,
            },
            offset: {
                x: 0,
                y: 0
            }
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

    onMoveCallback(x,y) {
        let newX = x - this.state.offset.x,
            newY = y - this.state.offset.y;
        this.setState({
            transform: {
                x: newX,
                y: newY
            }
        })
    }

    onMouseDown(e) {
        if (!this.state.edit) {
            this.setState({
                offset: {
                    x: e.clientX - this.state.transform.x,
                    y: e.clientY - this.state.transform.y
                }
            });
            this.beginDrag(this.onMoveCallback)
        }                
    }
    
    getStyle() {
        let [x,y] = [this.state.transform.x, this.state.transform.y];
        let style = {
            transform: `translate(${x}px,${y}px)`
        }
        return style;
    }

    render() {
        let style = this.getStyle();

        return(
            <li className="sticker" 
                 onDoubleClick={this.click}
                 onMouseDown={this.onMouseDown}                
                 style={style}>
                {
                    this.state.edit 
                    ? <div>
                        <input type="text" onChange={this.change} value={this.state.message}/>
                        <button type="button" onClick={() => this.delete(this.state.index)}>X</button>
                      </div>
                    : <span>{this.state.message}</span> 
                }
                
            </li>
        );
    }
}
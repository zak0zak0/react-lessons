import React from 'react';

const ANGLE = 5;

export default class Sticker extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);        
        this.change = this.change.bind(this);             
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.delete = props.delete;
        this.state = {
            edit: false,
            move: false,
            message: '',
            index: props.index,
            rotate: ANGLE,
            position: {
                x: props.x,
                y: props.y,
            }
        }
    }

    click() {
        this.setState({
            edit: !this.state.edit,
            move: false,
            rotate: this.state.edit ? ANGLE : 0
        });
    }

    change(e) {
        var text = e.target.value;
        this.setState({
            message: text
        })
    }

    onDragStart(e) {
        let offsetX = e.clientX - this.state.position.x,
            offsetY = e.clientY - this.state.position.y;        
        e.dataTransfer.setData("offsetX", offsetX);
        e.dataTransfer.setData("offsetY", offsetY);
        e.dataTransfer.setData("id", this.state.index);
    }

    onDragEnd(e) {
        this.setState({
            position: {
                x: this.props.x,
                y: this.props.y
            }
        });
    }

    getStyle() {
        let [x,y, angle] = [this.state.position.x, this.state.position.y, this.state.rotate];
        let style = {
            transform: `translate(${x}px,${y}px) rotate(${angle}deg)`
        }
        return style;
    }

    render() {
        let style = this.getStyle();

        return(
            <span className="sticker" 
                 draggable={!this.state.edit}
                 onDoubleClick={this.click}
                 onDragStart={this.onDragStart}    
                 onDragEnd={this.onDragEnd}                             
                 style={style}>
                {
                    this.state.edit 
                    ? <div>
                        <input type="text" onChange={this.change} value={this.state.message}/>
                        <button type="button" onClick={() => this.delete(this.state.index)}>X</button>
                      </div>
                    : <span>{this.state.message}</span> 
                }
                
            </span>
        );
    }
}
import React from 'react';
import Sticker from './sticker';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.beginDrag = this.beginDrag.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);


        this.state = {
            stickers: [],
            nextId: 0,
            activeStickerCallback: null
        }
    }

    add(e) {
        let arr = [...this.state.stickers],
            i = this.state.nextId;    
        arr.push({x:0, y:0, index: i});            
        this.setState({
            stickers: arr,
            nextId: i + 1
        });
    }

    delete(i) {
        let arr = [...this.state.stickers],
            index = arr.findIndex((e) => e.index === i);        
        arr.splice(index, 1);
        this.setState({
            stickers: arr
        });
    }

    beginDrag(transformCallback) {
        this.setState({
            activeStickerCallback: transformCallback
        })
    }

    onMouseMove(e) {
        if (this.state.activeStickerCallback !== null) {
            let [x, y]= [e.clientX, e.clientY];
            this.state.activeStickerCallback(x,y)
        }
    }

    onMouseUp(e) {        
        if (this.state.activeStickerCallback !== null) {
            this.setState({
                activeStickerCallback: null
            })
        }        
    }

    render() {
        let stickers = this.state.stickers.map((s) => 
            <Sticker delete={this.delete} 
                     beginDrag={this.beginDrag}
                     index={s.index} 
                     key={s.index} 
                     x={s.x} y={s.y}/>)

        return (
            <div className="wrapper" 
                 onMouseMove={this.onMouseMove}
                 onMouseUp={this.onMouseUp}
                 >
                <ul>
                    {stickers}
                </ul>
                <button onClick={this.add} className="btn-add">+</button>
            </div>
        );
    }
}
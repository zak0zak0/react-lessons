import React from 'react';
import Sticker from './sticker';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        //   this.beginDrag = this.beginDrag.bind(this);
        //  this.onMouseMove = this.onMouseMove.bind(this);
        //  this.onMouseUp = this.onMouseUp.bind(this);
        this.onDrop = this.onDrop.bind(this);


        this.state = {
            stickers: [],
            nextId: 0,
            activeSticker: null,
            activeStickerOffset: { x: 0, y: 0 }
        }
    }

    add(e) {
        let arr = [...this.state.stickers],
            i = this.state.nextId;
        arr.push({ x: 0, y: 0, index: i });
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

    onDragOver(e) {
        e.dataTransfer.dropEffect = "move";
        e.preventDefault();
    }

    onDrop(e) {
        e.preventDefault();
        let offsetX = e.dataTransfer.getData("offsetX"),
            offsetY = e.dataTransfer.getData("offsetY");
        let [x, y] = [e.clientX - offsetX, e.clientY - offsetY];
        let id = parseInt(e.dataTransfer.getData("id"));
        let stickers = [...this.state.stickers];
        let sticker = stickers.find(s => s.index === id);
        sticker.x = x;
        sticker.y = y;
        this.setState({
            stickers: stickers
        });
    }

    render() {
        let stickers = this.state.stickers.map((s) =>
            <Sticker delete={this.delete}
                beginDrag={this.beginDrag}
                index={s.index}
                key={s.index}
                x={s.x} y={s.y} />)

        return (
            <div className="wrapper"
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
            >
                
                    {stickers}
                
                <button onClick={this.add} className="btn-add">+</button>
            </div>
        );
    }
}
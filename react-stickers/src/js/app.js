import React from 'react';
import Sticker from './sticker';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.state = {
            stickers: []
        }
    }

    add(e) {
        let arr = [...this.state.stickers];
        arr.push({x:0, y:0});
        this.setState({
            stickers: arr
        });
    }

    delete(i) {
        let arr = [...this.state.stickers];
        arr.splice(i, 1);
        this.setState({
            stickers: arr
        });
    }

    render() {

        let stickers = this.state.stickers.map((s, i) => 
            <Sticker delete={this.delete} 
                     index={i} 
                     key={i} 
                     x={s.x} y={s.y}/>)

        return (
            <div className="wrapper">
                <ul>
                    {stickers}
                </ul>
                <button onClick={this.add} className="btn-add">+</button>
            </div>
        );
    }
}
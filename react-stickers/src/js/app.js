import React from 'react';
import Sticker from './sticker';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
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

    render() {

        let stickers = this.state.stickers.map((s, i) => <Sticker key={i} x={s.x} y={s.y}/>)

        return (
            <div className="wrapper">
                {stickers}
                <button onClick={this.add} className="btn-add">+</button>
            </div>
        );
    }
}
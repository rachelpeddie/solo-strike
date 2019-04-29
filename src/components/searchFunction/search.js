import React, { Component } from 'react'
import axios from 'axios';
require('dotenv').config();

class Search extends Component {
    state = {
        query: '',
        result: []
    }

    getInfo = () => {
        axios.get(`/water`, { params: {search: this.state.query} })
            .then(({ data }) => {
                console.log(`woot, got the plant stuff!`, data);
                this.setState({
                    result: data // MusicGraph returns an object named data, 
                    // as does axios. So... data.data                             
                })
            })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            }
        })
    }


    render() {
        return (
            <div>
            <form>
                <pre>{JSON.stringify(this.state)}</pre>
                <input
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                <p>{this.state.query}</p>
            </form>
            <ul>
                {this.state.result.map((plant, i) =>
                    <li key={i}>
                        {plant.common_name}
                    </li> 
                    // {plant.complete_data === true ? <li key={i}>
                    //     {plant.common_name}
                    // </li> : null}
                )}
            </ul>
            </div>
        )
    }
}

export default Search
import React, { Component } from 'react';
import axios from 'axios';
export default class CreateQuestion extends Component {
    constructor(props){
        super(props);

        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitTags=this.onSubmitTags.bind(this);
        this.state={
            query:'',
            topic:'',
            tags:[]
        }
    }

    
    onChangeQuestion(e) {
        this.setState({
          query: e.target.value
        });
      }
    onChangeTopic(e) {
        this.setState({
          topic: e.target.value
        });
      }
    onChangeTags(e) {
        this.setState({
          tags: e.target.value
        });
      }
    onSubmit(e) {
        e.preventDefault();
        const questions = {
          query: this.state.query,
          topic: this.state.topic,
          tags: this.state.tags,
        };
        axios.post('http://localhost:5000/questions/add', questions).then(res => console.log(res.data));
      //console.log(questions);
      window.location = '/';
      }
    onSubmitTags(e){
      e.preventDefault();
      this.setState({
        tags:e.target.value
      })
    }
  render() {
    return (
      <div className="container">
        <h3>Create New Question</h3>
        
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Question: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.query}
                onChange={this.onChangeQuestion}
                />
          </div>
          <div className="form-group"> 
            <label>Topic: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.topic}
                onChange={this.onChangeTopic}
                />
          </div>
          <div className="form-group">
            <input type="text"
                value={this.state.tags}
                onChange={this.onChangeTags}></input>
            <button type="submit" 
                className="btn btn-secondary"
                onSubmit={this.onSubmitTags}
                placeholder="Add Tag">Add Tag</button>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Question Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
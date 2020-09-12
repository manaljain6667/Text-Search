import React, { Component } from 'react';
import axios from 'axios';
export default class EditQuestion extends Component {
    constructor(props){
        super(props);

        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            query:'',
            topic:'',
            tags:''
        }
    }

    componentDidMount() {
      axios.get('http://localhost:5000/questions/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            query: response.data.query,
            topic: response.data.topic,
            tags: response.data.tags,
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
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
        axios.post('http://localhost:5000/questions/update'+this.props.match.params.id, questions)
        .then(res => console.log(res.data));
      //console.log(questions);
      window.location = '/';
      }

  render() {
    return (
      <div>
        <h3>Edit Questions Log</h3>
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
            <label>Tags: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.tags}
                onChange={this.onChangeTags}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Question Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
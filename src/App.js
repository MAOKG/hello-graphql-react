import React, { Component } from 'react';

import { request } from 'graphql-request';

const BASE_URL = 'http://localhost:3100/graphql';

const query = `query {
    allStudents {
      id
      firstName
      lastName
      Courses {
        ...course
      }
    }
  }

  fragment course on Course {
    id
    name
  }`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { title: 'Students' };
  }

  componentWillMount() {
    request(BASE_URL, query).then(data => this.setState({ data }));
  }

  render() {
    if (!this.state) return 'Loading...';

    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <div style={{ textAlign: 'left' }}>
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component, PureComponent } from 'react'
import AV from 'leancloud-storage'

import {
  Link
} from 'react-router-dom'

import {
  Form,
  Row,
  Col,
  Clearfix,
  FormGroup,
  Checkbox,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Table,
  PageHeader,
  Label
} from 'react-bootstrap'

import { pad } from './utils'

class MyForm extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    const query = new AV.Query('Servant')
    query.limit(200)
    query.find().then((results) => {
      const todo = []
      const done = []
      for (const servant of results) {
        const arr = servant.get('verified') == 0 ? todo : done
        arr.push({
          id: servant.get('id'),
          name: servant.get('name'),
        })
      }
      this.setState({
        loading: false,
        todo,
        done,
      })

    })
  }

  render() {
    const {
      loading,
      todo,
      done,
    } = this.state
    if (loading) {
      return (
        <p>Loading</p>
      )
    }

    return (
      <div>
        <PageHeader>待捉虫</PageHeader>
        <div>
        {
          todo.map(({ id, name }) => (
            <Label key={id} bsStyle="warning" className="token">
              <Link to={'/servant/' + id}>{name}</Link>
            </Label>
          ))
        }
        </div>
        <PageHeader>已确认</PageHeader>
        <div>
        {
          done.map(({ id, name }) => (
            <Label key={id} bsStyle="primary" className="token">
              <Link to={'/servant/' + id}>{name}</Link>
            </Label>
          ))
        }
        </div>
      </div>
    )
  }
}

export default function ServantList({ match }) {
  return (
    <div className="App">
      <div className="App-header">
        <h2>从者-数据收集</h2>
      </div>
      <div className="App-body">
        <MyForm id={ match.params.id }/>
      </div>
    </div>
  )
}

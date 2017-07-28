import React, { Component } from 'react'
import AV from 'leancloud-storage'

import { withRouter } from 'react-router-dom'

import {
  Form,
  ControlLabel,
  FormControl,
  Button,
  Table,
} from 'react-bootstrap'

import { pad } from './utils'

import {
  basicList,
  EN2CN,
  genderConvert,
  classConvert,
  attributeConvert,
  alignmentConvert,
  shouldBeInteger,
  shouldBeFloat,
} from './data-schema/Servant'

const convertList = {
  'class': classConvert,
  'gender': genderConvert,
  'attribute': attributeConvert,
  'alignment': alignmentConvert,
}

function getType(name) {
  if (name in shouldBeInteger)
    return 'number'
  if (name in shouldBeFloat)
    return 'float'
  return 'text'
}

const cardName = [
  '蓝 ', '红 ', '绿 ', 'EX'
]

function MyInput({ name, value, ...props }) {
  return (
    name in convertList ? (
      <FormControl
        componentClass="select"
        name={name}
        value={value}
        {...props}
      >
        {
          Object.keys(convertList[name]).map((k, i) => (
            <option key={i} value={convertList[name][k]}>{k}</option>
          ))
        }
      </FormControl>
    ) : (
      <FormControl
        name={name}
        value={value}
        type={getType(name)}
        {...props}/>
    )
  )
}

class MultipleInput extends Component {
  constructor() {
    super()
  }

  _handleChange = event => {
    const { target } = event
    const value = target.value
    const name = target.name.split('+')[0]
    const idx = parseInt(target.name.split('+')[1], 10)
    const next = [...this.props.value]
    next[idx] = value
    this.props.onChange({
      target: {
        type: 'multi',
        name,
        value: next,
      }
    })
  }

  render() {
    const { name, value, onChange, ...props } = this.props
    return (
      <div>
      {
        value.map((v, idx) => (
          <div key={idx}>
          <span>{cardName[idx]}</span>
          <FormControl
            style={{
            	width: 'calc(100% - 100px)',
            	display: 'inline-block',
            	marginLeft: '20px',
            }}
            name={name+'+'+idx}
            type={getType(name)}
            value={v}
            onChange={this._handleChange}
            {...props}/>

          </div>
        ))
      }

      </div>
    )
  }
}

function FieldGroup({ id, label, help, value, disabled, ...props }) {
  return (
    <tr>
      <td>
        <ControlLabel>{label}</ControlLabel>
      </td>
      <td>
        {
          Array.isArray(value) ? (
            <MultipleInput disabled={disabled} {...props} value={value} />
          ) : (
            <MyInput disabled={label === 'id' || disabled}{...props} value={value} />
          )
        }
      </td>
    </tr>
  );
}

class MyForm extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      disabled: true,
      mssg: 'Loading',
    }
    this.servant = null
  }

  componentDidMount() {
    const query = new AV.Query('Servant')
    query.equalTo('id', pad(parseInt(this.props.id, 10), 3))
    query.find().then((results) => {
      if (results.length !== 1) {
        console.log(pad(parseInt(this.props.id, 10), 3), results)
        return
      }
      const s = this.servant = results[0]
      console.log("get", s)
      const values = {}
      for (const k of basicList) {
        values[k] = s.get(k)
      }

      this.setState({
        loading: false,
        verified: s.get('verified'),
        ...values,
      })

    }, (err) => {
      console.log(err)
    })
  }

  _parseInput = (name, value) => {
    if (name in shouldBeInteger) {
      if (Array.isArray(value)) {
        return value.map(v => parseInt(v, 10))
      }
      return parseInt(value, 10)
    } else if (name in shouldBeFloat) {
      if (Array.isArray(value)) {
        return value.map(v => parseFloat(v))
      }
      return parseFloat(value)
    }
  }

  _handleInputChange = event => {
    const { target } = event
    const name = target.name
    const value = this._parseInput(name, target.value)
    console.log(name, target.value)
    this.setState({
      [name]: value
    })
  }

  _submit = event => {
    console.log(this.state)
    event.preventDefault()
    for (const k of basicList) {
      this.servant.set(k, this.state[k])
    }
    this.servant.set('verified', 1)
    this.setState({
      mssg: '上传中',
      loading: true,
    })
    this.servant.save().then((obj) => {
      console.log(obj)
      this.props.history.push('/servant')
    })
  }

  render() {
    const {
      loading,
      mssg,
      disabled,
      verified,
    } = this.state
    if (loading) {
      return (
        <p>{mssg}</p>
      )
    }

    return (
      <Form horizontal onSubmit={this._submit}>
        <h4>wiki 链接：<a target="_blank" href={'http://fgowiki.com/guide/petdetail/' + this.state.id}>fgowiki.com/guide/petdetail/{this.state.id}</a></h4>
        <Table striped bordered condensed hover>
          <tbody>
              {
                basicList.map(k => (
                  <FieldGroup
                    key={k}
                    name={k}
                    label={EN2CN[k]}
                    // value={id}
                    value={this.state[k]}
                    disabled={verified || disabled}
                    onChange={this._handleInputChange}
                  />
                ))
              }
          </tbody>
        </Table>
          {
            verified ? null : (
              <div className="submit">
                <Button bsSize="large" type="submit" style={{marginRight: '20px'}}>
                  确认
                </Button>
                <Button bsSize="large" onClick={() => this.setState({ disabled : !disabled })}>
                  {disabled ? '修改' : '锁定'}
                </Button>
              </div>
            )
          }
      </Form>
    )
  }
}

const RouterForm = withRouter(MyForm)

export default function ServantGather({ match }) {
  return (
    <div className="App">
      <div className="App-header">
        <h2>从者-数据收集</h2>
      </div>
      <div className="App-body">
        <RouterForm id={ match.params.id }/>
      </div>
    </div>
  )
}

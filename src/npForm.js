import React, { Component } from 'react'
import Select from 'react-select';

import {
  FormControl,
  Button,
  Table,
} from 'react-bootstrap'

import { Effect } from './effectForm'

import {
  npCondition,
  npType,
  npCardType,
} from './data-schema/Skill'

const rawOptions = {
  npCondition,
  npType,
  npCardType,
}

const options = {}
for (const key of Object.keys(rawOptions)) {
  options[key] = Object.keys(rawOptions[key]).map((k) => (
    {
      label: k,
      value: rawOptions[key][k],
    }
  ))
}

export class NP extends Component {
  constructor(props) {
    super(props)
    const { data } = props
    this.state = {
      name: data['name'] || '',
      type: data['type'] || 0,
      condition: data['condition'] || 0,
      value: data['value'] || [0, 0, 0, 0, 0],
      card: data['card'] || 0,
      lv: data['lv'] || '',
      attackPhaseID: data['attackPhaseID'] || 0,
      effect: data['effect'] || [],
      hits: data['hits'] || 0,
    }
  }

  _handleInputChange = event => {
    const { target } = event
    const name = target.name.split('+')[0]
    const idx = parseInt(target.name.split('+')[1], 10)
    let next = this.state[name]
    if (idx < 0) {
      next = target.value
    } else {
      next[idx] = target.value
    }
    console.log(name, next)
    this.setState({
      [name]: next
    })
    this.props.onChange({
      target: {
        type: 'skill',
        name: this.props.name,
        value: {
          ...this.state,
          ...{
            [name]: next,
          }
        },
      }
    })
  }

  _onSelectChange = (val, name) => {
    this._handleInputChange({
      target: {
        type: 'select',
        name,
        value: val.value,
      }
    })
  }

  render() {
    const {
      name,
      condition,
      effect,
      type,
      value,
      card,
      attackPhaseID,
      lv,
      hits,
    } = this.state

    return (
      <div>
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <td>name</td>
              <td colSpan="5">
                <FormControl
                  className="inline-input"
                  name='name+-1'
                  type='text'
                  value={name}
                  onChange={this._handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>lv</td>
              <td colSpan="5">
                <FormControl
                  className="inline-input"
                  name='lv+-1'
                  type='text'
                  value={lv}
                  onChange={this._handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>condition</td>
              <td colSpan="5">
                <Select
                  className="inline-input"
                  name="condition+-1"
                  value={condition}
                  options={options.npCondition}
                  onChange={(val) => this._onSelectChange(val, 'condition+-1')}
                  matchProp="label"
                  clearable={false}
                />
              </td>
            </tr>
            <tr>
              <td>type</td>
              <td colSpan="5">
                <Select
                  className="inline-input"
                  name="type+-1"
                  value={type}
                  options={options.npType}
                  onChange={(val) => this._onSelectChange(val, 'type+-1')}
                  matchProp="label"
                  clearable={false}
                />
              </td>
            </tr>
            <tr>
              <td>card</td>
              <td colSpan="5">
                <Select
                  className="inline-input"
                  name="card+-1"
                  value={card}
                  options={options.npCardType}
                  onChange={(val) => this._onSelectChange(val, 'card+-1')}
                  matchProp="label"
                  clearable={false}
                />
              </td>
            </tr>
            <tr>
              <td>attack phase ID</td>
              <td colSpan="5">
                <FormControl
                  className="inline-input"
                  name='attackPhaseID+-1'
                  type='number'
                  value={attackPhaseID}
                  onChange={this._handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>Hit 数</td>
              <td colSpan="5">
                <FormControl
                  className="inline-input"
                  name='hits+-1'
                  type='number'
                  value={hits}
                  onChange={this._handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>value</td>
              {
                [0, 1, 2, 3, 4].map((key, idx) => (
                  <td key={idx}>
                    <FormControl
                      name={'value+'+idx}
                      type='number'
                      value={value[idx]}
                      onChange={this._handleInputChange}
                    />
                  </td>
                ))
              }
            </tr>
            <tr>
              <td>效果
                <Button bsStyle="primary" className="button-add" onClick={() =>
                  this.setState({ effect: [...effect, {}] })
                }>+</Button></td>
              <td colSpan="5">
              {
                effect.map((v, i) => (
                  <Effect
                    key={v['id']+','+i}
                    name={"effect+" + i}
                    data={v}
                    type="np"
                    onChange={this._handleInputChange}
                    onDelete={(i => () => {
                      console.log(i)
                      this._handleInputChange({
                        target: {
                          type: 'effect',
                          name: 'effect+-1',
                          value: [
                            ...effect.slice(0, i),
                            ...effect.slice(i + 1, effect.length),
                          ]
                        }
                      })
                    }

                    )(i)}
                  />
                ))
              }
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

import React, { Component } from 'react'
import Select from 'react-select';
import {
  FormControl,
  Button,
  Table,
} from 'react-bootstrap'

// import { pad } from './utils'

import {
  target,
  place,
  buffOrDebuff,
  detail,
  traitList,
  skillDuration,
  skillEffectiveTime,
  npEffectType,
} from './data-schema/Skill'

const rawOptions = {
  target,
  place,
  buffOrDebuff,
  detail,
  traitList,
}

const rawOptions2 = {
  skillDuration,
  skillEffectiveTime,
  npEffectType,
}

const options = {}
for (const key of Object.keys(rawOptions)) {
  options[key] = Object.keys(rawOptions[key]).map((k) => (
    {
      label: rawOptions[key][k],
      value: k,
    }
  ))
}

for (const key of Object.keys(rawOptions2)) {
  options[key] = Object.keys(rawOptions2[key]).map((k) => (
    {
      label: k,
      value: rawOptions2[key][k],
    }
  ))
}

options['traitList2'] = options.traitList

function assemble(id, value, idx) {
  // console.log(id)
  switch (idx) {
    case 0:
      id = value + id.substring(2, 12)
      break;
    case 1:
      id = id.substring(0, 2) + value + id.substring(5, 12)
      break;
    case 2:
      id = id.substring(0, 5) + value + id.substring(7, 12)
      break;
    case 3:
      id = id.substring(0, 7) + value + id.substring(8, 12)
      break;
    case 4:
      if (value.length > 1) {
        id = id.substring(0, 8) + value
      } else {
        id = id.substring(0, 8) + value + id.substring(9, 12)
      }
      break;
    case 5:
      id = id.substring(0, 9) + value
      break;
    default:
  }
  return id
}

function disassemble(id) {
  const ret = [
    id.substring(0, 2),
    id.substring(2, 5),
    id.substring(5, 7),
    id.substring(7, 8),
    id.substring(8, 12),
    id.substring(9, 12),
  ]
  if (parseInt(ret[4][0], 10) > 6) {
    ret[4] = ret[4][0]
  } else {
    ret[5] = '000'
  }
  console.log('disid', id)
  return ret
}

export class Effect extends Component {
  constructor(props) {
    super(props)
    const { data } = props
    this.state = {
      id: data['id'] || '000000000000',
      value: data['value'] || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      duration: data['duration'] || 0,
      effectiveTime: data['effectiveTime'] || -1,
      phaseID: data['phaseID'] || 0,
    }
    if (props.type === 'np') {
      this.state['type'] = data['type'] || 0
      this.state.value = data['value'] || [0, 0, 0, 0, 0]
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
    if (name === 'value') {
      next = next.map((v) => v[v.length - 1] === '.' ? v : parseFloat(v))
      if (idx === 1 && next[1][next[1].length - 1] !== '.') {
        const diff = next[1] - next[0]
        if (next.length === 5) {
          for (let i = 2; i < 5; i++) {
            next[i] = next[0] + diff * i
          }
        } else if (next.length === 10) {
          for (let i = 2; i < 9; i++) {
            next[i] = next[0] + diff * i
          }
          next[9] = next[8] + diff * 2
        }
        next = (next.map((v, i) => i < 2 ? v : parseFloat(v.toFixed(4))))
      }
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
          [name]: next,
        }
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

  _assemble({ value }, idx) {
    let { id } = this.state
    id = assemble(id, value, idx)
    this._handleInputChange({
      target: {
        type: 'assembleID',
        name: 'id+-1',
        value: id,
      }
    })
  }

  render() {
    const {
      id,
      value,
      duration,
      effectiveTime,
      phaseID,
    } = this.state

    const IDs = disassemble(id)
    console.log(IDs)
    return (
      <Table striped bordered condensed hover>
        <tbody>
          <tr>
            <td>
              id
            </td>
            {
              [
                'target',
                'traitList',
                'place',
                'buffOrDebuff',
                'detail',
                'traitList2',
              ].map((key, idx) => (
                <td key={idx}>
                  <Select
                    name={key}
                    value={IDs[idx]}
                    options={options[key]}
                    onChange={(val) => this._assemble(val, idx)}
                    matchProp="label"
                    clearable={false}
                  />
                </td>
              ))
            }
          </tr>
          {
            this.props.type === 'np' ? (
              <tr>
                <td>type</td>
                <td colSpan="5">
                  <Select
                    name='type+-1'
                    value={this.state.type}
                    options={options.npEffectType}
                    onChange={(val) => this._onSelectChange(val, 'type+-1')}
                    matchProp="label"
                    clearable={false}
                  />
                </td>
              </tr>
            ) : null
          }
          <tr>
            <td rowSpan={value.length > 5 ? '2' : '1'}>value</td>
            {
              Array(5).fill('').map((_, idx) => (
                <td key={idx}>
                  <FormControl
                    name={'value+'+idx}
                    type='float'
                    value={value[idx]}
                    onChange={this._handleInputChange}
                  />
                </td>
              ))
            }
          </tr>
          {
            value.length > 5 ? (
              <tr>
                {
                  Array(5).fill('').map((_, idx) => (
                    <td key={idx}>
                      <FormControl
                        name={'value+'+ (idx + 5)}
                        type='float'
                        value={value[idx + 5]}
                        onChange={this._handleInputChange}
                      />
                    </td>
                  ))
                }
              </tr>
            ) : null
          }
          <tr>
            <td>duration</td>
            <td>
              <Select
                name={'duration+-1'}
                value={duration}
                options={options.skillDuration}
                onChange={(val) => this._onSelectChange(val, 'duration+-1')}
                matchProp="label"
                clearable={false}
              />
            </td>
            <td>effectiveTime</td>
            <td>
              <Select
                name={'effectiveTime+-1'}
                value={effectiveTime}
                options={options.skillEffectiveTime}
                onChange={(val) => this._onSelectChange(val, 'effectiveTime+-1')}
                matchProp="label"
                clearable={false}
              />
            </td>
            <td>phaseID</td>
            <td>
              <FormControl
                name="phaseID+-1"
                type="number"
                value={phaseID}
                onChange={this._handleInputChange}
              />
            </td>
            <td>
              <Button bsStyle="danger" onClick={this.props.onDelete}>-</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

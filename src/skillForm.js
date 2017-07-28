import React, { Component } from 'react'
import Select from 'react-select';

import {
  FormControl,
  Button,
} from 'react-bootstrap'

import { Effect } from './effectForm'

import {
  skillCondition,
} from './data-schema/Skill'

const rawOptions = {
  skillCondition,
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

export class Skill extends Component {
  constructor(props) {
    super(props)
    const { data } = props
    this.state = {
      name: data['name'] || '',
      condition: data['condition'] || 0,
      lv: data['lv'] || '',
      effect: data['effect'] || [],
      initialCD: data['initialCD'] || 0,
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
      lv,
      effect,
      initialCD
    } = this.state

    return (
      <div>
        <div>
          <span>name</span>
          <FormControl
            className="inline-input"
            name='name+-1'
            type='text'
            value={name}
            onChange={this._handleInputChange}
          />
        </div>
        <div>
          <span>lv</span>
          <FormControl
            className="inline-input"
            name='lv+-1'
            type='text'
            value={lv}
            onChange={this._handleInputChange}
          />
        </div>
        <div>
          <span>condition</span>
          <Select
            className="inline-input"
            name="condition+-1"
            value={condition}
            options={options.skillCondition}
            onChange={(val) => this._onSelectChange(val, 'condition+-1')}
            matchProp="label"
            clearable={false}
          />
        </div>
        <div>
          <h5>效果
            <Button bsStyle="primary" className="button-add" onClick={() =>
              this.setState({ effect: [...effect, {}] })
            }>+</Button>
          </h5>
          {
            effect.map((v, i) => (
              <Effect
                key={v['id']+','+i}
                name={"effect+" + i}
                data={v}
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
        </div>
        <div>
          <span>初始 CD</span>
          <FormControl
            className="inline-input"
            name='initialCD+-1'
            type='number'
            value={initialCD}
            onChange={this._handleInputChange}
          />
        </div>
      </div>
    )
  }
}


export class ClassSkill extends Component {
  constructor(props) {
    super(props)
    const { data } = props
    this.state = {
      name: data['name'] || '',
      lv: data['lv'] || '',
      effect: data['effect'] || { duration: 99999 },
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
      lv,
      effect,
    } = this.state

    return (
      <div>
        <div>
          <span>name</span>
          <FormControl
            className="inline-input"
            name='name+-1'
            type='text'
            value={name}
            onChange={this._handleInputChange}
          />
        </div>
        <div>
          <span>lv</span>
          <FormControl
            className="inline-input"
            name='lv+-1'
            type='text'
            value={lv}
            onChange={this._handleInputChange}
          />
        </div>
        <div>
          <h5>效果</h5>
          <Effect
            name={"effect+-1"}
            data={effect}
            onChange={this._handleInputChange}
            onDelete={() => {}}
          />
        </div>
      </div>
    )
  }
}

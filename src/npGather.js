import React, { Component } from 'react'
import Select from 'react-select';
import AV from 'leancloud-storage'
import { withRouter } from 'react-router-dom'

import {
  Form,
  ControlLabel,
  Button,
  Table,
} from 'react-bootstrap'

import { pad } from './utils'

import { Skill, ClassSkill } from './skillForm'
import { NP } from './npForm'

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

class MyForm extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      disabled: false,
      mssg: 'Loading',
    }
  }

  componentDidMount() {
    const query = new AV.Query('Servant')
    query.equalTo('id', pad(parseInt(this.props.id), 3))
    query.find().then((results) => {
      if (results.length !== 1) {
        console.log(pad(parseInt(this.props.id), 3), results)
        return
      }
      const s = this.servant = results[0]
      console.log("get", s)
      const values = {}
      for (const k of ['skill1', 'skill2', 'skill3', 'np', 'classSkill']) {
        values[k] = JSON.parse(s.get(k) || '[]')
      }
      console.log(values)

      this.setState({
        loading: false,
        verified: false,
        ...values,
      })

    }, (err) => {
      console.log(err)
    })

    // const values = {}
    // for (const k of ['skill1', 'skill2', 'skill3', 'np']) {
    //   values[k] = JSON.parse('[]')
    // }
    // console.log(values)
    // values['classSkill'] = []

    // this.setState({
    //   loading: false,
    //   verified: false,
    //   ...values,
    // })
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
  }

  _logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
  }

  _submit = event => {
    console.log(this.state)
    event.preventDefault()
    for (const k of ['skill1', 'skill2', 'skill3', 'np', 'classSkill']) {
      this.servant.set(k, JSON.stringify(this.state[k]))
    }
    this.servant.set('npVerified', 1)
    this.setState({
      mssg: '上传中',
      loading: true,
    })
    this.servant.save().then((obj) => {
      console.log(obj)
      // this.props.history.push('/np')
      this.props.history.push('/np/' + (parseInt(this.props.id) + 1))
      window.location.reload()
    }, (err) => {
      console.log(err)
    })
  }

  render() {
    const {
      loading,
      mssg,
      disabled,
      verified,
      skill1,
      skill2,
      skill3,
      np,
      classSkill,
    } = this.state

    if (loading) {
      return (
        <p>{mssg}</p>
      )
    }

    const options = [
      {
        label: '中文',
        value: 1,
      },
      {
        label: '中文1',
        value: 2,
      },
    ]

    const skill = [skill1, skill2, skill3]

    return (
      <Form horizontal onSubmit={this._submit}>
        <h4>wiki 链接：<a target="_blank" href={'http://fgowiki.com/guide/petdetail/' + this.props.id}>fgowiki.com/guide/petdetail/{this.props.id}</a></h4>
        <h4>wiki 链接：<a target="_blank" href={'http://kazemai.github.io/fgo-vz/svtData.html?no=' + this.props.id}>http://kazemai.github.io/fgo-vz/svtData.html?no={this.props.id}</a></h4>
        {/* <Select
          name="form-field-name"
          value="one"
          options={options}
          onChange={this.logChange}
          matchProp="label"
          clearable={false}
        /> */}
        {
          ['skill1', 'skill2', 'skill3'].map((n, idx) => (
            <Table striped bordered condensed hover key={n}>
              <tbody>
                <tr>
                  <td colSpan="2">
                    <ControlLabel>{n}</ControlLabel>
                    <Button bsStyle="primary" className="button-add" onClick={() =>
                      this.setState({ [n]: [...skill[idx], ...[skill[idx][skill[idx].length - 1]|| {}]] })
                    }>+</Button>
                  </td>
                </tr>
                    {
                      skill[idx].map((v, i) => (
                        <tr key={v.name + ',' + i}>
                          <td>
                            <Button bsStyle="danger" onClick={() =>
                              this.setState({ [n]: [
                                ...skill[idx].slice(0, i),
                                ...skill[idx].slice(i + 1, skill[idx].length),
                              ]})
                            }>-</Button>
                          </td>
                          <td>
                            <Skill
                              name={n + '+' + i}
                              data={v}
                              onChange={this._handleInputChange}
                            />
                          </td>
                        </tr>
                      ))
                    }
              </tbody>
            </Table>
          ))
        }

        <div>
          <h5>
            职介技能
            <Button bsStyle="primary" className="button-add" onClick={() =>
              this.setState({ classSkill: [...classSkill, {}] })
            }>+</Button>
          </h5>
          {
            classSkill.map((v, i) => (
              <div key={v.value+','+i}>
                <Button bsStyle="danger" onClick={() =>
                  this.setState({ classSkill: [
                    ...classSkill.slice(0, i),
                    ...classSkill.slice(i + 1, classSkill.length),
                  ]})
                }>-</Button>
                <ClassSkill
                  name={'classSkill+' + i}
                  data={v}
                  onChange={this._handleInputChange}
                />
              </div>
            ))
          }
        </div>

        <h5>宝具
          <Button bsStyle="primary" className="button-add" onClick={() =>
            this.setState({ np: [...np, ...[np[np.length - 1] || {}]] })
          }>+</Button>
        </h5>
        {
          np.map((v, i) => (
            <NP
              key={i}
              name={"np+" + i}
              data={v}
              onChange={this._handleInputChange}
            />
          ))
        }

          {
            false ? null : (
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
      <div className="App-body NP">
        <RouterForm id={ match.params.id }/>
      </div>
    </div>
  )
}

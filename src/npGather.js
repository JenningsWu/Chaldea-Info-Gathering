import React, { Component, PureComponent } from 'react'

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
} from 'react-bootstrap'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id} className="input-line">
      {label && <Col sm={2} xs={12} style={{minWidth: 80}}>
        <ControlLabel>{label}</ControlLabel>
      </Col>}
      <Col sm={10} xs={12}>
          <FormControl {...props} />
      </Col>
    </FormGroup>
  );
}

class MyForm extends Component {
  constructor() {
    super()
    this.state = {
      id: 0,
      name: '',
    }
  }

  _handleInputChange = event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    console.log(target.value)
    this.setState({
      [name]: value
    })
  }

  _submit = event => {
    event.preventDefault()
    alert(JSON.stringify(this.state, null, 2))
  }

  render() {
    const {
      name,
      id,
    } = this.state

    return (
      <Form horizontal onSubmit={this._submit}>
        <FieldGroup
          name="id"
          type="number"
          label="ID"
          // value={id}
          value={this.props.id}
          disabled
          onChange={this._handleInputChange}
        />
        <FieldGroup
          name="name"
          type="text"
          label="从者名"
          value={name}
          onChange={this._handleInputChange}
        />
        {/* <FormGroup className="input-line">
          <Col xs={12} sm={2}>
            <ControlLabel>稀有度</ControlLabel>
          </Col>
          <Col xs={12} sm={10}>
            <FormControl
              componentClass="select"
              placeholder="稀有度"
              name="rarity"
              value={rarity}
              onChange={this._handleInputChange}
            >
              <option value={-1}>特殊</option>
              <option value={0}>零星</option>
              <option value={1}>一星</option>
              <option value={2}>二星</option>
              <option value={3}>三星</option>
              <option value={4}>四星</option>
              <option value={5}>五星</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3}>
            <FieldGroup
              name="startATK"
              type="number"
              label="初始 ATK"
              value={startATK}
              onChange={this._handleInputChange}
            />
          </Col>
          <Col xs={3}>
            <FieldGroup
              name="endATK"
              type="number"
              label="满级 ATK"
              value={endATK}
              onChange={this._handleInputChange}
            />
          </Col>
          <Col xs={3}>
            <FieldGroup
              name="startHP"
              type="number"
              label="初始 HP"
              value={startHP}
              onChange={this._handleInputChange}
            />
          </Col>
          <Col xs={3}>
            <FieldGroup
              name="endHP"
              type="number"
              label="满级 HP"
              value={endHP}
              onChange={this._handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col xs={3}>
            <FieldGroup
              name="illustrator"
              type="text"
              placeholder="Illustrator"
              label="画师"
              value={illustrator}
              onChange={this._handleInputChange}
            />
          </Col>
          <Col xs={3}>
            <FieldGroup
              name="cv"
              type="text"
              label="配音"
              placeholder="Voice Actor"
              value={cv}
              onChange={this._handleInputChange}
            />
          </Col>
          <Col xs={3} className="input-line">
            <Col sm={2} xs={12} style={{minWidth: 80}}>
              <ControlLabel style={{ textAlign: 'center' }}>属性</ControlLabel>
            </Col>
            <Col sm={10} xs={12}>
              <FormControl
                componentClass="select"
                placeholder="attribute"
                name="attribute"
                value={attribute}
                onChange={this._handleInputChange}
              >
                <option value={0}>人</option>
                <option value={1}>天</option>
                <option value={2}>地</option>
                <option value={3}>星</option>
                <option value={4}>兽</option>
              </FormControl>
            </Col>
          </Col>
          <Col xs={3}>
            <FieldGroup
              label="阵营"
              name="alignment"
              type="text"
              placeholder="Alignment"
              value={alignment}
              onChange={this._handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col xs={2}>
            <ControlLabel>色卡</ControlLabel>
          </Col>
          <Col sm={10} xs={10}>
            <CardsInput
              onChange={this._handleInputChange}
              name="cards"
              value={cards}
              placeholder={['蓝卡数', '红卡数', '绿卡数']}
            />
          </Col>

          <Col sm={12} xs={6}>
            <CardsInput
              onChange={this._handleInputChange}
              name="hits"
              value={hits}
              placeholder={['蓝卡 hit 数', '红卡 hit 数', '绿卡 hit 数', 'extra hit 数']}
            />
          </Col>


          <Col sm={12} xs={6}>
            <CardsInput
              onChange={this._handleInputChange}
              name="charge"
              value={charge}
              placeholder={['绿卡 NP 获取率', '蓝卡 NP 获取率', '红卡 NP 获取率', 'extra NP 获取率']}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col xs={3}>
            <FieldGroup
              name="starAbsorption"
              type="number"
              label="暴击权重"
              placeholder="starAbsorption"
              value={starAbsorption}
              onChange={this._handleInputChange}
            />
          </Col>
          <Col xs={3}>
            <FieldGroup
              name="starGeneration"
              type="number"
              label="掉星率"
              placeholder="starGeneration"
              value={starGeneration}
              onChange={this._handleInputChange}
            />
          </Col>
            <Col xs={3}>
              <FieldGroup
                name="npChargeATK"
                type="number"
                label="宝具 NP 获取率"
                placeholder="npChargeATK"
                value={npChargeATK}
                onChange={this._handleInputChange}
              />
            </Col>
            <Col xs={3}>
              <FieldGroup
                name="npChargeDEF"
                type="number"
                label="受击 NP 获取率"
                placeholder="npChargeDEF"
                value={npChargeDEF}
                onChange={this._handleInputChange}
              />
            </Col>
        </FormGroup>
        <FieldGroup
          name="traits"
          type="text"
          label="特性"
          placeholder="traits"
          value={traits}
          onChange={this._handleInputChange}
        /> */}
        <div className="submit">
          <Button type="submit">
            Submit
          </Button>
        </div>
      </Form>
    )
  }
}

export default function ServantGather({ match }) {
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

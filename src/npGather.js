import React, { Component, PureComponent } from 'react'
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
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
      loading: false,
      disabled: false,
      mssg: 'Loading',
    }
  }

  componentDidMount() {
    // const query = new AV.Query('Servant')
    // query.equalTo('id', pad(parseInt(this.props.id), 3))
    // query.find().then((results) => {
    //   if (results.length != 1) {
    //     console.log(pad(parseInt(this.props.id), 3), results)
    //     return
    //   }
    //   const s = this.servant = results[0]
    //   console.log("get", s)
    //   const values = {}
    //   for (const k of basicList) {
    //     values[k] = s.get(k)
    //   }
    //
    //   this.setState({
    //     loading: false,
    //     verified: s.get('verified'),
    //     ...values,
    //   })
    //
    // }, (err) => {
    //   console.log(err)
    // })
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

  _logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
  }

  _submit = event => {
    event.preventDefault()
    alert(JSON.stringify(this.state, null, 2))
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

    return (
      <Form horizontal onSubmit={this._submit}>
        <h4>wiki 链接：<a target="_blank" href={'http://fgowiki.com/guide/petdetail/' + this.props.id}>fgowiki.com/guide/petdetail/{this.props.id}</a></h4>
        <Select
          name="form-field-name"
          value="one"
          options={options}
          onChange={this.logChange}
          matchProp="label"
        />
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

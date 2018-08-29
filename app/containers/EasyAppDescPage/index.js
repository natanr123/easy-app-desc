/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import loadProblemWatcher from './saga';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class EasyAppDescPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { storeListing: { title: '', shortDescription: '', fullDescription: '' } };
  }


  componentDidMount() {
    console.log('aaaaaaaaaaaaaaaaaaaaa');
    let stateStr = window.localStorage.getItem('state');
    if(!stateStr) {
      return;
    }
    let state  = JSON.parse(stateStr);
    console.log('sssssssSSSSS: ',state);
    this.setState(state);
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Easy App Desc</title>
          <meta
            name="Easy App Desc page"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          <p>bbbbbbbbbbbbbbbbbb</p>
          <h3>App</h3>
          {
            this.createInput('title')
          }
          {
            this.createInput('shortDescription')
          }
          {
            this.createInput('fullDescription')
          }
          <form action={'/uploads'} encType={'multipart/form-data'} method="POST">
            <input type="file" name={'file'} onChange={this.props.handleFileUpload} />
            <input type={'submit'} />
          </form>


          <br />
          <button
            onClick={() => {
              this.props.onSubmitButtonClicked(this.state.problem);
            }}
          >
          </button>
        </div>
      </article>
    );
  }

  createInput(name) {
//
    const onInputChange = (e)=>{
      let newStore  = { ...this.state.storeListing }
      newStore[name] = e.target.value;
      let newState = { ...this.state };
      newState.storeListing = newStore;

      let myStorage = window.localStorage;
      myStorage.setItem('state', JSON.stringify(newState));
      this.setState(newState);
    };


    return (
      <p>
        <span>{name}:</span>
        <input value={this.state.storeListing[name]} onChange={(e) => {onInputChange(e)}} />
      </p>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitButtonClicked: problem => {
      //console.log('onSubmitButtonClickedonSubmitButtonClicked: ', problem);
      //dispatch(createProblem(problem));
    },
    handleFileUpload: (e) => {
      const file = e.target.files[0];
      console.log('onUploadButtonClickedonUploa44444444444: ', file);

      dispatch(actions.uploadImage(file));
    }
  };
}

EasyAppDescPage.propTypes = {
  onSubmitButtonClicked: PropTypes.func,
  handleFileUpload: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'easyAppDesc', reducer });
const withSaga = injectSaga({ key: 'easyAppDesc', saga: loadProblemWatcher });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EasyAppDescPage);

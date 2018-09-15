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
    let stateStr = window.localStorage.getItem('state');
    if(!stateStr) {
      return;
    }
    let state  = JSON.parse(stateStr);
    this.setState(state);
  }

  createInput(name) {
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

  render() {
    const { image512path } = this.props;
    console.log('image512pathimage512pathimage512path: ',image512path);
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
          <h3>Store Listing</h3>
          {
            this.createInput('title')
          }
          {
            this.createInput('shortDescription')
          }
          {
            this.createInput('fullDescription')
          }
          <div>


            <div>
              <form action={'/uploads'} encType={'multipart/form-data'} method="POST">
                Convert To Min length for any side: 320px. Max length for any side: 3840px. Max aspect ratio: 2:1.:
                <input type="file" name={'file'} onClick={(event) => { event.target.value = null; }} onChange={(e) => {this.props.handleFileUpload(e, 'screenshoot')}} />
              </form>
              <div>
                <img style={{ width: '100px', height: '100px' }} alt={image512path} src={image512path} />
              </div>
            </div>
            <br />
            <div>
              <form action={'/uploads'} encType={'multipart/form-data'} method="POST">
                Convert To 512x512 Hi-res icon:
                <input type="file" name={'file'} onClick={(event) => { event.target.value = null; }} onChange={(e) => {this.props.handleFileUpload(e, 'icon_high_res')}} />
              </form>
              <div>
                <img style={{ width: '100px', height: '100px' }} alt={image512path} src={image512path} />
              </div>
            </div>
          </div>

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


}

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitButtonClicked: problem => {
      //console.log('onSubmitButtonClickedonSubmitButtonClicked: ', problem);
      //dispatch(createProblem(problem));
    },
    handleFileUpload: (e, photoType) => {
      console.log('photoTypephotoTypephotoType: ', photoType);
      const file = e.target.files[0];
      dispatch(actions.uploadImage(file, photoType));
    }
  };
}

EasyAppDescPage.propTypes = {
  onSubmitButtonClicked: PropTypes.func,
  handleFileUpload: PropTypes.func,
  image512path: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    image512path: state.get('easyAppDesc').get('image512path'),
  };
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

/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import {fromJS} from 'immutable';
import React from 'react';
import {Helmet} from 'react-helmet';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import loadProblemWatcher from './saga';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class EasyAppDescPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  getLocalStorage() {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) { // The key 'state' does not exist.
      return null;
    }

    const obj = JSON.parse(serializedState);
    // const im = fromJS(obj);
    // console.log('iiiiiiiiiiiiiiii: ', im);
    return obj;
  }


  componentDidMount() {
    // let stateStr = window.localStorage.getItem('state');
    // if(!stateStr) {
    //   return;
    // }
    // let state  = JSON.parse(stateStr);
    // this.setState(state);
    const easyAppDescObj = this.getLocalStorage();
    console.log('easyAppDescObjeasyAppDescObjeasyAppDescObjeasyAppDescObj: ', easyAppDescObj);
    if (easyAppDescObj) {
      this.props.loadLocalStorage(fromJS(easyAppDescObj.storeListing), fromJS(easyAppDescObj.images));
    }
  }

  createInput(name, storeListing) {
    return (
      <p>
        <span>{name}:</span>
        <input
          value={storeListing.get(name)}
          onChange={(e) => {
            this.props.storeListingChanged(name, e.target.value);
          }}
        />
      </p>
    );
  }

  render() {
    const { images } = this.props;
    console.log('imagesimagesimagesimagesimagesimages: ', images);
    const imagesObj = images.toObject();
    const iconHiResSrc = imagesObj['icon_high_res'];
    const screenshootSrc = imagesObj['screenshoot'];
    const storeListing = this.props.storeListing ? this.props.storeListing : {title: ''};
    console.log('this.props.storeListing: ', this.props.storeListing.get('title'));


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
            this.createInput('title', storeListing)
          }
          {
            this.createInput('shortDescription', storeListing)
          }
          {
            this.createInput('fullDescription', storeListing)
          }
          <div>


            <div>
              <form action={'/uploads'} encType={'multipart/form-data'} method="POST">
                Convert To Min length for any side: 320px. Max length for any side: 3840px. Max aspect ratio: 2:1.:
                <input type="file" name={'file'} onClick={(event) => {
                  event.target.value = null;
                }} onChange={(e) => {
                  this.props.handleFileUpload(e, 'screenshoot')
                }}/>
              </form>
              <div>
                <img style={{width: '100px', height: '100px'}} alt={screenshootSrc} src={screenshootSrc}/>
              </div>
            </div>
            <br />
            <div>
              <form action={'/uploads'} encType={'multipart/form-data'} method="POST">
                Convert To 512x512 Hi-res icon:
                <input type="file" name={'file'} onClick={(event) => {
                  event.target.value = null;
                }} onChange={(e) => {
                  this.props.handleFileUpload(e, 'icon_high_res');
                }}/>
              </form>
              <div>
                <img style={{width: '100px', height: '100px'}} alt={iconHiResSrc} src={iconHiResSrc}/>
              </div>
            </div>
            <br />
            <div>
              <form action={'/uploads'} encType={'multipart/form-data'} method="POST">
                Convert To Feature Graphic 1024 w x 500 h:
                <input type="file" name={'file'} onClick={(event) => {
                  event.target.value = null;
                }} onChange={(e) => {
                  this.props.handleFileUpload(e, 'feature_graphic');
                }}
                />
              </form>
              <div>
                <img style={{width: '100px', height: '100px'}} alt={imagesObj.feature_graphic} src={imagesObj.feature_graphic} />
              </div>
            </div>
          </div>

          <br/>
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
    storeListingChanged: (name, value) => {
      dispatch(actions.storeListingChanged(name, value));
    },
    handleFileUpload: (e, photoType) => {
      console.log('photoTypephotoTypephotoType: ', photoType);
      const file = e.target.files[0];
      dispatch(actions.uploadImage(file, photoType));
    },
    loadLocalStorage: (storeListing, images) => {
      dispatch(actions.loadLocalStorage(storeListing, images));
    },
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    images: state.get('easyAppDesc').get('images'),
    storeListing: state.get('easyAppDesc').get('storeListing'),
  };
};


EasyAppDescPage.propTypes = {
  onSubmitButtonClicked: PropTypes.func,
  handleFileUpload: PropTypes.func,
  storeListingChanged: PropTypes.func,
  loadLocalStorage: PropTypes.func,
  images: PropTypes.any,
  storeListing: PropTypes.any,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({key: 'easyAppDesc', reducer});
const withSaga = injectSaga({key: 'easyAppDesc', saga: loadProblemWatcher});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EasyAppDescPage);

import React from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component {
  onPressEnter = (event) => {
    if (event.key === 'Enter') {
      this.props.onPictureSubmit();
    }
  }

  render() {
    return (
      <div>
        <p className='f3'>
          {"This app detects face in your picture. Give it a try!"}
        </p>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
            <input className='center f4 pa2 w-70' type='text'
              onChange={this.props.onInputChange} onKeyDown={this.onPressEnter} />
            <button className='w-30 grow  f4 link ph3 pv2 dib white bg-light-purple'
              onClick={this.props.onPictureSubmit} onKeyDown={this.onPressEnter}>Detect</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;

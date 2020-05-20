import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import open from '../images/open.png';
import linkCopy from '../images/link-copy.png';
import more from '../images/more.png';
import CloseIcon from '@material-ui/icons/Close';
import URLinkLogoBox from '../images/logo-urlink-box.png';

export function CategoryTab({text, toggleDeleteModal}) {

    const [open, setOpen] = useState(false);

    const handleOpenToggle = (e) => {
      e.stopPropagation();
      setOpen(!open);
    };

    const [clicked, setClicked] = useState('');

    const handleToggle = (e) => {
      setClicked(text);
    }   

    return (
      <div className="tab-container">
        <div className={"default-tab " + (clicked === text ? 'active' : '')} onClick={handleToggle} >
            {text}
          <div className="default-tab-total">
            탭 <span className="default-tab-number">4</span>개
          </div>
          <IconButton
            className="btn-more"
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleOpenToggle}
          >
            <MoreVertIcon className="btn-more" />
          </IconButton>
        </div>
        <div className={"tab-more-menu " + (open ? '' : 'hidden')}> 
          <button type="button" onClick={handleOpenToggle}>이름변경</button>
          <button type="button" 
                  onClick={function() {
                    setOpen(!open);
                    toggleDeleteModal(); }}>
            삭제</button>
        </div>
      </div>
    );
}


export function CategoryCard({img, title, desc, url}) {

    const [clicked, setClicked] = React.useState(false);

    const handleToggle = (e) => {
      console.log(clicked);
      setClicked(!clicked);
    }   

    const onClick = (e) => {
      e.stopPropagation();
    }

    return (

        <div className="default-card" onClick={handleToggle}>
            <img src={img} alt="card"></img>
            <div className="card-title">{title}</div>
            <div className="card-desc">{desc}</div>
            <div className="card-url">{url}</div>
            <div className="card-btn-group">
              <button type="button" onClick={onClick}>
                <img src={open} alt="open button"></img>
              </button>
              <button type="button" onClick={onClick}>
                <img src={linkCopy} alt="linkCopy button"></img>
              </button>
              <button type="button" onClick={onClick}>
                <img src={more} alt="more button"></img>
              </button>
            </div>

            <div className={(clicked ? 'blue-layer' : '')}></div>
        </div>
    );
}



export function AlarmCard({title, date}) {

  return (
        <div>
          <div className="alarm-contents">
            <img src={URLinkLogoBox} alt="person button"></img>
            <div>
              <p className="title">{title}</p>
              <p className="date">{date}</p>
            </div>
            <CloseIcon className="btn-close" />
          </div>
        </div>
  );
}



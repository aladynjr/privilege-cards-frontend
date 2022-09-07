import React, { useEffect } from 'react'
import clsx from 'clsx';

function Modal({onClick,
                      titletext,
                      titlecolor,
                      bodytext, 
                      titlebgcolor, 
                      buttontext, 
                      buttonbgcolor, 
                      notice, 
                      points, 
                      custommessage,
                      buttontext2,
                      buttonbgcolor2,
                      onClick2,
                      fullscreen=false, 
                      backgroundColor,
                      buttonClassName,
                      buttonContainerClassName,
                      enteranimation=true,
                    }) {
  
    //click enter to run onclick
    useEffect(() => {
      const listener = event => {
        if ((event.code === "Enter" || event.code === "NumpadEnter")) {
          
          event.preventDefault();
          document.body.style.overflow = 'unset';
          onClick();
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }, []);
useEffect(()=>{
    if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden';
    }
},[])

useEffect(() => {
  return () => {
    document.body.style.overflow = 'unset';

  }
}, [])
  return (
    <div>
        
        <div className={clsx("modal  ",enteranimation && 'animate slide', fullscreen && 'fullscreenmodal')} style={{ zIndex: '1000', marginTop: '0px' }} lang='ar'>
                    <div  style={{ background: 'transparent', zIndex: '10', opacity: '0' }} className="overlay"></div>
                    <div className={clsx("modal-content simplecard ", fullscreen && 'fullscreenmodal')} style={{ zIndex: '10',boxShadow: '1px 0.5px 10px 1px lightslategrey', padding:'0px 10px', background: backgroundColor }}>
                        {titletext && <h1 style={{ marginBottom: '0', backgroundColor: titlebgcolor,color:titlecolor, borderRadius: '20px', padding: '0px 20px',height:' fit-content', zIndex:'5' }}>{titletext}</h1>}
                        <div>{bodytext}</div>
                        {points && <h3 style={{direction:'rtl', opacity:'0.4'}}>+ {points} نقطة</h3>}
                        {custommessage}
                        {buttontext &&<div className={buttonContainerClassName} /*style={{position: 'absolute', bottom: '50px'}}*/> <button className={'accept   '+buttonClassName} style={{backgroundColor: buttonbgcolor}} onClick={onClick} lang='ar'>{buttontext}</button>
                        <div style={{opacity:'0.5', fontSize:'13px', marginTop:'0px'}} className='hideonmobile'>Touche d'entrée</div>
                        </div>}
                        

                        {buttontext2 && <button className='accept ' style={{backgroundColor: buttonbgcolor2}} onClick={onClick2} lang='ar'>{buttontext2}</button>}

                         <i style={{ color: 'grey' }}>{notice}</i> 

                    </div>
                </div>
    </div>
  )
}

export default Modal
import { useState, useEffect } from "react";

type BackgroundProps = {
    PageProperties: {},
    isEdit: boolean,
    hasMobileBackground: boolean,
    PropertySection: string,
    mobileBackgroundSection: string,
    className: string
}

function BackgroundDisplay(props: BackgroundProps) {
    let [windowWidth, setWindowWidth] = useState(600);

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    })

    window.onresize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
      console.log('Window Width: ', windowWidth);
      if(windowWidth < 450) {
        console.log('Is Edit: ', props.isEdit);
        console.log('Has Mobile Backgroound: ', props.hasMobileBackground);
      }
    }, [windowWidth]);

    return (
        <>
        {
            props.isEdit ?
            (
                props.PageProperties[props.PropertySection].backgroundColor || props.PageProperties[props.PropertySection].backgroundImage ?
                    <div className={props.className} style={props.PageProperties[props.PropertySection]}></div> : 
                    (
                      props.PageProperties[props.PropertySection].backgroundVideo ? 
                      <div className={props.className} style={props.PageProperties[props.PropertySection]}>
                        <video autoPlay loop style={{height: "100%", width: "100%"}}>
                          <source src={props.PageProperties[props.PropertySection].backgroundVideo.replace("url(", "").replace(")", "")}/>
                        </video>
                      </div> : <div className={props.className} style={props.PageProperties[props.PropertySection]}></div>
                    )
            ) : props.hasMobileBackground ? 
            (
                windowWidth > 450 ? (
                    props.PageProperties[props.PropertySection].backgroundColor || props.PageProperties[props.PropertySection].backgroundImage ?
                    <div className={props.className} style={props.PageProperties[props.PropertySection]}></div> : 
                    (
                      props.PageProperties[props.PropertySection].backgroundVideo ? 
                      <div className={props.className} style={props.PageProperties[props.PropertySection]}>
                        <video autoPlay loop style={{height: "100%", width: "100%"}}>
                          <source src={props.PageProperties[props.PropertySection].backgroundVideo.replace("url(", "").replace(")", "")}/>
                        </video>
                      </div> : (
                        props.PageProperties[props.PropertySection].backgroundAudio ? 
                        <audio autoPlay loop style={{height: "100%", width: "100%"}}>
                          <source src={props.PageProperties[props.PropertySection].backgroundAudio.replace("url(", "").replace(")", "")}/>
                        </audio> : 
                        <div className={props.className} style={props.PageProperties[props.PropertySection]}></div>
                      )
                    )
                  ) : (
                    props.PageProperties[props.mobileBackgroundSection].backgroundColor || props.PageProperties[props.mobileBackgroundSection].backgroundImage ?
                    <div className={props.className} style={props.PageProperties[props.mobileBackgroundSection]}></div> : 
                    (
                      props.PageProperties[props.mobileBackgroundSection].backgroundVideo ? 
                      <div className={props.className} style={props.PageProperties[props.mobileBackgroundSection]}>
                        <video autoPlay loop style={{height: "100%", width: "100%"}} key={props.mobileBackgroundSection} >
                          <source src={props.PageProperties[props.mobileBackgroundSection].backgroundVideo.replace("url(", "").replace(")", "")}/>
                        </video>
                      </div> : (
                        props.PageProperties[props.mobileBackgroundSection].backgroundAudio ? 
                        <audio autoPlay loop style={{height: "100%", width: "100%"}} key={props.mobileBackgroundSection}>
                          <source src={props.PageProperties[props.mobileBackgroundSection].backgroundAudio.replace("url(", "").replace(")", "")}/>
                        </audio> : 
                        <div className={props.className} style={props.PageProperties[props.mobileBackgroundSection]}></div>
                      )
                    )
                  )
            ) : 
            (
                props.PageProperties[props.PropertySection].backgroundColor || props.PageProperties[props.PropertySection].backgroundImage ?
                    <div className={props.className} style={props.PageProperties[props.PropertySection]}></div> : 
                    (
                      props.PageProperties[props.PropertySection].backgroundVideo ? 
                      <div className={props.className} style={props.PageProperties[props.PropertySection]}>
                        <video autoPlay loop style={{height: "100%", width: "100%"}}>
                          <source src={props.PageProperties[props.PropertySection].backgroundVideo.replace("url(", "").replace(")", "")}/>
                        </video>
                      </div> : (
                        props.PageProperties[props.PropertySection].backgroundAudio ? 
                        <audio autoPlay loop style={{height: "100%", width: "100%"}}>
                          <source src={props.PageProperties[props.PropertySection].backgroundAudio.replace("url(", "").replace(")", "")}/>
                        </audio> : 
                        <div className={props.className} style={props.PageProperties[props.PropertySection]}></div>
                      )
                    )
            )
        }
        </>
    );
}

export default BackgroundDisplay;
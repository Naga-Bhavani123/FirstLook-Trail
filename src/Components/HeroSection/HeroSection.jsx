import React, { useState } from 'react'
import './HeroSection.css'
import { ClipLoader } from 'react-spinners'

const HeroSection = () => {
    const [loaded, setIsLoaded] = useState(false);

    return (
        <div className='trailerDiv'>

            {!loaded && (
                <div className="spinner-container">
                    <ClipLoader color="#FF0000" size={60} />
                </div>
            )}

            <video
                autoPlay
                loop
                muted
                className={`trailer ${loaded ? 'visible' : 'hidden'}`}
                preload="auto"
                playsInline
                onCanPlayThrough={() => setIsLoaded(true)}  
            >
                <source src="public/trailer2.mp4" />
            </video>

            {/* {loaded && (
                <div className="trailerName">
                    <span>M</span><span>y</span><span style={{ width: '20px', display: 'inline-block' }}></span><span>F</span>
                    <span>a</span><span>u</span><span>l</span><span>t</span>
                </div>
            )} */}
        </div>
    );
};

export default HeroSection;

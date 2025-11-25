import React, { useState } from 'react'
import './HeroSection.css'
import { ClipLoader } from 'react-spinners'

const HeroSection = () => {
    const [loaded, setIsLoaded] = useState(false);

    return (
        <div className='trailerDiv'>

          
            <img src = "https://res.cloudinary.com/dcexw9qg0/image/upload/v1764064198/Screenshot_2025-11-25_151932_rmpi5w.png"/>

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

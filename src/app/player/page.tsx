import React from 'react'
import ReactPlayer from 'react-player';

export default function page() {
    return (
        <div>page
            <ReactPlayer
                width="320px"
                height="180px"
                src="https://www.youtube.com/watch?v=XnNaOO5B_QE"
                config={{
                    youtube: {
                        start: 400
                    }
                }}
                />
        </div>
    )
}

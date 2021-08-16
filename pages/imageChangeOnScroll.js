import React from 'react'
import ImageToggleOnScroll from '../src/imageToggleOnScroll'

function imageChangeOnScroll() {
    return (
        <div>
            {[187, 1124, 823, 1269, 1530].map((speakerId) => {
                return (
                    <div key={speakerId}>
                        <ImageToggleOnScroll
                        primaryImg={`/static/speakers/bw/Speaker-${speakerId}.jpg`}
                        secondaryImg={`/static/speakers/Speaker-${speakerId}.jpg`}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default imageChangeOnScroll;

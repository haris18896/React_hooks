import React, { useEffect, useReducer} from 'react';
import SpeakerData from './SpeakerData';
import speakerReducer from './speakerReducer';


function useSpeakerDataManager(speakerDataManager) {
  const [{ isLoading, speakerList }, dispatch] = useReducer(speakerReducer, {
    isLoading: true,
    speakerList: [],
  });

  function toggleSpeakerFavorite(speakerRec){
    speakerRec.favorite === true ?
        dispatch({type: 'unfavorite', id: speakerRec.id})
        : dispatch({type: "unfavorite", id: speakerRec.id});
  };

  useEffect(() => {
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      dispatch({
        type: 'setSpeakerList',
        data: SpeakerData
      });
    });

    return () => {
      console.log('cleanup');
    };
  }, []);
  return {isLoading, speakerList, toggleSpeakerFavorite};
}

export default useSpeakerDataManager;

import { createSlice } from '@reduxjs/toolkit';

export const imageAndPinsSlice = createSlice({
  name: 'imageAndPins',
  initialState: {
    imageFeedbackSets: [{
      image: ``,
      pins: []
    }]
  },
  reducers: {
    addPinToImage: (state, action) => {
      console.log(`action:`);
      console.log(action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const matchingImageFeedbackSet = state.imageFeedbackSets.filter((IFS) => {
        return action.payload.image === IFS.image
      })[0];
      if(matchingImageFeedbackSet) {
        matchingImageFeedbackSet.pins.push(action.payload.newPin);
        return;
      }
      const newImageFeedbackSet = {
        image: action.payload.image,
        pins: [action.payload.newPin]
      }
      state.imageFeedbackSets.push(newImageFeedbackSet)
    }
  }
});

export const { addPinToImage } = imageAndPinsSlice.actions

export default imageAndPinsSlice.reducer
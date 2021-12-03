import { OnboardingTypes, OnboardingSteps } from '../actions/onboarding';

const initialState = {
  currentStep: null
};

export const Order = [
  OnboardingSteps.buildAvatar,
  OnboardingSteps.registerEmail,
  OnboardingSteps.setUsername,
  OnboardingSteps.welcomeScreen,
];

const start = (action, state) => {
  return {
    ...state,
    currentStep: Order[0]
  }
};

const next = (action, state) => {
  var current = Order.findIndex(e => e === state.currentStep) || 0;
  var next = current;
  if(current <= Order.length-1) next = current +1;
  return {
    ...state,
    currentStep: Order[next]
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    // @formatter:off
    case OnboardingTypes.START:
      return start(action, state);
    case OnboardingTypes.NEXT:
      return next(action, state);
    default:
      return state;
    // @formatter:on
  }
}
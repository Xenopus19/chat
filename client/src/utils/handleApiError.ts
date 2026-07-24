import { makeMessage } from "@/reducers/message";
import type { AppDispatch } from "@/store";
import isErrorWithMessage from "@/utils/isErrorWithMessage";

export const handleApiError = (
  error: unknown,
  dispatch: AppDispatch,
  fallbackMessage = "An unknown error occurred.",
) => {
  if (isErrorWithMessage(error)) {
    console.log(error.message);
    dispatch(makeMessage(error.message, true));
  } else {
    dispatch(makeMessage(fallbackMessage, true));
  }
};

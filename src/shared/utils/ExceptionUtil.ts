"use client";
export const alertGeneralHttpError = (error: unknown) => {
  let message = "An unknown error occurred";

  if (error instanceof Error) {
    message = error.message;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    message = String((error as { message: unknown }).message);
  } else if (typeof error === "string") {
    try {
      const parsed = JSON.parse(error);
      if (parsed && typeof parsed === "object" && "message" in parsed) {
        message = String(parsed.message);
      }
    } catch {
      message = error; // If not valid JSON, use raw string
    }
  }

  try {
    message = JSON.parse(message).message;
  } catch {
    // Do nothing
  }
  alert(message);
};

export const catchAndAlert = (
  fn: () => Promise<unknown>
): (() => Promise<void>) => {
  return async () => {
    try {
      await fn();
    } catch (error) {
      alertGeneralHttpError(error);
    }
  };
};

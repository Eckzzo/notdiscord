interface FieldError {
  field: string;
  message: string;
}

function fieldError(field: string, message: string) {
  return { error: { field, message } };
}

export type { FieldError };
export { fieldError };

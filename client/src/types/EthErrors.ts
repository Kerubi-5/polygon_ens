export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: RpcErrorData;
}

export type RpcErrorData = {
  code: number;
  message: string;
};

export const isRpcError = (
  error: ProviderRpcError | any
): error is ProviderRpcError => {
  return error.hasOwnProperty("code");
};

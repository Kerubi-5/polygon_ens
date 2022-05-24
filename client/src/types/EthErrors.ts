export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: RpcErrorData;
}

export type RpcErrorData = {
  code: number;
  message: string;
};

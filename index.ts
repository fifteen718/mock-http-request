/** mock请求状态*/
export enum STATUS_TYPE {
  LOADING = 'loading',
  FAILED = 'failed',
  EMPTY = 'empty',
  SUCCESS = 'success',
}

/** mock请求的配置信息 */
export interface MockConfig {
  /** mock数据 */
  responseData: object,
  /** 请求延迟（默认 200 毫秒） */
  delaytime?: number,
  /** 请求状态（默认 'success'） */
  status?: STATUS_TYPE,
  /** 需要设置为空数据的字段（默认 'data'） */
  emptyKey?: string,
}

/** mockRequest方法的唯一入参 */
export interface MockRequestParams {
  /** mock相关的配置 */
  mockConfig: MockConfig,
  /** 请求接口 - 与 httpRequest 保持一致即可 */
  url: string,
  /** 请求方法 - 与 httpRequest 保持一致即可 */
  method: string,
  /** 请求入参 - 与 httpRequest 保持一致即可 */
  data?: any,
  /** 请求头 - 与 httpRequest 保持一致即可 */
  headers?: object,
  [other: string]: any,
}

/**
 * mock请求方法
 * @param MockRequestParams 大萨达
 * @returns 
 */
export function mockRequest<ResponseData>(params: MockRequestParams) {
  // 默认请求延迟 200毫秒
  const DEFAULT_DELAY_TIME = 200;
  const DEFAULT_EMPTY_KEY = 'data';
  return new Promise<ResponseData>(async (resolve, reject) => {
    try {
      window.console.log(`🚀 [mockRequest - start] >>> params: `);
      window.console.log(params)
      const { mockConfig } = params;
      mockConfig.delaytime = mockConfig.delaytime ?? DEFAULT_DELAY_TIME;
      mockConfig.status = mockConfig.status ?? STATUS_TYPE.SUCCESS;
      mockConfig.emptyKey = mockConfig.emptyKey ?? DEFAULT_EMPTY_KEY;
      const { responseData, delaytime, status, emptyKey } = mockConfig;
      setTimeout(() => {
        switch (status) {
          case STATUS_TYPE.LOADING:
            window.console.warn('🚧 [mockRequest - loading]');
            break;
          case STATUS_TYPE.FAILED:
            window.console.warn('🚧 [mockRequest - failed]');
            reject('[mockRequest - FAILED]This is an exception returned from the mock request.');
            break;
          case STATUS_TYPE.EMPTY:
            window.console.warn('🚧 [mockRequest - empty]');
            const jsCode = `responseData.${emptyKey} = null`;
            eval(jsCode);
            resolve(responseData as ResponseData);
            break;
          case STATUS_TYPE.SUCCESS:
          default:
            window.console.log(`✅ [mockRequest - success] ${params.url} >>> responseData: `);
            window.console.log(responseData)
            resolve(responseData as ResponseData);
            break;
        }
      }, delaytime);
    } catch (error: any) {
      window.console.error('❌ [mockRequest - error] error: ');
      window.console.error(error);
      reject(error);
    }
  });
}

export default mockRequest;
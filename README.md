# mock-http-request

Mock http-request for env.development

供开发环境使用的 mockRequest 方法

## Install

Using `npm` to install:

```bash
npm i '@ykkjs/mock-http-request' -D
```

Using `yarn` or `pnpm`:

```bash
# with yarn
yarn add '@ykkjs/mock-http-request' -D

# with pnpm
pnpm add '@ykkjs/mock-http-request' -D
```

## Usage Example

```ts
// 导入 mockRequest
import { mockRequest, STATUS_TYPE } from '@ykkjs/mock-http-request';
// 导入 mock-json-data
import MOCK_LIST_DATA from './mockData/getList.json';
import MOCK_DETAIL_DATA from './mockData/getDetail.json';

// Example - 获取列表数据
const getList = function (data: GetListParam) {
  // 1、注释生产代码
  // return httpRequestAdapter<GetListRes>({
  // 2、使用开发环境下的 mockRequest
  return mockRequest<GetListRes>({
    url: baseURL + '/list',
    method: 'post',
    data,
    mockConfig: {
      responseData: MOCK_LIST_DATA,
      delaytime: 3000,
      status: STATUS_TYPE.EMPTY,
      emptyKey: 'data.list',
    }
  });
};

// Example - 获取详情数据
const getkDetail = function (data: DetailParam) {
  // 1、注释生产代码
  // return httpRequestAdapter<GetDetailRes>({
  // 2、使用开发环境下的 mockRequest
  return mockRequest<GetDetailRes>({
    url: baseURL + '/detail',
    method: 'get',
    mockConfig: {
      responseData: MOCK_DETAIL_DATA,
    }
  });
};
```

## Usage 说明

### 快速使用

1、导入 mock 方法：`mockRequest`。

2、导入 mock 数据：本地的 `json` 文件。

3、使用 mock 方法：`mockRequest` 入参中的 `mockConfig.responseData` 设置为导入的 `mock-json-data`。

### 进阶使用

1、导入请求状态的枚举值：`STATUS_TYPE`;

2、关于 `mockRequest` 入参的 mock 配置项 `mockConfig`:

* `mockConfig.responseData` ：必传的 `mock-json-data`。

* `mockConfig.delaytime` ：请求延迟（默认 200 毫秒）。

* `mockConfig.status` ：请求状态（默认 `STATUS_TYPE.SUCCESS`），根据需求还可以模拟请求状态为 `STATUS_TYPE.LOADING`、`STATUS_TYPE.FAILED`、`STATUS_TYPE.EMPTY`。

* `mockConfig.emptyKey` ：需要设置为空数据的字段（默认 'data'），当请求状态配置的是空状态时，即 `mockConfig.status` = `STATUS_TYPE.EMPTY`，此时还可以配置本地 mock 数据中需要设置为空的字段，例如 `emptyKey: 'data.list'`。
> ❗️需要注意的是，通过配置项来模拟空状态的实现原理是将某个字段设置为`null`。如果需要设置为其他空数据（例如 `{}`、`[]`、`''`等）需要通过修改本地  `mock-json-data` 来实现。

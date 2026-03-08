# Crawler API

这是一个基于 Puppeteer 和 Turndown 的网页爬取接口，可以将网页内容转换为 Markdown 格式。

## 接口地址

- `GET /api/crawler`
- `POST /api/crawler`

## 参数说明

### GET 请求

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `url` | string | 是 | 需要爬取的网页地址 |

**示例：**
```bash
curl "http://localhost:3000/api/crawler?url=https://example.com"
```

### POST 请求

Body (JSON):

| 字段名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `url` | string | 是 | 需要爬取的网页地址 |

**示例：**
```bash
curl -X POST http://localhost:3000/api/crawler \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## 返回结果

成功响应示例：

```json
{
  "success": true,
  "url": "https://example.com",
  "markdown": "# Example Domain\n\nThis domain is for use in illustrative examples in documents..."
}
```

失败响应示例：

```json
{
  "success": false,
  "error": "Failed to crawl the page",
  "details": "Error message details..."
}
```

## 技术栈

- **Puppeteer**: 用于模拟浏览器环境，加载动态网页。
- **Turndown**: 用于将 HTML 内容转换为 Markdown 格式。

## 注意事项

- 爬虫运行在服务端，请确保服务器有足够的内存和 CPU 资源。
- 默认启用了 `headless: true` 模式。
- 接口包含基本的反爬虫对抗设置（User-Agent），但并不保证能爬取所有网站。

import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import TurndownService from 'turndown';

// 提取核心爬取与转换逻辑
async function crawlAndConvert(url: string) {
  let browser;
  try {
    browser =  await puppeteer.launch({
      headless: 'shell', // 新版无头模式（资源占用更低）
    //   executablePath: chromePath, // 使用你指定的系统 Chrome 路径
      args: [
        '--no-sandbox', // 关闭沙箱（macOS 下可省略，但低权限环境需要）
        '--disable-gpu', // 禁用 GPU 加速
        '--disable-dev-shm-usage', // 避免 /dev/shm 内存不足
        '--disable-images', // 禁用图片加载（大幅降低内存占用）
        '--disable-css-animation', // 禁用 CSS 动画
        '--disable-extensions', // 禁用浏览器扩展
        '--disable-plugins', // 禁用插件
        '--disable-background-timer-throttling', // 禁用后台定时器节流
        '--disable-backgrounding-occluded-windows', // 禁用窗口后台化
        '--disable-renderer-backgrounding', // 禁用渲染器后台化
        '--single-process', // 单进程运行（极致轻量化）
        '--no-zygote', // 禁用 zygote 进程
        '--no-first-run', // 跳过首次运行引导
        '--no-default-browser-check', // 跳过默认浏览器检查
        '--mute-audio', // 静音（避免音频相关资源加载）
        '--blink-settings=imagesEnabled=false', // 双重确保图片禁用
        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      ],
      defaultViewport: { width: 1280, height: 720 }, // 合理缩小视口
      timeout: 20000,
      ignoreDefaultArgs: ['--enable-automation'], // 忽略默认自动化参数（降低被检测概率）
      handleSIGINT: true, // 响应 Ctrl+C 终止
      dumpio: false, // 关闭日志输出
      slowMo: 0 // 无延迟执行
    });

    const page = await browser.newPage();
    
    // 设置 User-Agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // 设置视口大小
    await page.setViewport({ width: 1280, height: 800 });

    // 导航到目标 URL
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // 获取并处理 HTML
    const bodyHtml = await page.evaluate(() => {
      // 移除不需要的元素
      const selectorsToRemove = [
        'script', 
        'style', 
        'noscript', 
        'iframe', 
        'svg',
        'img',
        'video',
        'audio',
        'canvas',
        'map',
        'object',
        'embed',
        // 可以根据需要添加更多干扰元素，如广告位等
      ];
      
      selectorsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });

      return document.body.innerHTML;
    });

    // 初始化 Turndown 服务
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      hr: '---',
    });

    // 添加自定义规则：移除隐藏元素
    turndownService.addRule('remove-hidden', {
      filter: (node) => {
        const style = node.getAttribute('style');
        return (
          style?.includes('display: none') || 
          style?.includes('visibility: hidden') ||
          false
        );
      },
      replacement: () => '',
    });

    const markdown = turndownService.turndown(bodyHtml);
    
    return NextResponse.json({ 
      success: true,
      url,
      markdown 
    });

  } catch (error) {
    console.error('Crawler error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to crawl the page', 
        // details: error.message 
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    return crawlAndConvert(url);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL is required as a query parameter' },
      { status: 400 }
    );
  }

  return crawlAndConvert(url);
}

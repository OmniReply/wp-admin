'use client';

import { useState } from 'react';

export default function CrawlerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setMarkdown('');

    try {
      const response = await fetch('/api/crawler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }

      setMarkdown(data.markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    // 简单提示
    const toast = document.createElement('div');
    toast.className = 'toast toast-top toast-center';
    toast.innerHTML = `
      <div class="alert alert-success">
        <span>已复制到剪贴板</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">网页转 Markdown 工具</h1>
          <p className="text-lg opacity-70">输入网页链接，自动提取正文并转换为 Markdown 格式</p>
        </div>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row">
              <input
                type="url"
                placeholder="https://example.com"
                className="input input-bordered flex-1"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="btn btn-primary min-w-[120px]"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : '开始转换'}
              </button>
            </form>
            
            {error && (
              <div role="alert" className="alert alert-error mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {markdown && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title">转换结果</h2>
                <button className="btn btn-sm btn-outline" onClick={copyToClipboard}>
                  复制内容
                </button>
              </div>
              <textarea 
                className="textarea textarea-bordered h-96 font-mono text-sm leading-relaxed w-full" 
                value={markdown} 
                readOnly
              ></textarea>
              <div className="card-actions justify-end mt-4">
                <div className="badge badge-outline">字数: {markdown.length}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

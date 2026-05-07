// WinHack — Cloudflare Worker
// Bind this to: winhack.kemalasliyuksek.com/*
//
// PowerShell tarafindan `irm | iex` ile cagrildiginda WinHack.cmd'yi
// %TEMP%'e indirip yonetici olarak baslatan wrapper'i dondurur.
// Tarayicidan acildiginda kisa bir landing sayfasi gosterir.

const CMD_SOURCE = 'https://raw.githubusercontent.com/kemalasliyuksek/winhack/main/WinHack.cmd';

const wrapperPS = `$ErrorActionPreference = 'Stop'

$tempPath = Join-Path $env:TEMP 'WinHack.cmd'
$source   = '${CMD_SOURCE}'

Write-Host ''
Write-Host '  [WinHack] Script indiriliyor...' -ForegroundColor Cyan

try {
    Invoke-WebRequest -Uri $source -OutFile $tempPath -UseBasicParsing
} catch {
    Write-Host ''
    Write-Host "  [WinHack] Indirme basarisiz: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host '  [WinHack] Internet baglantini kontrol et ve tekrar dene.' -ForegroundColor Yellow
    return
}

Write-Host '  [WinHack] Yonetici olarak baslatiliyor...' -ForegroundColor Cyan
Write-Host ''

try {
    Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', $tempPath -Verb RunAs
} catch {
    Write-Host "  [WinHack] Baslatilamadi: $($_.Exception.Message)" -ForegroundColor Red
}
`;

const landingHTML = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WinHack 1.0</title>
<style>
  :root { color-scheme: dark; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    max-width: 640px; margin: 60px auto; padding: 0 24px;
    color: #e4e4e7; background: #0a0a0a; line-height: 1.6;
  }
  h1 { color: #4ade80; margin-bottom: 4px; font-size: 2rem; }
  .sub { color: #71717a; margin-top: 0; }
  pre {
    background: #18181b; padding: 16px 20px; border-radius: 8px;
    overflow-x: auto; border: 1px solid #27272a;
  }
  code { color: #67e8f9; font-family: 'SF Mono', 'Consolas', monospace; }
  a { color: #f472b6; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .footer { color: #52525b; font-size: 0.875rem; margin-top: 48px; }
</style>
</head>
<body>
<h1>WinHack 1.0</h1>
<p class="sub">Windows ve Office aktivasyon scripti — kişisel kullanım için.</p>

<h3>Kullanım</h3>
<p>PowerShell'i <strong>Yönetici olarak</strong> aç ve şu komutu yapıştır:</p>
<pre><code>irm https://winhack.kemalasliyuksek.com | iex</code></pre>

<p>Açılan menüden istediğin yöntemi seç.</p>

<div class="footer">
<p>Kaynak kod: <a href="https://github.com/kemalasliyuksek/winhack">github.com/kemalasliyuksek/winhack</a></p>
<p>Bu proje <a href="https://github.com/massgravel/Microsoft-Activation-Scripts">MAS</a> projesinin GPL-3.0 lisansı altında özelleştirilmiş türevidir.</p>
</div>
</body>
</html>`;

export default {
  async fetch(request) {
    const ua = request.headers.get('user-agent') || '';
    const isPowerShell = /PowerShell|WindowsPowerShell/i.test(ua);

    if (isPowerShell) {
      return new Response(wrapperPS, {
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'public, max-age=300',
        },
      });
    }

    return new Response(landingHTML, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=600',
      },
    });
  },
};

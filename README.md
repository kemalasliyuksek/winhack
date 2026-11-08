# WinHack

> [!WARNING]
> **Bu proje artık çalışmıyor ve bakımı yapılmıyor.**
>
> `WinHack.cmd` güncel [MAS](https://github.com/massgravel/Microsoft-Activation-Scripts) sürümüne göre güncellenmedi ve güncellenmeyecek. `winhack.kemalasliyuksek.com` adresindeki Cloudflare Worker kaldırıldı, bu yüzden aşağıdaki kurulum komutu artık çalışmaz.
>
> Aktivasyon için doğrudan orijinal projeyi kullan: [massgravel/Microsoft-Activation-Scripts](https://github.com/massgravel/Microsoft-Activation-Scripts)

Kişisel kullanım için özelleştirilmiş Windows / Office aktivasyon scripti.

## Kullanım

PowerShell'i **Yönetici olarak** açıp şu komutu yapıştır:

```powershell
irm https://winhack.kemalasliyuksek.com | iex
```

Açılan menüden istediğin yöntemi seç:

- `[1] HWID` — Windows aktivasyonu (kalıcı, dijital lisans)
- `[2] Ohook` — Office aktivasyonu
- `[3] TSforge` — Windows / Office / ESU (HWID çalışmazsa fallback)
- `[5]` Aktivasyon durumu kontrol
- `[6]` Windows sürümünü değiştir
- `[7]` Office sürümünü değiştir
- `[8]` Sorun giderme

## Mimari

```
PowerShell (irm | iex)
    ↓
winhack.kemalasliyuksek.com  (Cloudflare Worker)
    ↓ (User-Agent algılar)
    ├── PowerShell → wrapper PS döndürür
    │       ↓
    │   WinHack.cmd'yi GitHub raw'dan %TEMP%'e indir
    │       ↓
    │   Admin cmd penceresinde başlat
    │
    └── Tarayıcı → landing HTML
```

`WinHack.cmd` (~765 KB) doğrudan repo `main` branch'inden serve edilir; Worker sadece bir wrapper'dır, her güncellemede Worker'ı yeniden deploy etmeye gerek yoktur.

## Deploy (kendi domain'inde kullanmak istersen)

1. Bu repoyu fork et veya klonla.
2. `cloudflare-worker/worker.js` içindeki `CMD_SOURCE` ve domain referanslarını kendine göre güncelle.
3. Cloudflare dashboard → Workers & Pages → Create Worker → kodu yapıştır → Deploy.
4. Worker → Settings → Domains & Routes → Add → Custom Domain → kendi subdomain'in.

DNS otomatik kurulur, SSL ~2 dakikada hazır olur.

## Credit

Bu proje [Microsoft Activation Scripts (MAS)](https://github.com/massgravel/Microsoft-Activation-Scripts) projesinin GPL-3.0 lisansı altında yapılmış kişiselleştirilmiş bir türevidir. Tüm aktivasyon mantığı ve teknik altyapı [massgravel](https://github.com/massgravel) ekibine aittir. Bu repo yalnızca yerel branding ve dil özelleştirmelerini içerir.

## Lisans

GPL-3.0 — Detaylar için [LICENSE](LICENSE) dosyasına bak.

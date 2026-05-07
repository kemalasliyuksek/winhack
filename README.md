# WinHack

Kişisel kullanım için özelleştirilmiş Windows / Office aktivasyon scripti.

## Kullanım

PowerShell'i **Yönetici olarak** açıp şu komutu çalıştır:

```powershell
irm https://raw.githubusercontent.com/kemalasliyuksek/winhack/main/WinHack.cmd -OutFile "$env:TEMP\WinHack.cmd"; Start-Process cmd -ArgumentList "/c","$env:TEMP\WinHack.cmd" -Verb RunAs
```

Açılan menüden istediğin yöntemi seç.

## Credit

Bu proje [Microsoft Activation Scripts (MAS)](https://github.com/massgravel/Microsoft-Activation-Scripts) projesinin GPL-3.0 lisansı altında yapılmış kişiselleştirilmiş bir türevidir. Tüm aktivasyon mantığı ve teknik altyapı massgravel ekibine aittir. Bu repo yalnızca yerel branding ve dil özelleştirmelerini içerir.

## Lisans

GPL-3.0 — Detaylar için [LICENSE](LICENSE) dosyasına bak.

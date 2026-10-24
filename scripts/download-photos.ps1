# Telecharge les photos des annonces (listees dans scripts/airbnb-data.js) dans
# images/logements/<logement>/NN.<ext> et ecrit scripts/photos-local.json.
# Usage : clic droit sur le fichier > "Executer avec PowerShell"
#   ou, depuis la racine du depot :  powershell -ExecutionPolicy Bypass -File scripts\download-photos.ps1
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent $PSScriptRoot
$src  = [IO.File]::ReadAllText((Join-Path $PSScriptRoot 'airbnb-data.js'), [Text.Encoding]::UTF8)
$ids  = @('salles6', 'salles8', 'moustiers')
$blocks = [regex]::Matches($src, "photos: PH\('(\d+)', ``([^``]+)``\)")
if ($blocks.Count -ne 3) { Write-Host "Format inattendu dans airbnb-data.js ($($blocks.Count) blocs)"; exit 1 }

$map = [ordered]@{}
for ($b = 0; $b -lt 3; $b++) {
  $id    = $ids[$b]
  $room  = $blocks[$b].Groups[1].Value
  $files = $blocks[$b].Groups[2].Value.Trim() -split '\s+'
  $dir   = Join-Path $root "images\logements\$id"
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $list = @()
  for ($i = 0; $i -lt $files.Count; $i++) {
    $base = '{0:D2}' -f ($i + 1)
    $existing = Get-ChildItem -Path $dir -Filter "$base.*" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($existing) { $list += "/images/logements/$id/$($existing.Name)"; continue }
    $url = "https://a0.muscache.com/im/pictures/hosting/Hosting-$room/original/$($files[$i])?im_w=1440"
    $ok = $false
    for ($t = 0; $t -lt 3 -and -not $ok; $t++) {
      try {
        $tmp = Join-Path $dir "$base.tmp"
        $r = Invoke-WebRequest -Uri $url -OutFile $tmp -UseBasicParsing -PassThru
        $ct = [string]$r.Headers['Content-Type']
        $ext = 'jpg'; if ($ct -match 'png') { $ext = 'png' } elseif ($ct -match 'webp') { $ext = 'webp' }
        Move-Item -Force $tmp (Join-Path $dir "$base.$ext")
        $list += "/images/logements/$id/$base.$ext"
        $ok = $true
      } catch { if ($t -eq 2) { Write-Host "ECHEC $id $($i+1) : $($_.Exception.Message)" } }
    }
    if (-not $ok) { $list += "https://a0.muscache.com/im/pictures/hosting/Hosting-$room/original/$($files[$i])" }
    Write-Host -NoNewline "`r$id $($i + 1)/$($files.Count)   "
  }
  Write-Host ''
  $map[$id] = $list
}
$json = $map | ConvertTo-Json -Depth 4
[IO.File]::WriteAllText((Join-Path $PSScriptRoot 'photos-local.json'), $json, (New-Object Text.UTF8Encoding($false)))
Write-Host 'OK : scripts\photos-local.json ecrit. Prevenez Claude : il regenere les pages.'

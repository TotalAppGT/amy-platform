$j = Get-Content shots/audit2.json -Raw | ConvertFrom-Json
$bad = $j | Where-Object { $_.status -ne 200 -or $_.overflow -ne 0 -or $_.errors.Count -gt 0 -or $_.noName -gt 0 -or $_.missingAlt -gt 0 -or $_.duplicateIds.Count -gt 0 }
$bad | Select-Object viewport,route,status,overflow,noName,missingAlt,errors | Format-Table -AutoSize
Write-Output "TOTAL=$($j.Count) BAD=$($bad.Count)"

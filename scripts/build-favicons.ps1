# Technical derivatives of the existing official artwork. No generated/redrawn shapes.
Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition @'
using System;
using System.Drawing;
public static class GtiSymbol {
    public static Bitmap Extract(string filename) {
        using (var source = new Bitmap(filename)) {
            // The speech symbol sits above the GTI lettering in the official JPEG.
            int left = source.Width, top = source.Height, right = 0, bottom = 0;
            for (int y = 1200; y < 2080; y++) {
                for (int x = 2400; x < 3450; x++) {
                    var pixel = source.GetPixel(x, y);
                    int max = Math.Max(pixel.R, Math.Max(pixel.G, pixel.B));
                    int min = Math.Min(pixel.R, Math.Min(pixel.G, pixel.B));
                    if (max - min > 80 && max > 100) {
                        left = Math.Min(left, x); top = Math.Min(top, y);
                        right = Math.Max(right, x); bottom = Math.Max(bottom, y);
                    }
                }
            }
            if (right <= left || bottom <= top) throw new Exception("Official symbol not found");
            var symbol = new Bitmap(right-left+1, bottom-top+1, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
            var background = source.GetPixel(100,100);
            for (int y=0; y<symbol.Height; y++) {
                for (int x=0; x<symbol.Width; x++) {
                    var color=source.GetPixel(left+x,top+y);
                    // Exclude the white GTI lettering that touches the crop's lower edge.
                    int maximum=Math.Max(color.R,Math.Max(color.G,color.B));
                    int minimum=Math.Min(color.R,Math.Min(color.G,color.B));
                    if (maximum-minimum < 65) { symbol.SetPixel(x,y,Color.Transparent); continue; }
                    double distance=Math.Sqrt(Math.Pow(color.R-background.R,2)+Math.Pow(color.G-background.G,2)+Math.Pow(color.B-background.B,2));
                    // Remove only the original uniform navy matte and its JPEG edge pixels.
                    double alpha=Math.Max(0,Math.Min(1,(distance-15)/95));
                    if (alpha <= 0) { symbol.SetPixel(x,y,Color.Transparent); continue; }
                    int r=(int)Math.Max(0,Math.Min(255,(color.R-background.R*(1-alpha))/alpha));
                    int g=(int)Math.Max(0,Math.Min(255,(color.G-background.G*(1-alpha))/alpha));
                    int b=(int)Math.Max(0,Math.Min(255,(color.B-background.B*(1-alpha))/alpha));
                    symbol.SetPixel(x,y,Color.FromArgb((int)Math.Round(alpha*255),r,g,b));
                }
            }
            return symbol;
        }
    }
}
'@ -ReferencedAssemblies System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$symbol = [GtiSymbol]::Extract((Join-Path $projectRoot 'src/assets/Logo_GTI-04.jpg'))
try {
    foreach ($size in @(16, 32, 48, 180)) {
        $canvas = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $graphics = [System.Drawing.Graphics]::FromImage($canvas)
        try {
            $graphics.Clear([System.Drawing.Color]::Transparent)
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $padding = [Math]::Max(1, [Math]::Round($size * 0.06))
            $scale = ($size - 2 * $padding) / [double][Math]::Max($symbol.Width, $symbol.Height)
            $width = [int][Math]::Round($symbol.Width * $scale)
            $height = [int][Math]::Round($symbol.Height * $scale)
            $bounds = New-Object System.Drawing.Rectangle([int][Math]::Floor(($size-$width)/2), [int][Math]::Floor(($size-$height)/2), $width, $height)
            $graphics.DrawImage($symbol, $bounds)
            $name = switch ($size) { 48 {'favicon-gti.png'} 180 {'apple-touch-icon-gti.png'} default {"favicon-gti-$size.png"} }
            $canvas.Save((Join-Path $projectRoot "public/$name"), [System.Drawing.Imaging.ImageFormat]::Png)
            Write-Output "$name ${size}x${size}"
        } finally { $graphics.Dispose(); $canvas.Dispose() }
    }
} finally { $symbol.Dispose() }

# Retain the conventional fallback path for browsers requesting /favicon.png.
Copy-Item -LiteralPath (Join-Path $projectRoot 'public/favicon-gti.png') -Destination (Join-Path $projectRoot 'public/favicon.png')

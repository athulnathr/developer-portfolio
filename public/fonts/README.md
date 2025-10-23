# 3D Font Files

This directory should contain 3D font files for React Three Fiber's Text3D component.

## Required File

- `inter_bold.json` - 3D font file for the 'I' logo

## How to Generate

1. Visit [facetype.js](https://gero3.github.io/facetype.js/)
2. Upload the Inter Bold font file (or any font you prefer)
3. Download the generated JSON file
4. Rename it to `inter_bold.json` and place it here

## Alternative: Use Fallback

The HeroCanvas component automatically falls back to a CSS-based 'I' logo if:
- The font file is missing
- WebGL is not supported
- Reduced motion is enabled

You can use the fallback version by default if you prefer not to use WebGL.


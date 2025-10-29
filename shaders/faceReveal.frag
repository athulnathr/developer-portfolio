uniform sampler2D robotTexture;
uniform sampler2D humanTexture;
uniform vec2 cursorUV;
uniform float revealRadius;
uniform float time;
uniform vec2 trailPositions[20];
uniform int trailCount;

varying vec2 vUv;

void main() {
  vec4 robotColor = texture2D(robotTexture, vUv);
  vec4 humanColor = texture2D(humanTexture, vUv);
  
  float reveal = 0.0;
  
  // Check current cursor position
  float distToCursor = distance(vUv, cursorUV);
  if (distToCursor < revealRadius) {
    float edge = smoothstep(revealRadius, revealRadius * 0.7, distToCursor);
    reveal = max(reveal, edge);
  }
  
  // Check trail positions with fade
  for (int i = 0; i < 20; i++) {
    if (i >= trailCount) break;
    
    float distToTrail = distance(vUv, trailPositions[i]);
    float trailFade = 1.0 - (float(i) / float(trailCount));
    
    if (distToTrail < revealRadius * trailFade) {
      float edge = smoothstep(revealRadius * trailFade, revealRadius * trailFade * 0.7, distToTrail);
      reveal = max(reveal, edge * trailFade);
    }
  }
  
  // Add glow effect at edges
  float glow = reveal * (0.5 + 0.5 * sin(time * 3.0));
  vec4 glowColor = vec4(0.0, 0.8, 1.0, 1.0);
  
  // Mix robot and human textures
  vec4 finalColor = mix(robotColor, humanColor, reveal);
  finalColor += glowColor * glow * 0.2 * (1.0 - reveal);
  
  gl_FragColor = finalColor;
}


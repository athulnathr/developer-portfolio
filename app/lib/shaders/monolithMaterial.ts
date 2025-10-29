/**
 * Monolith Material Shader
 * Metallic, tech-inspired material with fracture effects
 */

export const monolithVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const monolithFragmentShader = `
  uniform float uTime;
  uniform float uCrackProgress;
  uniform vec3 uBaseColor;
  uniform vec3 uGlowColor;
  uniform float uMetallic;
  uniform float uRoughness;
  uniform vec3 uLightPosition;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  // Fracture noise
  float noise(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
  }
  
  // Voronoi-like cracks
  float cracksPattern(vec3 pos, float progress) {
    vec3 p = pos * 3.0;
    float n = noise(floor(p));
    float cracks = 0.0;
    
    // Multiple crack lines
    for(int i = 0; i < 4; i++) {
      float offset = float(i) * 2.5;
      vec3 offsetPos = p + vec3(offset, offset * 0.5, offset * 1.5);
      float crack = abs(sin(offsetPos.x * 2.0) * cos(offsetPos.y * 3.0) * sin(offsetPos.z));
      crack = smoothstep(0.9, 1.0, crack);
      cracks += crack * progress;
    }
    
    return cracks;
  }
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(uLightPosition - vPosition);
    
    // Lighting calculations
    float diff = max(dot(normal, lightDir), 0.0);
    float ambient = 0.3;
    
    // Fresnel effect
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
    
    // Base color
    vec3 color = uBaseColor;
    
    // Add metallic sheen
    color += fresnel * vec3(0.2, 0.3, 0.5) * uMetallic;
    
    // Crack effects
    float cracks = cracksPattern(vPosition, uCrackProgress);
    vec3 crackGlow = uGlowColor * cracks * (sin(uTime * 3.0) * 0.5 + 0.5);
    color += crackGlow;
    
    // Apply lighting
    vec3 finalColor = color * (ambient + diff * 0.7);
    
    // Add edge glow
    finalColor += fresnel * uGlowColor * 0.2;
    
    // Tech grid overlay
    float grid = step(0.98, fract(vUv.y * 50.0));
    finalColor += vec3(0.1, 0.2, 0.3) * grid * 0.3;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;


/**
 * Tech Floor Shader
 * Creates an animated grid with circuit patterns, neon glow, and reactive effects
 */

export const techFloorVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const techFloorFragmentShader = `
  uniform float uTime;
  uniform vec3 uMousePosition;
  uniform vec3 uShadowPosition;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  // Random function for procedural patterns
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Grid pattern
  float grid(vec2 uv, float scale) {
    vec2 grid = fract(uv * scale);
    float lineWidth = 0.02;
    float line = step(1.0 - lineWidth, grid.x) + step(1.0 - lineWidth, grid.y);
    return line;
  }
  
  // Circuit pattern
  float circuit(vec2 uv, float time) {
    vec2 st = uv * 10.0;
    float pattern = 0.0;
    
    // Horizontal lines
    float hLines = step(0.95, fract(st.y + time * 0.1));
    // Vertical lines
    float vLines = step(0.95, fract(st.x - time * 0.15));
    // Nodes
    float nodes = step(0.98, random(floor(st) + time * 0.05));
    
    pattern = max(hLines, max(vLines, nodes));
    return pattern;
  }
  
  // Ripple effect from mouse
  float ripple(vec2 center, vec2 position, float time) {
    float dist = distance(center, position);
    float wave = sin(dist * 10.0 - time * 3.0) * 0.5 + 0.5;
    float falloff = 1.0 - smoothstep(0.0, 2.0, dist);
    return wave * falloff;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Main grid
    float mainGrid = grid(uv, 20.0);
    float subGrid = grid(uv, 100.0) * 0.3;
    
    // Circuit patterns
    float circuits = circuit(uv, uTime);
    
    // Pulsing animation
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    
    // Mouse ripple
    vec2 mousePos2D = vec2(uMousePosition.x, uMousePosition.z) * 0.1 + 0.5;
    float mouseRipple = ripple(mousePos2D, uv, uTime);
    
    // Shadow influence
    vec2 shadowPos2D = vec2(uShadowPosition.x, uShadowPosition.z) * 0.1 + 0.5;
    float shadowDist = distance(shadowPos2D, uv);
    float shadowInfluence = 1.0 - smoothstep(0.0, 0.5, shadowDist);
    
    // Combine patterns
    float pattern = mainGrid + subGrid + circuits * pulse * 0.5;
    pattern += mouseRipple * 0.3;
    
    // Color mixing
    vec3 color = mix(uColor1, uColor2, pattern);
    color += mouseRipple * vec3(0.2, 0.5, 1.0);
    color *= (1.0 - shadowInfluence * 0.3); // Darken under shadow
    
    // Base darkness with grid glow
    vec3 finalColor = vec3(0.02, 0.02, 0.05) + color * uIntensity;
    
    // Add energy flow
    float flow = sin(uv.x * 20.0 - uTime) * sin(uv.y * 20.0 + uTime * 0.5);
    finalColor += vec3(0.1, 0.2, 0.4) * flow * 0.1;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;


# LightRays Component

A React component that creates beautiful, interactive light ray effects using WebGL. Perfect for adding atmospheric backgrounds to your applications.

## Features

- **WebGL-powered**: High-performance rendering using OGL library
- **Interactive**: Mouse-following effects with customizable influence
- **Customizable**: Multiple configuration options for different visual effects
- **Responsive**: Automatically adapts to container size changes
- **Performance optimized**: Uses intersection observer for visibility-based rendering
- **TypeScript support**: Fully typed with TypeScript interfaces

## Installation

The component requires the `ogl` library for WebGL rendering:

```bash
npm install ogl
# or
pnpm add ogl
```

## Basic Usage

```tsx
import { LightRays } from '@/components/background';

function MyComponent() {
  return (
    <div className="relative min-h-screen">
      <LightRays 
        raysOrigin="top-center"
        raysColor="#4f46e5"
        raysSpeed={1.5}
        pulsating={true}
      />
      
      {/* Your content here */}
      <div className="relative z-10">
        <h1>Your Content</h1>
      </div>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `raysOrigin` | `string` | `"top-center"` | Origin point for light rays. Options: `"top-left"`, `"top-center"`, `"top-right"`, `"left"`, `"right"`, `"bottom-left"`, `"bottom-center"`, `"bottom-right"` |
| `raysColor` | `string` | `"#ffffff"` | Color of the light rays (hex format) |
| `raysSpeed` | `number` | `1` | Animation speed multiplier |
| `lightSpread` | `number` | `1` | How focused or spread out the rays are |
| `rayLength` | `number` | `2` | Length of the rays relative to screen width |
| `pulsating` | `boolean` | `false` | Whether the rays should pulse/breath |
| `fadeDistance` | `number` | `1.0` | How quickly the rays fade with distance |
| `saturation` | `number` | `1.0` | Color saturation (0.0 = grayscale, 1.0 = full color) |
| `followMouse` | `boolean` | `true` | Whether rays should follow mouse movement |
| `mouseInfluence` | `number` | `0.1` | How much mouse movement affects ray direction (0.0 to 1.0) |
| `noiseAmount` | `number` | `0.0` | Amount of noise/static effect (0.0 to 1.0) |
| `distortion` | `number` | `0.0` | Amount of wave distortion in the rays |
| `className` | `string` | `""` | Additional CSS classes for the container |

## Examples

### Simple Background
```tsx
<LightRays 
  raysOrigin="top-center"
  raysColor="#4f46e5"
  raysSpeed={1.2}
/>
```

### Interactive Rays
```tsx
<LightRays 
  raysOrigin="top-left"
  raysColor="#ec4899"
  raysSpeed={1.5}
  pulsating={true}
  followMouse={true}
  mouseInfluence={0.2}
  noiseAmount={0.1}
  distortion={0.05}
/>
```

### Multiple Light Sources
```tsx
<div className="relative min-h-screen">
  {/* Primary light from top */}
  <LightRays 
    raysOrigin="top-center"
    raysColor="#4f46e5"
    raysSpeed={1.5}
    lightSpread={1.2}
    rayLength={2.5}
    pulsating={true}
  />
  
  {/* Accent light from left */}
  <LightRays 
    raysOrigin="left"
    raysColor="#ec4899"
    raysSpeed={0.8}
    lightSpread={0.8}
    rayLength={1.8}
    followMouse={false}
  />
  
  {/* Content */}
  <div className="relative z-10">
    Your content here
  </div>
</div>
```

## Styling

The component includes basic CSS that you can override:

```css
.light-rays-container {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: none;
  z-index: 3;
  overflow: hidden;
}
```

## Performance Considerations

- The component automatically stops rendering when not visible using Intersection Observer
- WebGL context is properly cleaned up on unmount
- Mouse events are only added when `followMouse` is true
- Consider using multiple instances sparingly on mobile devices

## Browser Support

- Modern browsers with WebGL support
- Chrome 51+, Firefox 51+, Safari 10+, Edge 79+
- Mobile browsers with WebGL support

## Demo

Visit `/lightrays-demo` to see the component in action with multiple configurations.

## Troubleshooting

- **No rays visible**: Check that the container has dimensions and the component is mounted
- **Performance issues**: Reduce `noiseAmount` and `distortion` values
- **WebGL errors**: Ensure the browser supports WebGL and the `ogl` library is installed

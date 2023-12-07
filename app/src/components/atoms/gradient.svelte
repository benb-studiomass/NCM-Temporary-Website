<script>
    import { onMount, afterUpdate } from 'svelte';
  
    let canvas;
    let ctx;
  
    const canvasWidth = 1920;
    const canvasHeight = 1080;
  
    let minSize = 4;
    let maxSize = 8;
    let sizeTransitionSpeed = 0.001;
    let movementSpeed = 0.1;
  
    const colors = [
      0x007EDF,
    //   0x80CFE5,
    //   0xCF8AFA,
      0xFF8F45,
      0xE7D64B,
    ];
  
    onMount(async () => {
      const THREE = await import('three');
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  
      renderer.setSize(canvasWidth, canvasHeight);
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvasWidth / canvasHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
  
      // Create a background plane
      const backgroundGeometry = new THREE.PlaneGeometry(100, 10);
      const backgroundMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)]), // Random background color
      });
      const backgroundPlane = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
      scene.add(backgroundPlane);
  
      const particles = [];
      const particleCount = 8;
  
      const particleGeometry = new THREE.CircleGeometry(1, 100);
  
      for (let i = 0; i < particleCount; i++) {
  // Pick a random color for the first color stop
  const canvas = document.createElement('canvas');
canvas.width = 64;
canvas.height = 64;
const context = canvas.getContext('2d');

// Get a random color from the array
const randomColor = colors[Math.floor(Math.random() * colors.length)];

const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
gradient.addColorStop(0, `rgba(${(randomColor >> 16) & 255}, ${(randomColor >> 8) & 255}, ${randomColor & 255}, 1)`);
gradient.addColorStop(1, `rgba(${(randomColor >> 16) & 255}, ${(randomColor >> 8) & 255}, ${randomColor & 255}, 0)`);
context.fillStyle = gradient;
context.arc(32, 32, 32, 0, Math.PI * 2);
context.fill();

const particleTexture = new THREE.Texture(canvas);
particleTexture.needsUpdate = true;


  const particleMaterial = new THREE.MeshBasicMaterial({
    map: particleTexture,
    transparent: true,
  });
  
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.set(
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          0 // Set Z position to 0 to eliminate forward and backward movement
        );
        particle.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * movementSpeed,
          (Math.random() - 0.5) * movementSpeed,
          0 // Set Z velocity to 0 to eliminate forward and backward movement
        );
  
        particle.scale.setScalar(
          minSize + Math.random() * (maxSize - minSize)
        );
  
        particles.push(particle);
        scene.add(particle);
      }
  
      const animate = () => {
        requestAnimationFrame(animate);
  
        for (const particle of particles) {
          particle.position.add(particle.velocity);
  
          if (
            particle.position.x < -5 ||
            particle.position.x > 5 ||
            particle.position.y < -5 ||
            particle.position.y > 5
          ) {
            particle.velocity.multiplyScalar(-1);
          }
  
          const targetSize = minSize + Math.random() * (maxSize - minSize);
          particle.scale.lerp(new THREE.Vector3(targetSize, targetSize, targetSize), sizeTransitionSpeed);
        }
  
        renderer.render(scene, camera);
      };
  
      animate();
  
      window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
  
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
  
        // Resize the canvas
        renderer.setSize(newWidth, newHeight);
      });
  
      ctx = canvas.getContext('2d');
    });
  
    afterUpdate(() => {
      sizeTransitionSpeed = 0.001;
    });
  </script>
  
  <canvas bind:this={canvas}></canvas>
  
  <style>
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>
  
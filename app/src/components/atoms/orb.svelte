<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

	let canvas;
	let audioContext;
	let volume = 0; // Variable to store microphone volume
	export let enabled;

	// Function to request microphone access
	async function getMicrophoneAccess() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
			audioContext = new AudioContext();
			const source = audioContext.createMediaStreamSource(stream);
			const analyser = audioContext.createAnalyser();
			source.connect(analyser);
			analyser.fftSize = 2048;

			const bufferLength = analyser.frequencyBinCount;
			const dataArray = new Uint8Array(bufferLength);

			const getVolume = () => {
				analyser.getByteFrequencyData(dataArray);
				let sum = 0;
				for (let i = 0; i < bufferLength; i++) {
					sum += dataArray[i];
				}
				volume = sum;
				requestAnimationFrame(getVolume);
			};

			enabled = true;
			getVolume();
		} catch (error) {
			console.error('Error accessing microphone', error);
		}
	}

	onMount(async () => {
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			0.02,
			1000
		);
		camera.position.z = 2;

		let resolution = window.innerWidth > 767 ? 132 : 52;
		const geometry = new THREE.SphereGeometry(1, resolution, resolution);

		const noise = `
		float noise(vec3 point, float time) {
		  return sin(point.x * 12.0 + time) + cos(point.y * 12.0 + time) + sin(point.z * 12.0 + time);
		}
	  `;

		const vertexShader = `
		varying vec2 vUv;
		varying vec3 vNormal;
		uniform float time;
		uniform float volume; // New uniform for volume
  
		${noise}
  
		void main() {
		  vUv = uv;
		  float bumpHeight = 0.125 + (volume * 0.00025) ; // Modifying bumpHeight based on volume
		  float rippleEffect = sin(4.0 * position.y + time) * 0.04 + volume * 0.000005; // Ripple effect
		  vec3 bumpedPosition = position + normal * (noise(position, time) * bumpHeight + rippleEffect);
		  vNormal = normal;
		  gl_Position = projectionMatrix * modelViewMatrix * vec4(bumpedPosition, 1.0);
		}
	  `;

		const fragmentShader = `
		uniform float time;
		varying vec2 vUv;
		varying vec3 vNormal;
  
		void main() {
    vec3 lightDirection = normalize(vec3(1, 1, 1)); // Directional light
    float lightStrength = max(dot(vNormal, lightDirection), 0.25);

    vec3 baseColor = vec3(0.5 + 0.5 * cos(time + vUv.x), 0.5 + 0.5 * sin(time + vUv.y), 0.5 - 0.5 * cos(time));
    
    // Enhanced metallic and reflective properties
    vec3 metallicColor = mix(vec3(1.0, 1.0, 1.0), baseColor, lightStrength * 0.8); // Increase reflectivity
    float glossiness = 0.75; // Increase glossiness

    gl_FragColor = vec4(metallicColor * glossiness, 1.0);
}
	  `;

		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				time: { value: 0 },
				volume: { value: 0 } // New uniform for volume
			}
		});

		const sphere = new THREE.Mesh(geometry, material);
		scene.add(sphere);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		const ambientLight = new THREE.AmbientLight(0xffffff, 5);
		scene.add(ambientLight);

		// Post-processing setup
		const composer = new EffectComposer(renderer);
		composer.addPass(new RenderPass(scene, camera));

		const animate = (time) => {
			requestAnimationFrame(animate);

			material.uniforms.time.value = time * 0.001;
			material.uniforms.volume.value = volume; // Update volume uniform

			sphere.rotation.x += 0.0005;
			sphere.rotation.y += 0.0005;

			composer.render();
		};

		animate();

		window.addEventListener('resize', () => {
			const newWidth = window.innerWidth;
			const newHeight = window.innerHeight;

			camera.aspect = newWidth / newHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(newWidth, newHeight);
			composer.setSize(newWidth, newHeight);
		});

		// Add click event listener to canvas for microphone access
		canvas.addEventListener('click', () => {
			if (!audioContext) {
				getMicrophoneAccess();
			}
		});
	});
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: white;
	}
</style>

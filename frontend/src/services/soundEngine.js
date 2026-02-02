/**
 * Sacred Sound Engine
 * Generates mystical, dynamic sounds using Web Audio API to avoid heavy assets.
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        this.ctx = new AudioContext();
        this.isInitialized = true;
    }

    /**
     * Creates a mystical "shimmer" effect (harmonic sparkle)
     */
    playShimmer() {
        if (!this.isInitialized) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const now = this.ctx.currentTime;
        const duration = 2.5;

        // Harmonic series for a "celestial" sound
        const frequencies = [440, 659.25, 880, 1046.5, 1318.5];

        frequencies.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.01, now + duration); // Sutil detune

            // Filter for organic warmth
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2000, now);
            filter.frequency.linearRampToValueAtTime(500, now + duration);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.04 / frequencies.length, now + 0.2 + (i * 0.05));
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        });
    }

    /**
     * Mystical pulse/drone
     */
    playPulse() {
        if (!this.isInitialized) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const now = this.ctx.currentTime;
        const duration = 2.0;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, now); // Low A

        // Deep Filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, now);
        filter.Q.value = 1;

        // Gentle envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
    }

    /**
     * Deep trance drone
     */
    playTrance() {
        if (!this.isInitialized) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const now = this.ctx.currentTime;
        const duration = 15.0; // Long duration for prophecy generation

        // Base drone
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, now); // Low Low A

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(55.5, now); // Slightly detuned for beating

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, now);
        filter.frequency.exponentialRampToValueAtTime(400, now + duration / 2);
        filter.frequency.exponentialRampToValueAtTime(100, now + duration);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 2);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);
    }

    /**
     * Final sparkle chime
     */
    playSparkle() {
        if (!this.isInitialized) this.init();
        const now = this.ctx.currentTime;
        const duration = 1.5;

        const frequencies = [880, 1318.5, 1760, 2093];
        frequencies.forEach((f, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.frequency.setValueAtTime(f, now + (i * 0.1));
            gain.gain.setValueAtTime(0, now + (i * 0.1));
            gain.gain.linearRampToValueAtTime(0.02, now + (i * 0.1) + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.1) + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + (i * 0.1));
            osc.stop(now + (i * 0.1) + duration);
        });
    }
}

const sacredSound = new SoundEngine();
export default sacredSound;

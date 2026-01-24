
import React from 'react';
import { Box } from '@mui/material';
import './Infographic.css';

const COLORS_HEX = {
    Rojo: "#ff5252",
    Roja: "#ff5252",
    Blanco: "#ffffff",
    Blanca: "#ffffff",
    Azul: "#448aff",
    Amarillo: "#ffd740",
    Amarilla: "#ffd740"
};

const extractConsejo = (longDesc) => {
    if (!longDesc) return "Conecta con tu corazón.";
    const sentences = longDesc.split('.').map(s => s.trim()).filter(s => s.length > 5);
    // Take the last meaningful sentence or the one before if the last is too short
    const last = sentences[sentences.length - 1];
    if (last && last.length < 15 && sentences.length > 1) {
        return sentences[sentences.length - 2] + ".";
    }
    return last ? (last.endsWith('.') ? last : last + ".") : "Sigue tu intuición.";
};

const Infographic = ({ kinData, isFullScreen, isCard, onClose }) => {
    if (!kinData) return null;

    const { kin_number, kin } = kinData;
    const toneNumber = ((kin_number - 1) % 13) + 1;
    const themeColor = COLORS_HEX[kin.color] || "#ffffff";
    const themeGlow = `${themeColor}99`; // roughly 60% opacity hex

    // Advice - safe access
    const idealList = kin.advice?.ideal || ["Conectar", "Fluir", "Amar"];
    const avoidList = kin.advice?.avoid || ["Miedo", "Estancamiento", "Duda"];

    // Images
    const sealIconUrl = `assets/glyphs/seals/${kin.slug}.png`;
    const toneIconUrl = `assets/glyphs/tones/${toneNumber}.png`;
    const artBase64 = `assets/art_seals/${kin.slug}.png`; // Using filesystem paths served by public

    // Oracle Icons
    const oracle = kin.oracle || {};
    const guide = oracle.guide || { name: '?', slug: 'dragon' };
    const antipode = oracle.antipode || { name: '?', slug: 'dragon' };
    const analog = oracle.analog || { name: '?', slug: 'dragon' };
    const occult = oracle.occult || { name: '?', slug: 'dragon' };


    const cssVariables = {
        '--theme-color': themeColor,
        '--theme-glow': themeGlow
    };

    return (
        <div className={`infographic-wrapper ${isFullScreen ? 'is-full-screen' : ''} ${isCard ? 'is-card' : ''}`} style={cssVariables}>
            <div
                className="infographic-bg-image"
                style={{ backgroundImage: `url('${artBase64}')` }}
            ></div>
            <div className="infographic-vignette"></div>


            {isFullScreen && onClose && (
                <button
                    className="infographic-close-btn"
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                >
                    ✕ VOLVER
                </button>
            )}

            <div className="infographic-container">

                {/* HEADER */}
                <header className="infographic-header">
                    <div className="infographic-kin-meta">KIN {kin_number}</div>
                    <h1 className="infographic-kin-title">{kin.seal_name} {kin.tone_name} {kin.color}</h1>
                </header>

                {/* MAIN CONTENT */}
                <div className="infographic-main-content">

                    {/* LEFT: TECH */}
                    <div className="infographic-tech-col">
                        <div className="infographic-tech-item">
                            <div className="infographic-tech-icon-container">
                                <img src={sealIconUrl} alt="Seal" className="infographic-tech-icon" />
                            </div>
                            <div className="infographic-tech-label">{kin.seal_name}</div>
                            <div className="infographic-tech-desc">{kin.seal_desc}</div>
                        </div>

                        <div className="infographic-tech-separator"></div>

                        <div className="infographic-tech-item">
                            <div className="infographic-tech-icon-container">
                                <img src={toneIconUrl} alt="Tone" className="infographic-tech-icon" />
                            </div>
                            <div className="infographic-tech-label">{kin.tone_name}</div>
                            <div className="infographic-tech-desc">{kin.tone_desc}</div>
                        </div>
                    </div>

                    {/* CENTER: ART */}
                    <div className="infographic-center-col">
                        <div className="infographic-art-display">
                            <img src={artBase64} alt="Art" className="infographic-art-img" />
                        </div>
                        <div className="infographic-main-quote-box">
                            <div className="infographic-wisdom-quote">"{kin.short_description}"</div>
                        </div>
                    </div>

                    {/* RIGHT: ORACLE */}
                    <div className="infographic-oracle-col">

                        {/* Guide */}
                        <div className="infographic-oracle-item">
                            <div className="infographic-oracle-role">Guía</div>
                            <div className="infographic-oracle-desc-role">Tu norte</div>
                            <img src={`assets/glyphs/seals/${guide.slug}.png`} alt="Guide" className="infographic-oracle-icon-sm" />
                            <div className="infographic-oracle-name">{guide.name}</div>
                        </div>

                        {/* Antipode */}
                        <div className="infographic-oracle-item">
                            <div className="infographic-oracle-role">Antípoda</div>
                            <div className="infographic-oracle-desc-role">Desafío</div>
                            <img src={`assets/glyphs/seals/${antipode.slug}.png`} alt="Antipode" className="infographic-oracle-icon-sm" />
                            <div className="infographic-oracle-name">{antipode.name}</div>
                        </div>

                        {/* Destiny (Center) */}
                        <div className="infographic-oracle-item active-destiny">
                            <div className="infographic-oracle-role">Destino</div>
                            <img src={sealIconUrl} alt="Destiny" className="infographic-oracle-icon-sm" />
                        </div>

                        {/* Analog */}
                        <div className="infographic-oracle-item">
                            <div className="infographic-oracle-role">Análogo</div>
                            <div className="infographic-oracle-desc-role">Apoyo</div>
                            <img src={`assets/glyphs/seals/${analog.slug}.png`} alt="Analog" className="infographic-oracle-icon-sm" />
                            <div className="infographic-oracle-name">{analog.name}</div>
                        </div>

                        {/* Occult */}
                        <div className="infographic-oracle-item">
                            <div className="infographic-oracle-role">Oculto</div>
                            <div className="infographic-oracle-desc-role">Poder</div>
                            <img src={`assets/glyphs/seals/${occult.slug}.png`} alt="Occult" className="infographic-oracle-icon-sm" />
                            <div className="infographic-oracle-name">{occult.name}</div>
                        </div>

                    </div>
                </div>

                {/* FOOTER */}
                <div className="infographic-footer-grid">
                    <div className="infographic-footer-col footer-ideal">
                        <div className="infographic-col-title title-good">✅ Ideal Para</div>
                        <ul className="infographic-points-list">
                            {idealList.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                    <div className="infographic-footer-col footer-avoid">
                        <div className="infographic-col-title title-bad">🛑 Evitar</div>
                        <ul className="infographic-points-list">
                            {avoidList.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                    <div className="infographic-footer-col footer-advice">
                        <div className="infographic-col-title title-main">🔮 Consejo</div>
                        <div className="infographic-col-text-main">
                            {extractConsejo(kin.long_description)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Infographic;

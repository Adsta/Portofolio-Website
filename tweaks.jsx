const TWEAK_DEFAULTS = {
  "theme": "Slate",
  "accentColor": "#b94521"
};

const THEMES = {
  Cream:    { paper: '#ede5d3', paper2: '#f4ecd9', ink: '#1a1815', ink2: '#4a4640', ink3: '#8a8678', rule: '#c9bfa6' },
  Slate:    { paper: '#1a1a1d', paper2: '#22222a', ink: '#f3eee0', ink2: '#a8a395', ink3: '#6b6658', rule: '#34343c' },
  Bone:     { paper: '#f4f1ea', paper2: '#fbf8f1', ink: '#1d1c1a', ink2: '#55524b', ink3: '#9a978c', rule: '#dad5c6' },
};

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const theme = THEMES[t.theme] || THEMES.Cream;
    const r = document.documentElement.style;
    r.setProperty('--paper',    theme.paper);
    r.setProperty('--paper-2',  theme.paper2);
    r.setProperty('--ink',      theme.ink);
    r.setProperty('--ink-2',    theme.ink2);
    r.setProperty('--ink-3',    theme.ink3);
    r.setProperty('--rule',     theme.rule);
  }, [t.theme]);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accentColor);
  }, [t.accentColor]);

  return (
    <TweaksPanel>
      <TweakSection title="Theme">
        <TweakRadio label="Paper" value={t.theme} options={['Cream', 'Bone', 'Slate']}
          onChange={v => setTweak('theme', v)} />
      </TweakSection>
      <TweakSection title="Accent">
        <TweakColor label="Color" value={t.accentColor}
          options={['#b94521', '#1e5fa8', '#3a6b3a', '#7a4ba5', '#c98a14']}
          onChange={v => setTweak('accentColor', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<TweaksApp />);
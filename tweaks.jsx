const TWEAK_DEFAULTS = {
  "theme": "System"
};

/* Drives the same data-theme attribute as the navbar switch, so both stay in sync. */
function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    if (t.theme === 'System') delete root.dataset.theme;
    else root.dataset.theme = t.theme.toLowerCase();
    document.getElementById('themeSwitch')?.setAttribute('aria-checked',
      String(root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches));
  }, [t.theme]);

  return (
    <TweaksPanel>
      <TweakSection title="Theme">
        <TweakRadio label="Mode" value={t.theme} options={['System', 'Light', 'Dark']}
          onChange={v => setTweak('theme', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

if (typeof useTweaks !== 'undefined' && typeof TweaksPanel !== 'undefined') {
  const tweaksRoot = document.createElement('div');
  document.body.appendChild(tweaksRoot);
  ReactDOM.createRoot(tweaksRoot).render(<TweaksApp />);
}

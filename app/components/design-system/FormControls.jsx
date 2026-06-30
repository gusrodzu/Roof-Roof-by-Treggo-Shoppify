import {useState} from 'react';

/* ── Input de texto ── */
export function TextInput({label, error, icon, type = 'text', style: styleOverride = {}, ...rest}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.375rem'}}>
      {label && (
        <label style={{fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)'}}>
          {label}
        </label>
      )}
      <div style={{position: 'relative'}}>
        {icon && (
          <span style={{position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)', display: 'flex'}}>
            {icon}
          </span>
        )}
        <input
          type={type}
          onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
          style={{
            width: '100%',
            padding: icon ? '0.75rem 1rem 0.75rem 2.5rem' : '0.75rem 1rem',
            borderRadius: '0.75rem',
            border: `1.5px solid ${error ? 'var(--danger)' : (focused ? 'var(--brand-cta)' : 'var(--border)')}`,
            fontSize: '0.9375rem', color: 'var(--ink)',
            outline: 'none', fontFamily: 'inherit',
            background: '#fff', boxSizing: 'border-box',
            transition: 'border-color 0.15s',
            ...styleOverride,
          }}
          {...rest}
        />
      </div>
      {error && (
        <span style={{fontSize: '0.8125rem', color: 'var(--danger)', fontWeight: 500}}>
          {error}
        </span>
      )}
    </div>
  );
}

/* ── Checkbox ── */
export function Checkbox({label, checked, onChange, ...rest}) {
  return (
    <label style={{display: 'inline-flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer'}}>
      <span style={{
        width: '22px', height: '22px', borderRadius: '0.375rem',
        border: `2px solid ${checked ? 'var(--brand-cta)' : 'var(--border)'}`,
        background: checked ? 'var(--brand-cta)' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'all 0.15s',
      }}>
        {checked && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="3" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} style={{display: 'none'}} {...rest}/>
      {label && <span style={{fontSize: '0.9375rem', color: 'var(--ink)', fontWeight: 500}}>{label}</span>}
    </label>
  );
}

/* ── Radio ── */
export function Radio({label, checked, name, onChange, ...rest}) {
  return (
    <label style={{display: 'inline-flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer'}}>
      <span style={{
        width: '22px', height: '22px', borderRadius: '50%',
        border: `2px solid ${checked ? 'var(--brand-cta)' : 'var(--border)'}`,
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'border-color 0.15s',
      }}>
        {checked && (
          <span style={{width: '11px', height: '11px', borderRadius: '50%', background: 'var(--brand-cta)'}}/>
        )}
      </span>
      <input type="radio" name={name} checked={checked} onChange={onChange} style={{display: 'none'}} {...rest}/>
      {label && <span style={{fontSize: '0.9375rem', color: 'var(--ink)', fontWeight: 500}}>{label}</span>}
    </label>
  );
}

/* ── Switch ── */
export function Switch({checked, onChange, label}) {
  return (
    <label style={{display: 'inline-flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer'}}>
      <span
        onClick={() => onChange?.(!checked)}
        style={{
          width: '44px', height: '26px', borderRadius: '999px',
          background: checked ? 'var(--brand-cta)' : 'var(--border)',
          position: 'relative', transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: '3px',
          left: checked ? '21px' : '3px',
          width: '20px', height: '20px', borderRadius: '50%',
          background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
          transition: 'left 0.2s',
        }}/>
      </span>
      {label && <span style={{fontSize: '0.9375rem', color: 'var(--ink)', fontWeight: 500}}>{label}</span>}
    </label>
  );
}

/* ── QuantityStepper ── */
export function QuantityStepper({value = 1, min = 1, max = 99, onChange}) {
  const dec = () => value > min && onChange?.(value - 1);
  const inc = () => value < max && onChange?.(value + 1);

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      border: '2px solid var(--ink)', borderRadius: '999px',
      overflow: 'hidden',
    }}>
      <button
        type="button" onClick={dec} disabled={value <= min}
        aria-label="Disminuir"
        style={{
          width: '36px', height: '36px', border: 'none', background: 'transparent',
          color: value <= min ? 'var(--ink-muted)' : 'var(--ink)',
          cursor: value <= min ? 'not-allowed' : 'pointer',
          fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800,
        }}
      >−</button>
      <span style={{
        minWidth: '55px', textAlign: 'center', fontSize: '0.9375rem', fontWeight: 900,
        color: 'var(--ink)',
      }}>
        {value}
      </span>
      <button
        type="button" onClick={inc} disabled={value >= max}
        aria-label="Aumentar"
        style={{
          width: '36px', height: '36px', border: 'none', background: 'transparent',
          color: value >= max ? 'var(--ink-muted)' : 'var(--ink)',
          cursor: value >= max ? 'not-allowed' : 'pointer',
          fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800,
          
        }}
      >+</button>
    </div>
  );
}
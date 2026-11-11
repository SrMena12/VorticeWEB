// Genera las claves del panel y las guarda en Vercel (producción y preview) como secretos.
// Se ejecuta UNA vez:   node scripts/setup-secrets.mjs
// Solo muestra el código de instalación (SETUP_TOKEN), que necesitas para crear tu cuenta de administrador.
import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const secrets = {
  SESSION_SECRET: randomBytes(32).toString('hex'), // firma las sesiones del panel
  CRON_SECRET: randomBytes(24).toString('hex'),    // protege la limpieza automática diaria
  SETUP_TOKEN: randomBytes(5).toString('hex'),     // un solo uso: crear la cuenta de administrador
};

for (const [name, value] of Object.entries(secrets)) {
  for (const env of ['production', 'preview']) {
    const r = spawnSync('vercel', ['env', 'add', name, '--environment', env, '--value', value, '--sensitive', '--force', '--yes'], {
      shell: process.platform === 'win32', encoding: 'utf8',
    });
    console.log(`${r.status === 0 ? '✓' : '✗'} ${name} (${env})`);
    if (r.status !== 0) console.log((r.stderr || r.stdout || '').split('\n').filter((l) => !l.includes('claude-code-hint')).slice(0, 4).join('\n'));
  }
}

console.log('\nCódigo de instalación para /admin/setup (guárdalo, solo se usa una vez):');
console.log('  ' + secrets.SETUP_TOKEN);

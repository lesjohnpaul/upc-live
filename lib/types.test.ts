import { describe, expect, it } from 'vitest';
import { ROLES, type Role } from './types';

describe('roles', () => {
  it('keeps the four original UPC roles', () => {
    for (const r of ['head_teacher', 'nurse_dentist', 'counselor', 'admin'] as Role[]) {
      expect(ROLES[r]).toBeTruthy();
    }
  });

  it('adds the two symposium roles', () => {
    expect(ROLES.student_leader).toBe('SSLG President');
    expect(ROLES.adviser).toBe('SSLG Adviser');
  });
});

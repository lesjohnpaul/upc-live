import { describe, expect, it } from 'vitest';
import { ROLES, rolesFor, type Role } from './types';

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

describe('rolesFor', () => {
  const adults: Role[] = ['head_teacher', 'nurse_dentist', 'counselor', 'admin'];

  it('never offers a student role in a UPC session (codes are case-insensitive)', () => {
    for (const code of ['upc1', 'UPC1', 'upc2', 'UPC2']) expect(rolesFor(code)).toEqual(adults);
  });

  it('offers only the SSLG pair in a Catalyst session', () => {
    expect(rolesFor('CATALYST')).toEqual(['student_leader', 'adviser']);
  });

  it('falls back to the adult four for unknown or missing codes', () => {
    for (const code of ['DEMO', 'nonsense', '', undefined]) expect(rolesFor(code)).toEqual(adults);
  });
});

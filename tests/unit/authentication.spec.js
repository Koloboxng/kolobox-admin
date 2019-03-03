import Authentication from '@/views/authentication.vue';

describe('Authentication.vue', () => {
  it('has an empty login form', () => {
    expect(typeof Authentication.data).toBe('function');
    const defaultData = Authentication.data();
    expect(defaultData.form.username).toBeFalsy();
    expect(defaultData.form.password).toBeFalsy();
  });
});

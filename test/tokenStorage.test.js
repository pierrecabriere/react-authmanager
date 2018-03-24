import React from 'react';
import Authmanager from '../'

describe('tokenStorage', () => {

  it('should set a token', async done => {
    Authmanager.utils.setToken('test');
    const token = Authmanager.utils.getToken();
    expect(token).toBe('test');
    done();
  });

  it('should delete a token', async done => {
    Authmanager.utils.setToken('test');
    Authmanager.utils.deleteToken();
    const token = Authmanager.utils.getToken();
    expect(null === token || "null" === token).toBe(true);
    done();
  });

});
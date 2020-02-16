import { PodStatusPipe } from './pod-status.pipe';

describe('PodStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new PodStatusPipe();
    expect(pipe).toBeTruthy();
  });
});

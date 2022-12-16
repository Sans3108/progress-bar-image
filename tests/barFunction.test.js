import { bar } from '../dist/utils/progress-bar-gen/bar.js';

test('1', () => {
  let result = bar({
    currentTime: 0,
    totalTime: 100,
    isCurrentSong: true,
    isLive: false,
    isPaused: false,
    position: 0
  }).test;

  expect(result.barState).toBe('empty');
});

test('2', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: true,
    isLive: false,
    isPaused: false,
    position: 0
  }).test;

  expect(result.barState).toBe('partial');
});

test('3', () => {
  let result = bar({
    currentTime: 100,
    totalTime: 100,
    isCurrentSong: true,
    isLive: false,
    isPaused: false,
    position: 0
  }).test;

  expect(result.barState).toBe('full');
});

test('4', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: false,
    isLive: false,
    isPaused: false,
    position: 0
  }).test;

  expect(result.str).toBe('waiting for 0');
});

test('5', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: false,
    isLive: false,
    isPaused: false,
    position: 1
  }).test;

  expect(result.str).toBe('next');
});

test('6', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: false,
    isLive: false,
    isPaused: false,
    position: 2
  }).test;

  expect(result.str).toBe('waiting for 2');
});

test('7', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: true,
    isLive: false,
    isPaused: false,
    position: 0
  }).test;

  expect(result.str).toBe('time');
});

test('8', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: false,
    isLive: true,
    isPaused: false,
    position: 1
  }).test;

  expect(result.str).toBe('next');
});

test('9', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: false,
    isLive: true,
    isPaused: false,
    position: 2
  }).test;

  expect(result.str).toBe('waiting for 2');
});

test('10', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: true,
    isLive: true,
    isPaused: false,
    position: 0
  }).test;

  expect(result.str).toBe('live');
});

test('11', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: false,
    isLive: false,
    isPaused: true,
    position: 3
  }).test;

  expect(result.str).toBe('waiting for 3');
});

test('12', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: true,
    isLive: false,
    isPaused: true,
    position: 0
  }).test;

  expect(result.str).toBe('timepaused');
});

test('13', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: false,
    isLive: true,
    isPaused: true,
    position: 1
  }).test;

  expect(result.str).toBe('next');
});

test('14', () => {
  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: true,
    isLive: true,
    isPaused: true,
    position: 0
  }).test;

  expect(result.str).toBe('livepaused');
});

test('15', () => {
  const str = 'testing lmfao';

  let result = bar({
    currentTime: 50,
    totalTime: 100,
    isCurrentSong: true,
    isLive: true,
    isPaused: true,
    position: 0,
    forceCustomText: str
  }).test;

  expect(result.str).toBe(str);
});